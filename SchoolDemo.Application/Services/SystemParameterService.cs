using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class SystemParameterService : ISystemParameterService
{
    private readonly ISystemParameterRepository _repo;

    public SystemParameterService(ISystemParameterRepository repo)
    {
        _repo = repo;
    }

    public async Task<SystemParameterResponse?> GetByIdAsync(Guid id)
    {
        var param = await _repo.GetByIdAsync(id);
        return param == null ? null : MapToResponse(param);
    }

    public async Task<IEnumerable<SystemParameterResponse>> GetAllAsync()
    {
        var all = await _repo.GetAllAsync();
        return all.Select(MapToResponse);
    }

    public async Task<SystemParameterResponse> CreateAsync(SystemParameterRequest request)
    {
        var entity = new SystemParameter
        {
            Id = Guid.NewGuid(),
            ParameterName = request.ParameterName,
            ParameterValue = request.ParameterValue,
            Description = request.Description,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = request.IsActive,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Created"
        };

        var created = await _repo.AddAsync(entity);
        return MapToResponse(created);
    }

    public async Task<SystemParameterResponse?> UpdateAsync(Guid id, SystemParameterRequest request)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing == null || existing.IsDeleted) return null;

        existing.ParameterName = request.ParameterName ?? existing.ParameterName;
        existing.ParameterValue = request.ParameterValue ?? existing.ParameterValue;
        existing.Description = request.Description ?? existing.Description;
        existing.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existing.CompanyId;
        existing.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existing.SchoolId;
        existing.IsActive = request.IsActive;
        existing.ModifiedBy = Guid.NewGuid();
        existing.ModifiedDate = DateTime.UtcNow;
        existing.Status = "Updated";
        existing.StatusMessage = "Updated successfully";

        var updated = await _repo.UpdateAsync(existing);
        return MapToResponse(updated);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing == null || existing.IsDeleted) return false;

        await _repo.DeleteAsync(id);
        return true;
    }

    private static SystemParameterResponse MapToResponse(SystemParameter p)
    {
        return new SystemParameterResponse
        {
            Id = p.Id,
            ParameterName = p.ParameterName,
            ParameterValue = p.ParameterValue,
            Description = p.Description,
            CompanyId = p.CompanyId,
            SchoolId = p.SchoolId,
            IsActive = p.IsActive,
            CreatedDate = p.CreatedDate,
            ModifiedDate = p.ModifiedDate,
            Status = p.Status,
            StatusMessage = p.StatusMessage
        };
    }
}
