using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using SchoolDemo.Infrastructure.Data;
using System.Linq.Expressions;

namespace SchoolDemo.Infrastructure.Repositories;

public abstract class BaseRepositoryOptimized<TDomain, TInfra> where TDomain : class where TInfra : class
{
    protected readonly SchoolDbContext _context;
    protected readonly IMemoryCache _cache;
    protected readonly string _entityName;

    protected BaseRepositoryOptimized(SchoolDbContext context, IMemoryCache cache, string entityName)
    {
        _context = context;
        _cache = cache;
        _entityName = entityName;
    }

    protected async Task<TDomain?> GetByIdAsync(Guid id, Func<TInfra, TDomain> mapper, params Expression<Func<TInfra, object>>[] includes)
    {
        var cacheKey = $"{_entityName}_by_id_{id}";
        if (_cache.TryGetValue(cacheKey, out TDomain? cachedEntity))
        {
            return cachedEntity;
        }

        var query = _context.Set<TInfra>().AsNoTracking();
        
        foreach (var include in includes)
        {
            query = query.Include(include);
        }

        var entity = await query.FirstOrDefaultAsync(e => EF.Property<Guid>(e, "Id") == id && !EF.Property<bool>(e, "IsDeleted"));
        
        var result = entity != null ? mapper(entity) : default(TDomain);
        
        if (result != null)
        {
            _cache.Set(cacheKey, result, TimeSpan.FromMinutes(30));
        }
        
        return result;
    }

    protected async Task<IEnumerable<TDomain>> GetAllAsync(Func<TInfra, TDomain> mapper, params Expression<Func<TInfra, object>>[] includes)
    {
        var cacheKey = $"{_entityName}_all";
        if (_cache.TryGetValue(cacheKey, out IEnumerable<TDomain>? cachedEntities))
        {
            return cachedEntities!;
        }

        var query = _context.Set<TInfra>().AsNoTracking();
        
        foreach (var include in includes)
        {
            query = query.Include(include);
        }

        var entities = await query.Where(e => !EF.Property<bool>(e, "IsDeleted")).ToListAsync();
        
        var results = entities
            .Select(mapper)
            .Where(e => e != null)
            .Select(e => e!)
            .ToList();

        _cache.Set(cacheKey, results, TimeSpan.FromMinutes(10));
        
        return results;
    }

    protected async Task<PagedResult<TDomain>> GetPagedAsync(int page, int pageSize, Func<TInfra, TDomain> mapper, params Expression<Func<TInfra, object>>[] includes)
    {
        var cacheKey = $"{_entityName}_paged_{page}_{pageSize}";
        if (_cache.TryGetValue(cacheKey, out PagedResult<TDomain>? cachedResult))
        {
            return cachedResult!;
        }

        var query = _context.Set<TInfra>().AsNoTracking();
        
        foreach (var include in includes)
        {
            query = query.Include(include);
        }

        query = query.Where(e => !EF.Property<bool>(e, "IsDeleted"));

        var totalCount = await query.CountAsync();
        var entities = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var results = entities
            .Select(mapper)
            .Where(e => e != null)
            .Select(e => e!)
            .ToList();

        var result = new PagedResult<TDomain>
        {
            Data = results,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        };

        _cache.Set(cacheKey, result, TimeSpan.FromMinutes(5));
        
        return result;
    }

    protected async Task<IEnumerable<TDomain>> GetProjectedAsync<TProjection>(Expression<Func<TInfra, TProjection>> projection, Func<TProjection, TDomain> mapper)
    {
        var cacheKey = $"{_entityName}_projected_{typeof(TProjection).Name}";
        if (_cache.TryGetValue(cacheKey, out IEnumerable<TDomain>? cachedEntities))
        {
            return cachedEntities!;
        }

        var projected = await _context.Set<TInfra>()
            .AsNoTracking()
            .Where(e => !EF.Property<bool>(e, "IsDeleted"))
            .Select(projection)
            .ToListAsync();

        var results = projected.Select(mapper).ToList();

        _cache.Set(cacheKey, results, TimeSpan.FromMinutes(15));
        
        return results;
    }

    protected async Task<TDomain> AddAsync(TDomain domainEntity, Func<TDomain, TInfra> infraMapper, Func<TInfra, TDomain> domainMapper)
    {
        var infraEntity = infraMapper(domainEntity);
        await _context.Set<TInfra>().AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        
        ClearCache();
        
        return domainMapper(infraEntity);
    }

    protected async Task<TDomain> UpdateAsync(TDomain domainEntity, Func<TDomain, TInfra> infraMapper, Func<TInfra, TDomain> domainMapper)
    {
        var infraEntity = infraMapper(domainEntity);
        _context.Set<TInfra>().Update(infraEntity);
        await _context.SaveChangesAsync();
        
        ClearCache();
        
        var id = EF.Property<Guid>(infraEntity, "Id");
        _cache.Remove($"{_entityName}_by_id_{id}");
        
        return domainMapper(infraEntity);
    }

    protected async Task DeleteAsync(Guid id)
    {
        var entity = await _context.Set<TInfra>()
            .FirstOrDefaultAsync(e => EF.Property<Guid>(e, "Id") == id);
        
        if (entity != null)
        {
            _context.Entry(entity).Property("IsDeleted").CurrentValue = true;
            _context.Entry(entity).Property("ModifiedDate").CurrentValue = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            
            ClearCache();
            _cache.Remove($"{_entityName}_by_id_{id}");
        }
    }

    protected void ClearCache()
    {
        _cache.Remove($"{_entityName}_all");
        _cache.Remove($"{_entityName}_projected");
    }

    protected async Task<IEnumerable<TDomain>> SearchAsync(string searchTerm, Func<TInfra, TDomain> mapper, params Expression<Func<TInfra, object>>[] searchProperties)
    {
        var cacheKey = $"{_entityName}_search_{searchTerm}";
        if (_cache.TryGetValue(cacheKey, out IEnumerable<TDomain>? cachedResults))
        {
            return cachedResults!;
        }

        var query = _context.Set<TInfra>().AsNoTracking();
        
        foreach (var include in searchProperties)
        {
            query = query.Include(include);
        }

        // Build search expression dynamically
        var parameter = Expression.Parameter(typeof(TInfra), "x");
        var containsMethod = typeof(string).GetMethod("Contains", new[] { typeof(string) })!;
        var constant = Expression.Constant(searchTerm, typeof(string));
        var nullConstant = Expression.Constant(null, typeof(string));
        
        var searchExpressions = new List<Expression>();
        
        foreach (var prop in searchProperties)
        {
            var property = Expression.Property(parameter, ((MemberExpression)prop.Body).Member.Name);
            var toStringMethod = typeof(object).GetMethod("ToString", Type.EmptyTypes)!;
            var propertyAsString = Expression.Call(property, toStringMethod);
            var containsExpression = Expression.Call(propertyAsString, containsMethod, constant);
            var nullCheck = Expression.NotEqual(propertyAsString, nullConstant);
            var combined = Expression.AndAlso(nullCheck, containsExpression);
            searchExpressions.Add(combined);
        }

        if (searchExpressions.Count == 0)
        {
            return Enumerable.Empty<TDomain>();
        }

        var combinedExpression = searchExpressions.Aggregate((acc, expr) => Expression.OrElse(acc, expr));
        var lambda = Expression.Lambda<Func<TInfra, bool>>(combinedExpression, parameter);

        var entities = await query
            .Where(e => !EF.Property<bool>(e, "IsDeleted"))
            .Where(lambda)
            .ToListAsync();

        var results = entities
            .Select(mapper)
            .Where(e => e != null)
            .Select(e => e!)
            .ToList();

        _cache.Set(cacheKey, results, TimeSpan.FromMinutes(5));
        
        return results;
    }
}

public class PagedResult<T>
{
    public IEnumerable<T> Data { get; set; } = new List<T>();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}
