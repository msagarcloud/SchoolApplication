using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class AssesmentMasterService : IAssesmentMasterService
{
    private readonly IAssesmentMasterRepository _repository;

    public AssesmentMasterService(IAssesmentMasterRepository repository)
    {
        _repository = repository;
    }

    public async Task<AssesmentMasterResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<AssesmentMasterResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<AssesmentMasterResponse> CreateAsync(AssesmentMasterRequest request)
    {
        var entity = new AssesmentMaster
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            PercentageWeightage = request.PercentageWeightage,
            FromPeriod = request.FromPeriod,
            ToPeriod = request.ToPeriod,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.Empty, // Resolved in repository
            CreatedDate = DateTime.UtcNow,
            ModifiedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Assessment created successfully"
        };

        var created = await _repository.AddAsync(entity);
        return MapToResponse(created);
    }

    public async Task<AssesmentMasterResponse?> UpdateAsync(Guid id, AssesmentMasterRequest request)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null || existing.IsDeleted)
            return null;

        existing.Name = request.Name ?? existing.Name;
        existing.Description = request.Description ?? existing.Description;
        existing.PercentageWeightage = request.PercentageWeightage ?? existing.PercentageWeightage;
        existing.FromPeriod = request.FromPeriod ?? existing.FromPeriod;
        existing.ToPeriod = request.ToPeriod ?? existing.ToPeriod;
        existing.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existing.CompanyId;
        existing.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existing.SchoolId;
        existing.ModifiedDate = DateTime.UtcNow;
        existing.Status = "Updated";
        existing.StatusMessage = "Assessment updated successfully";

        var updated = await _repository.UpdateAsync(existing);
        return MapToResponse(updated);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null || entity.IsDeleted)
            return false;

        await _repository.DeleteAsync(id);
        return true;
    }

    private static AssesmentMasterResponse MapToResponse(AssesmentMaster entity)
    {
        return new AssesmentMasterResponse
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            PercentageWeightage = entity.PercentageWeightage,
            FromPeriod = entity.FromPeriod,
            ToPeriod = entity.ToPeriod,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsActive = entity.IsActive,
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }
}
