using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class VoucherRepository : IVoucherRepository
{
    private readonly SchoolDbContext _context;

    public VoucherRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.VoucherMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.VoucherMasters
            .FirstOrDefaultAsync(v => v.Id == id && !v.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.VoucherMaster>> GetAllAsync()
    {
        var entities = await _context.VoucherMasters
            .Where(v => !v.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.VoucherMaster> AddAsync(SchoolDemo.Domain.Entities.VoucherMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.VoucherMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.VoucherMaster> UpdateAsync(SchoolDemo.Domain.Entities.VoucherMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.VoucherMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.VoucherMasters
            .FirstOrDefaultAsync(v => v.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.VoucherMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.VoucherMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.VoucherMaster
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
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }

    private static SchoolDemo.Infrastructure.Data.VoucherMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.VoucherMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.VoucherMaster
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
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }
}
