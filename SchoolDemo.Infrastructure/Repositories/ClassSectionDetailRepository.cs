using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using DomainClassSectionDetail = SchoolDemo.Domain.Entities.ClassSectionDetail;
using InfrastructureClassSectionDetail = SchoolDemo.Infrastructure.Data.ClassSectionDetail;

namespace SchoolDemo.Infrastructure.Repositories;

public class ClassSectionDetailRepository : IClassSectionDetailRepository
{
    private readonly SchoolDbContext _context;

    public ClassSectionDetailRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<DomainClassSectionDetail?> GetByIdAsync(Guid id)
    {
        var entity = await _context.ClassSectionDetails
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<DomainClassSectionDetail>> GetAllAsync()
    {
        var entities = await _context.ClassSectionDetails
            .Where(c => !c.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<IEnumerable<DomainClassSectionDetail>> GetBySchoolIdAsync(Guid schoolId)
    {
        var entities = await _context.ClassSectionDetails
            .Where(c => !c.IsDeleted && c.SchoolId == schoolId)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<DomainClassSectionDetail> AddAsync(DomainClassSectionDetail classSectionDetail)
    {
        var entity = MapToInfrastructureEntity(classSectionDetail);
        await _context.ClassSectionDetails.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task<DomainClassSectionDetail> UpdateAsync(DomainClassSectionDetail classSectionDetail)
    {
        var existingEntity = await _context.ClassSectionDetails
            .FirstOrDefaultAsync(c => c.Id == classSectionDetail.Id);
        
        if (existingEntity == null)
        {
            throw new InvalidOperationException($"ClassSectionDetail with ID {classSectionDetail.Id} not found.");
        }

        // Update properties
        existingEntity.ClassMasterId = classSectionDetail.ClassMasterId;
        existingEntity.SectionMasterId = classSectionDetail.SectionMasterId;
        existingEntity.LocationId = classSectionDetail.LocationId;
        existingEntity.CompanyId = classSectionDetail.CompanyId;
        existingEntity.SchoolId = classSectionDetail.SchoolId;
        existingEntity.ModifiedBy = classSectionDetail.ModifiedBy;
        existingEntity.ModifiedDate = classSectionDetail.ModifiedDate;
        existingEntity.Status = classSectionDetail.Status;
        existingEntity.StatusMessage = classSectionDetail.StatusMessage;

        _context.ClassSectionDetails.Update(existingEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(existingEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.ClassSectionDetails
            .FirstOrDefaultAsync(c => c.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static DomainClassSectionDetail? MapToDomainEntity(InfrastructureClassSectionDetail? entity)
    {
        if (entity == null) return null;
        return new DomainClassSectionDetail
        {
            Id = entity.Id,
            ClassMasterId = entity.ClassMasterId,
            SectionMasterId = entity.SectionMasterId,
            LocationId = entity.LocationId,
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

    private static InfrastructureClassSectionDetail MapToInfrastructureEntity(DomainClassSectionDetail classSectionDetail)
    {
        return new InfrastructureClassSectionDetail
        {
            Id = classSectionDetail.Id,
            ClassMasterId = classSectionDetail.ClassMasterId,
            SectionMasterId = classSectionDetail.SectionMasterId,
            LocationId = classSectionDetail.LocationId,
            CompanyId = classSectionDetail.CompanyId,
            SchoolId = classSectionDetail.SchoolId,
            IsActive = classSectionDetail.IsActive,
            IsDeleted = classSectionDetail.IsDeleted,
            CreatedBy = classSectionDetail.CreatedBy,
            CreatedDate = classSectionDetail.CreatedDate,
            ModifiedBy = classSectionDetail.ModifiedBy,
            ModifiedDate = classSectionDetail.ModifiedDate,
            Status = classSectionDetail.Status,
            StatusMessage = classSectionDetail.StatusMessage
        };
    }
}
