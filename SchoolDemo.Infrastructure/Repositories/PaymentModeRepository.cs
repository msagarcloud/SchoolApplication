using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class PaymentModeRepository : IPaymentModeRepository
{
    private readonly SchoolDbContext _context;

    public PaymentModeRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.PaymentModeMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.PaymentModeMasters
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.PaymentModeMaster>> GetAllAsync()
    {
        var entities = await _context.PaymentModeMasters
            .Where(p => !p.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.PaymentModeMaster> AddAsync(SchoolDemo.Domain.Entities.PaymentModeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.PaymentModeMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.PaymentModeMaster> UpdateAsync(SchoolDemo.Domain.Entities.PaymentModeMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.PaymentModeMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.PaymentModeMasters
            .FirstOrDefaultAsync(p => p.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.PaymentModeMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.PaymentModeMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.PaymentModeMaster
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
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

    private static SchoolDemo.Infrastructure.Data.PaymentModeMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.PaymentModeMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.PaymentModeMaster
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
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
