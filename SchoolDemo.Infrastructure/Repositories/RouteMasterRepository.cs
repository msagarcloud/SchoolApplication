using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using DataRouteMaster = SchoolDemo.Infrastructure.Data.RouteMaster;
using DomainRouteMaster = SchoolDemo.Domain.Entities.RouteMaster;

namespace SchoolDemo.Infrastructure.Repositories;

public class RouteMasterRepository : IRouteMasterRepository
{
    private static readonly Guid EmptyGuid = Guid.Empty;
    private readonly SchoolDbContext _context;

    public RouteMasterRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<DomainRouteMaster?> GetByIdAsync(Guid id)
    {
        var data = await QueryWithLocations()
            .FirstOrDefaultAsync(r => r.Id == id);
        return data is null ? null : ToDomain(data);
    }

    public async Task<IEnumerable<DomainRouteMaster>> GetAllAsync()
    {
        var list = await QueryWithLocations().ToListAsync();
        return list.Select(ToDomain).ToList();
    }

    public async Task<DomainRouteMaster> AddAsync(DomainRouteMaster routeMaster)
    {
        var createdBy = await ResolveCreatedByAsync(routeMaster.CreatedBy, routeMaster.CompanyId, routeMaster.SchoolId);
        routeMaster.CreatedBy = createdBy;

        var data = new DataRouteMaster
        {
            Id = routeMaster.Id == EmptyGuid ? Guid.NewGuid() : routeMaster.Id,
            IsActive = routeMaster.IsActive,
            IsDeleted = routeMaster.IsDeleted,
            Status = string.IsNullOrWhiteSpace(routeMaster.Status) ? "INC" : routeMaster.Status!
        };

        await ApplyDomainToDataAsync(data, routeMaster, createdBy);
        await _context.Set<DataRouteMaster>().AddAsync(data);
        await _context.SaveChangesAsync();

        var saved = await QueryWithLocations().FirstAsync(r => r.Id == data.Id);
        return ToDomain(saved);
    }

    public async Task<DomainRouteMaster?> UpdateAsync(DomainRouteMaster routeMaster)
    {
        var existing = await _context.RouteMasters
            .FirstOrDefaultAsync(r => r.Id == routeMaster.Id);
        if (existing is null) return null;

        var createdBy = await ResolveCreatedByAsync(
            routeMaster.ModifiedBy ?? routeMaster.CreatedBy,
            routeMaster.CompanyId,
            routeMaster.SchoolId);

        await ApplyDomainToDataAsync(existing, routeMaster, createdBy);
        await _context.SaveChangesAsync();

        var saved = await QueryWithLocations().FirstAsync(r => r.Id == existing.Id);
        return ToDomain(saved);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var data = await _context.RouteMasters.FindAsync(id);
        if (data == null) return false;

        _context.RouteMasters.Remove(data);
        await _context.SaveChangesAsync();
        return true;
    }

    private IQueryable<DataRouteMaster> QueryWithLocations() =>
        _context.RouteMasters
            .AsNoTracking()
            .Include(r => r.StartLocation)
            .Include(r => r.EndLocation);

    private async Task ApplyDomainToDataAsync(
        DataRouteMaster data,
        DomainRouteMaster domain,
        Guid createdBy)
    {
        data.Name = Truncate(domain.RouteName, 150);
        data.Code = Truncate(domain.IntermediateStops, 50);
        data.StatusMessage = SerializeExtras(domain);
        data.CompanyId = domain.CompanyId;
        data.SchoolId = domain.SchoolId;
        data.IsActive = domain.IsActive;
        data.IsDeleted = domain.IsDeleted;
        data.CreatedBy = createdBy;
        data.CreatedDate = domain.CreatedDate == default ? DateTime.UtcNow : domain.CreatedDate;
        data.ModifiedBy = domain.ModifiedBy;
        data.ModifiedDate = domain.ModifiedDate;
        data.Status = string.IsNullOrWhiteSpace(domain.Status) ? "INC" : domain.Status!;

        data.StartLocationId = await ResolveLocationIdAsync(
            domain.StartPoint, domain.CompanyId, domain.SchoolId, createdBy);
        data.EndLocationId = await ResolveLocationIdAsync(
            domain.EndPoint, domain.CompanyId, domain.SchoolId, createdBy);

        if (data.ApplicableClasses == EmptyGuid)
            data.ApplicableClasses = await ResolveApplicableClassesAsync(domain.SchoolId);
    }

    private async Task<Guid> ResolveApplicableClassesAsync(Guid schoolId)
    {
        if (schoolId == EmptyGuid)
            return EmptyGuid;

        var classId = await _context.ClassMasters
            .AsNoTracking()
            .Where(c => c.SchoolId == schoolId && !c.IsDeleted)
            .Select(c => c.Id)
            .FirstOrDefaultAsync();

        return classId != EmptyGuid ? classId : schoolId;
    }

    private async Task<Guid> ResolveCreatedByAsync(Guid requestedCreatedBy, Guid companyId, Guid schoolId)
    {
        if (requestedCreatedBy != EmptyGuid)
        {
            var exists = await _context.UserDetails
                .AsNoTracking()
                .AnyAsync(u => u.Id == requestedCreatedBy && !u.IsDeleted);
            if (exists)
                return requestedCreatedBy;
        }

        var query = _context.UserDetails
            .AsNoTracking()
            .Where(u => u.IsActive && !u.IsDeleted);

        if (schoolId != EmptyGuid)
            query = query.Where(u => u.SchoolId == schoolId);
        if (companyId != EmptyGuid)
            query = query.Where(u => u.CompanyId == companyId);

        var resolved = await query.Select(u => u.Id).FirstOrDefaultAsync();
        if (resolved != EmptyGuid)
            return resolved;

        var fallback = await _context.UserDetails
            .AsNoTracking()
            .Where(u => u.IsActive && !u.IsDeleted)
            .Select(u => u.Id)
            .FirstOrDefaultAsync();

        if (fallback == EmptyGuid)
            throw new InvalidOperationException("No valid user found for CreatedBy. Please log in again.");

        return fallback;
    }

    private async Task<Guid> ResolveLocationIdAsync(
        string locationName, Guid companyId, Guid schoolId, Guid createdBy)
    {
        var normalized = locationName.Trim();
        if (string.IsNullOrEmpty(normalized))
            throw new InvalidOperationException("Start point and end point are required.");

        var displayName = Truncate(normalized, 100) ?? normalized;

        var existing = await _context.RouteLocationMasters
            .AsNoTracking()
            .FirstOrDefaultAsync(l =>
                l.Name == displayName
                && l.CompanyId == companyId
                && l.SchoolId == schoolId
                && !l.IsDeleted);

        if (existing != null)
            return existing.Id;

        var cityId = await _context.RouteLocationMasters
            .AsNoTracking()
            .Where(l => l.CompanyId == companyId && l.SchoolId == schoolId)
            .Select(l => l.CityId)
            .FirstOrDefaultAsync();

        if (cityId == EmptyGuid)
        {
            cityId = await _context.CityMasters
                .AsNoTracking()
                .Select(c => c.Id)
                .FirstOrDefaultAsync();
        }

        if (cityId == EmptyGuid)
            throw new InvalidOperationException("No city found. Add a city before creating routes.");

        var location = new RouteLocationMaster
        {
            Id = Guid.NewGuid(),
            Name = displayName,
            LandMark = Truncate(normalized, 255) ?? displayName,
            CityId = cityId,
            CompanyId = companyId,
            SchoolId = schoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = createdBy,
            CreatedDate = DateTime.UtcNow,
            Status = "INC"
        };

        _context.RouteLocationMasters.Add(location);
        return location.Id;
    }

    private static DomainRouteMaster ToDomain(DataRouteMaster data)
    {
        var domain = new DomainRouteMaster
        {
            Id = data.Id,
            RouteName = data.Name ?? string.Empty,
            CompanyId = data.CompanyId,
            SchoolId = data.SchoolId,
            IsActive = data.IsActive,
            IsDeleted = data.IsDeleted,
            CreatedBy = data.CreatedBy,
            CreatedDate = data.CreatedDate,
            ModifiedBy = data.ModifiedBy,
            ModifiedDate = data.ModifiedDate,
            Status = data.Status,
            StatusMessage = data.StatusMessage,
            StartPoint = data.StartLocation?.Name ?? string.Empty,
            EndPoint = data.EndLocation?.Name ?? string.Empty,
            IntermediateStops = data.Code
        };

        ApplyExtras(data.StatusMessage, domain);
        return domain;
    }

    private static string? SerializeExtras(DomainRouteMaster domain)
    {
        var payload = new RouteExtrasPayload
        {
            Description = domain.RouteDescription,
            IntermediateStops = domain.IntermediateStops,
            Distance = domain.Distance,
            Fare = domain.Fare,
            EstimatedTime = domain.EstimatedTime
        };

        if (string.IsNullOrWhiteSpace(payload.Description)
            && string.IsNullOrWhiteSpace(payload.IntermediateStops)
            && payload.Distance == null
            && payload.Fare == null
            && string.IsNullOrWhiteSpace(payload.EstimatedTime))
        {
            return null;
        }

        return JsonSerializer.Serialize(payload);
    }

    private static void ApplyExtras(string? statusMessage, DomainRouteMaster domain)
    {
        if (string.IsNullOrWhiteSpace(statusMessage))
            return;

        try
        {
            var extras = JsonSerializer.Deserialize<RouteExtrasPayload>(statusMessage);
            if (extras == null)
            {
                domain.RouteDescription = statusMessage;
                return;
            }

            domain.RouteDescription = extras.Description;
            if (!string.IsNullOrWhiteSpace(extras.IntermediateStops))
                domain.IntermediateStops = extras.IntermediateStops;
            domain.Distance = extras.Distance;
            domain.Fare = extras.Fare;
            domain.EstimatedTime = extras.EstimatedTime;
        }
        catch (JsonException)
        {
            domain.RouteDescription = statusMessage;
        }
    }

    private static string? Truncate(string? value, int maxLength)
    {
        if (string.IsNullOrWhiteSpace(value)) return null;
        var trimmed = value.Trim();
        return trimmed.Length <= maxLength ? trimmed : trimmed[..maxLength];
    }

    private sealed class RouteExtrasPayload
    {
        public string? Description { get; set; }
        public string? IntermediateStops { get; set; }
        public decimal? Distance { get; set; }
        public decimal? Fare { get; set; }
        public string? EstimatedTime { get; set; }
    }
}
