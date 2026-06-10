using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class EmployeeProfessionalQualificationService : IEmployeeProfessionalQualificationService
{
    private readonly IEmployeeProfessionalQualificationRepository _repository;

    public EmployeeProfessionalQualificationService(IEmployeeProfessionalQualificationRepository repository)
    {
        _repository = repository;
    }

    public async Task<EmployeeProfessionalQualificationResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<EmployeeProfessionalQualificationResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<EmployeeProfessionalQualificationResponse> CreateAsync(EmployeeProfessionalQualificationRequest request)
    {
        var entity = new EmployeeProfessionalQualification
        {
            Id = Guid.NewGuid(),
            EmployeeId = request.EmployeeId,
            QualificationId = request.QualificationId,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Employee professional qualification created successfully"
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<EmployeeProfessionalQualificationResponse?> UpdateAsync(Guid id, EmployeeProfessionalQualificationRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.EmployeeId = request.EmployeeId != Guid.Empty ? request.EmployeeId : existingEntity.EmployeeId;
        existingEntity.QualificationId = request.QualificationId != Guid.Empty ? request.QualificationId : existingEntity.QualificationId;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Employee professional qualification updated successfully";

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

    private static EmployeeProfessionalQualificationResponse MapToResponse(EmployeeProfessionalQualification entity)
    {
        return new EmployeeProfessionalQualificationResponse
        {
            Id = entity.Id,
            EmployeeId = entity.EmployeeId,
            QualificationId = entity.QualificationId,
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
