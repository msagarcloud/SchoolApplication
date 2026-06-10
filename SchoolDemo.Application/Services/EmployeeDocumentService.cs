using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class EmployeeDocumentService : IEmployeeDocumentService
{
    private readonly IEmployeeDocumentRepository _repository;

    public EmployeeDocumentService(IEmployeeDocumentRepository repository)
    {
        _repository = repository;
    }

    public async Task<EmployeeDocumentResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<EmployeeDocumentResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<EmployeeDocumentResponse> CreateAsync(EmployeeDocumentRequest request)
    {
        var entity = new EmployeeDocument
        {
            Id = Guid.NewGuid(),
            EmployeeId = request.EmployeeId,
            DocumentName = request.DocumentName,
            Description = request.Description,
            FileName = request.FileName,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Employee document created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<EmployeeDocumentResponse?> UpdateAsync(Guid id, EmployeeDocumentRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.EmployeeId = request.EmployeeId != Guid.Empty ? request.EmployeeId : existingEntity.EmployeeId;
        existingEntity.DocumentName = request.DocumentName ?? existingEntity.DocumentName;
        existingEntity.Description = request.Description ?? existingEntity.Description;
        existingEntity.FileName = request.FileName ?? existingEntity.FileName;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Employee document updated successfully";

        var updatedEntity = await _repository.UpdateAsync(existingEntity);
        return MapToResponse(updatedEntity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null || entity.IsDeleted)
        {
            return false;
        }

        await _repository.DeleteAsync(id);
        return true;
    }

    private static EmployeeDocumentResponse MapToResponse(EmployeeDocument entity)
    {
        return new EmployeeDocumentResponse
        {
            Id = entity.Id,
            EmployeeId = entity.EmployeeId,
            DocumentName = entity.DocumentName,
            Description = entity.Description,
            FileName = entity.FileName,
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
