using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using DomainClassSubjectDetail = SchoolDemo.Domain.Entities.ClassSubjectDetail;
using InfrastructureClassSubjectDetail = SchoolDemo.Infrastructure.Data.ClassSubjectDetail;

namespace SchoolDemo.Infrastructure.Repositories;

public class ClassSubjectDetailRepository : IClassSubjectDetailRepository
{
    private readonly SchoolDbContext _context;

    public ClassSubjectDetailRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<DomainClassSubjectDetail?> GetByIdAsync(Guid id, Guid schoolId)
    {
        var entity = await _context.ClassSubjectDetails
            .FirstOrDefaultAsync(c => c.Id == id && c.SchoolId == schoolId && !c.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<DomainClassSubjectDetail>> GetAllAsync(Guid schoolId)
    {
        var entities = await _context.ClassSubjectDetails
            .Where(c => c.SchoolId == schoolId && !c.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<IEnumerable<DomainClassSubjectDetail>> GetByClassIdAsync(Guid classId)
    {
        var entities = await _context.ClassSubjectDetails
            .Where(c => c.ClassMasterId == classId && !c.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<DomainClassSubjectDetail> AddAsync(DomainClassSubjectDetail classSubjectDetail)
    {
        var entity = MapToInfrastructureEntity(classSubjectDetail);
        await _context.ClassSubjectDetails.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task<DomainClassSubjectDetail> UpdateAsync(DomainClassSubjectDetail classSubjectDetail)
    {
        var entity = MapToInfrastructureEntity(classSubjectDetail);
        _context.ClassSubjectDetails.Update(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.ClassSubjectDetails
            .FirstOrDefaultAsync(c => c.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static DomainClassSubjectDetail? MapToDomainEntity(InfrastructureClassSubjectDetail? entity)
    {
        if (entity == null) return null;
        return new DomainClassSubjectDetail
        {
            Id = entity.Id,
            ClassMasterId = entity.ClassMasterId,
            SubjectId = entity.SubjectId,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage,
            PeriodsPerWeek = entity.NumberOfPeriodPerWeek
        };
    }

    private static InfrastructureClassSubjectDetail MapToInfrastructureEntity(DomainClassSubjectDetail classSubjectDetail)
    {
        return new InfrastructureClassSubjectDetail
        {
            Id = classSubjectDetail.Id,
            ClassMasterId = classSubjectDetail.ClassMasterId,
            SubjectId = classSubjectDetail.SubjectId,
            CompanyId = classSubjectDetail.CompanyId,
            SchoolId = classSubjectDetail.SchoolId,
            IsActive = classSubjectDetail.IsActive,
            IsDeleted = classSubjectDetail.IsDeleted,
            CreatedBy = classSubjectDetail.CreatedBy,
            CreatedDate = classSubjectDetail.CreatedDate,
            ModifiedBy = classSubjectDetail.ModifiedBy,
            ModifiedDate = classSubjectDetail.ModifiedDate,
            Status = classSubjectDetail.Status,
            StatusMessage = classSubjectDetail.StatusMessage,
            NumberOfPeriodPerWeek = classSubjectDetail.PeriodsPerWeek
        };
    }
}
