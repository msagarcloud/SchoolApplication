using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class UserRepositoryOptimized : IUserRepository
{
    private readonly SchoolDbContext _context;
    private readonly IMemoryCache _cache;

    public UserRepositoryOptimized(SchoolDbContext context, IMemoryCache cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<User?> GetByUserNameAsync(string userName)
    {
        var cacheKey = $"user_basic_{userName}";
        if (_cache.TryGetValue(cacheKey, out User? cachedUser))
        {
            return cachedUser;
        }

        var userDetail = await _context.UserDetails
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.UserName == userName);
        
        var user = MapToDomainEntity(userDetail);
        
        if (user != null)
        {
            _cache.Set(cacheKey, user, TimeSpan.FromMinutes(30));
        }
        
        return user;
    }

    public async Task<User?> GetByUserNameWithRelatedDataAsync(string userName)
    {
        var cacheKey = $"user_full_{userName}";
        if (_cache.TryGetValue(cacheKey, out User? cachedUser))
        {
            return cachedUser;
        }

        // First, get basic user data for authentication (optimized query)
        var userDetail = await _context.UserDetails
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.UserName == userName);
        
        if (userDetail == null || !userDetail.IsActive || userDetail.IsDeleted)
            return null;
        
        // Only load related data if authentication passes
        userDetail = await _context.UserDetails
            .AsNoTracking()
            .Include(u => u.Designation)
            .Include(u => u.UserRole)
                .ThenInclude(r => r!.RolePrivileges)
                    .ThenInclude(rp => rp.Privilege)
            .Include(u => u.Company)
            .Include(u => u.School)
            .FirstOrDefaultAsync(u => u.Id == userDetail.Id);
        
        var user = MapToDomainEntityWithRelatedDataOptimized(userDetail);
        
        if (user != null)
        {
            _cache.Set(cacheKey, user, TimeSpan.FromMinutes(15));
        }
        
        return user;
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        var cacheKey = $"user_by_id_{id}";
        if (_cache.TryGetValue(cacheKey, out User? cachedUser))
        {
            return cachedUser;
        }

        var userDetail = await _context.UserDetails
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id);
        
        var user = MapToDomainEntity(userDetail);
        
        if (user != null)
        {
            _cache.Set(cacheKey, user, TimeSpan.FromMinutes(30));
        }
        
        return user;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        var cacheKey = "users_all";
        if (_cache.TryGetValue(cacheKey, out IEnumerable<User>? cachedUsers))
        {
            return cachedUsers!;
        }

        var userDetails = await _context.UserDetails
            .AsNoTracking()
            .Where(u => !u.IsDeleted)
            .ToListAsync();
        
        var users = userDetails
            .Select(MapToDomainEntity)
            .Where(u => u != null)
            .Select(u => u!)
            .ToList();

        _cache.Set(cacheKey, users, TimeSpan.FromMinutes(10));
        
        return users;
    }

    public async Task<User> AddAsync(User user)
    {
        var userDetail = MapToInfrastructureEntity(user);
        await _context.UserDetails.AddAsync(userDetail);
        await _context.SaveChangesAsync();
        
        // Clear cache
        ClearUserCache(user.UserName);
        
        return MapToDomainEntity(userDetail)!;
    }

    public async Task<User> UpdateAsync(User user)
    {
        var userDetail = MapToInfrastructureEntity(user);
        _context.UserDetails.Update(userDetail);
        await _context.SaveChangesAsync();
        
        // Clear cache
        ClearUserCache(user.UserName);
        
        return MapToDomainEntity(userDetail)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var userDetail = await _context.UserDetails
            .FirstOrDefaultAsync(u => u.Id == id);
        
        if (userDetail != null)
        {
            userDetail.IsDeleted = true;
            await UpdateAsync(MapToDomainEntity(userDetail)!);
            
            // Clear cache
            ClearUserCache(userDetail.UserName);
        }
    }

    private void ClearUserCache(string userName)
    {
        _cache.Remove($"user_basic_{userName}");
        _cache.Remove($"user_full_{userName}");
        _cache.Remove("users_all");
    }

    private static User? MapToDomainEntity(UserDetail? userDetail)
    {
        if (userDetail == null) return null;

        return new User
        {
            Id = userDetail.Id,
            UserName = userDetail.UserName,
            UserPassword = userDetail.UserPassword,
            FirstName = userDetail.FirstName,
            LastName = userDetail.LastName,
            EmailAddress = userDetail.EmailAddress,
            DesignationId = userDetail.DesignationId,
            UserRoleId = userDetail.UserRoleId,
            IsSuperUser = userDetail.IsSuperUser,
            CompanyId = userDetail.CompanyId,
            SchoolId = userDetail.SchoolId,
            IsActive = userDetail.IsActive,
            IsDeleted = userDetail.IsDeleted,
            CreatedBy = userDetail.CreatedBy,
            CreatedDate = userDetail.CreatedDate,
            ModifiedBy = userDetail.ModifiedBy,
            ModifiedDate = userDetail.ModifiedDate,
            Status = userDetail.Status,
            StatusMessage = userDetail.StatusMessage
        };
    }

    private static UserDetail MapToInfrastructureEntity(User user)
    {
        return new UserDetail
        {
            Id = user.Id,
            UserName = user.UserName,
            UserPassword = user.UserPassword,
            FirstName = user.FirstName,
            LastName = user.LastName,
            EmailAddress = user.EmailAddress,
            DesignationId = user.DesignationId,
            UserRoleId = user.UserRoleId,
            IsSuperUser = user.IsSuperUser,
            CompanyId = user.CompanyId,
            SchoolId = user.SchoolId,
            IsActive = user.IsActive,
            IsDeleted = user.IsDeleted,
            CreatedBy = user.CreatedBy,
            CreatedDate = user.CreatedDate,
            ModifiedBy = user.ModifiedBy,
            ModifiedDate = user.ModifiedDate,
            Status = user.Status,
            StatusMessage = user.StatusMessage
        };
    }

    private static User? MapToDomainEntityWithRelatedDataOptimized(UserDetail? userDetail)
    {
        if (userDetail == null) return null;

        var user = MapToDomainEntity(userDetail);
        if (user == null) return null;

        // Optimized mapping - only map essential data
        if (userDetail.Designation != null)
        {
            user.Designation = new Designation
            {
                Id = userDetail.Designation.Id,
                Name = userDetail.Designation.Name
            };
        }

        if (userDetail.UserRole != null)
        {
            user.UserRole = new Role
            {
                Id = userDetail.UserRole.Id,
                Name = userDetail.UserRole.Name,
                Description = userDetail.UserRole.Description,
                Privileges = userDetail.UserRole.RolePrivileges
                    .Where(rp => rp.Privilege != null)
                    .Select(rp => rp.Privilege!.PrivilegeName!)
                    .ToList()
            };
        }

        if (userDetail.Company != null)
        {
            user.Company = new Company
            {
                Id = userDetail.Company.Id,
                CompanyName = userDetail.Company.CompanyName
            };
        }

        if (userDetail.School != null)
        {
            user.School = new School
            {
                Id = userDetail.School.Id,
                Name = userDetail.School.Name
            };
        }

        return user;
    }
}
