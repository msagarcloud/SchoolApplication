using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class EnquiryTypeRepository : IEnquiryTypeRepository
{
    private readonly SchoolDbContext _context;

    public EnquiryTypeRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.EnquiryType?> GetByIdAsync(Guid id)
    {
        var entity = await _context.EnquiryTypes
            .Include(e => e.Company)
            .Include(e => e.School)
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.EnquiryType>> GetAllAsync()
    {
        var entities = await _context.EnquiryTypes
            .Include(e => e.Company)
            .Include(e => e.School)
            .Where(e => !e.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.EnquiryType> AddAsync(SchoolDemo.Domain.Entities.EnquiryType entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.EnquiryTypes.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.EnquiryType> UpdateAsync(SchoolDemo.Domain.Entities.EnquiryType entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.EnquiryTypes.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.EnquiryTypes
            .FirstOrDefaultAsync(e => e.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.EnquiryType? MapToDomainEntity(SchoolDemo.Infrastructure.Data.EnquiryType? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.EnquiryType
        {
            Id = entity.Id,
            EnquiryTypeName = entity.EnquiryTypeName,
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

    private static SchoolDemo.Infrastructure.Data.EnquiryType MapToInfrastructureEntity(SchoolDemo.Domain.Entities.EnquiryType entity)
    {
        return new SchoolDemo.Infrastructure.Data.EnquiryType
        {
            Id = entity.Id,
            EnquiryTypeName = entity.EnquiryTypeName,
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
