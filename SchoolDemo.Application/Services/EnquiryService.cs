using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class EnquiryService : IEnquiryService
{
    private readonly IEnquiryRepository _repository;

    public EnquiryService(IEnquiryRepository repository)
    {
        _repository = repository;
    }

    public async Task<EnquiryResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<EnquiryResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<EnquiryResponse> CreateAsync(EnquiryRequest request)
    {
        var entity = new SchoolDemo.Domain.Entities.EnquiryMaster
        {
            Id = Guid.NewGuid(),
            EnquirerName = request.EnquirerName,
            ContactNumber = request.ContactNumber,
            EmailAddress = request.EmailAddress,
            EnquiryType = request.EnquiryType,
            Subject = request.Subject,
            Message = request.Message,
            Priority = request.Priority ?? "Medium",
            Status = "Pending",
            StatusMessage = "Enquiry created successfully",
            EnquiryDate = DateTime.UtcNow,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(),
            CreatedDate = DateTime.UtcNow
        };

        var createdEntity = await _repository.AddAsync(entity);
        return MapToResponse(createdEntity);
    }

    public async Task<EnquiryResponse?> UpdateAsync(Guid id, EnquiryRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        existingEntity.EnquirerName = request.EnquirerName ?? existingEntity.EnquirerName;
        existingEntity.ContactNumber = request.ContactNumber ?? existingEntity.ContactNumber;
        existingEntity.EmailAddress = request.EmailAddress ?? existingEntity.EmailAddress;
        existingEntity.EnquiryType = request.EnquiryType ?? existingEntity.EnquiryType;
        existingEntity.Subject = request.Subject ?? existingEntity.Subject;
        existingEntity.Message = request.Message ?? existingEntity.Message;
        existingEntity.Priority = request.Priority ?? existingEntity.Priority;
        existingEntity.CompanyId = request.CompanyId ?? existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId ?? existingEntity.SchoolId;
        existingEntity.ModifiedBy = Guid.NewGuid();
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Enquiry updated successfully";

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

    private static EnquiryResponse MapToResponse(SchoolDemo.Domain.Entities.EnquiryMaster entity)
    {
        return new EnquiryResponse
        {
            Id = entity.Id,
            EnquirerName = entity.EnquirerName,
            ContactNumber = entity.ContactNumber,
            EmailAddress = entity.EmailAddress,
            EnquiryType = entity.EnquiryType,
            Subject = entity.Subject,
            Message = entity.Message,
            Priority = entity.Priority,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage,
            EnquiryDate = entity.EnquiryDate,
            ResponseMessage = entity.ResponseMessage,
            ResponseType = entity.ResponseType,
            ResponseDate = entity.ResponseDate,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsActive = entity.IsActive,
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate
        };
    }
}
