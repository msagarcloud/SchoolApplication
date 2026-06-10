using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class EnquiryRepository : IEnquiryRepository
{
    private readonly SchoolDbContext _context;

    public EnquiryRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.EnquiryMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.EnquiryMasters
            .Include(e => e.Company)
            .Include(e => e.School)
            .FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.EnquiryMaster>> GetAllAsync()
    {
        var entities = await _context.EnquiryMasters
            .Include(e => e.Company)
            .Include(e => e.School)
            .Where(e => !e.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<SchoolDemo.Domain.Entities.EnquiryMaster> AddAsync(SchoolDemo.Domain.Entities.EnquiryMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.EnquiryMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.EnquiryMaster> UpdateAsync(SchoolDemo.Domain.Entities.EnquiryMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.EnquiryMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.EnquiryMasters
            .FirstOrDefaultAsync(e => e.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.EnquiryMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.EnquiryMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.EnquiryMaster
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
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate
        };
    }

    private static SchoolDemo.Infrastructure.Data.EnquiryMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.EnquiryMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.EnquiryMaster
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
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate
        };
    }
}
