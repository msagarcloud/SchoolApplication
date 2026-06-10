using SchoolDemo.Domain.DTOs;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class VoucherService : IVoucherService
{
    private readonly IVoucherRepository _repository;

    public VoucherService(IVoucherRepository repository)
    {
        _repository = repository;
    }

    public async Task<VoucherResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<VoucherResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<VoucherResponse> CreateAsync(VoucherRequest request)
    {
        // Use createdBy from request, fallback to empty GUID if not provided
        var createdBy = request.CreatedBy ?? Guid.Empty;
        if (createdBy == Guid.Empty)
        {
            Console.WriteLine("Warning: CreatedBy not provided in request, using empty GUID");
        }

        var entity = new SchoolDemo.Domain.Entities.VoucherMaster
        {
            Id = Guid.NewGuid(),
            VoucherNumber = request.VoucherNumber,
            VoucherName = request.VoucherName,
            Description = request.Description,
            IssueDate = request.IssueDate,
            Amount = request.Amount,
            ExpenseCategoryId = request.ExpenseCategoryId,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = createdBy,
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Voucher created successfully"
        };

        var CreatedEntity = await _repository.AddAsync(entity);
        return MapToResponse(CreatedEntity);
    }

    public async Task<VoucherResponse?> UpdateAsync(Guid id, VoucherRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        // Use modifiedBy from request, fallback to existing CreatedBy if not provided
        var modifiedBy = request.ModifiedBy ?? existingEntity.CreatedBy;
        if (modifiedBy == Guid.Empty)
        {
            Console.WriteLine("Warning: ModifiedBy not provided in request, using existing CreatedBy");
        }

        existingEntity.VoucherNumber = request.VoucherNumber ?? existingEntity.VoucherNumber;
        existingEntity.VoucherName = request.VoucherName ?? existingEntity.VoucherName;
        existingEntity.Description = request.Description ?? existingEntity.Description;
        existingEntity.IssueDate = request.IssueDate != default ? request.IssueDate : existingEntity.IssueDate;
        existingEntity.Amount = request.Amount ?? existingEntity.Amount;
        existingEntity.ExpenseCategoryId = request.ExpenseCategoryId != Guid.Empty ? request.ExpenseCategoryId : existingEntity.ExpenseCategoryId;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.ModifiedBy = modifiedBy;
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Voucher updated successfully";

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

    private static VoucherResponse MapToResponse(SchoolDemo.Domain.Entities.VoucherMaster entity)
    {
        return new VoucherResponse
        {
            Id = entity.Id,
            VoucherNumber = entity.VoucherNumber,
            VoucherName = entity.VoucherName,
            Description = entity.Description,
            IssueDate = entity.IssueDate,
            Amount = entity.Amount,
            ExpenseCategoryId = entity.ExpenseCategoryId,
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
