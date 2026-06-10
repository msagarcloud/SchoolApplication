using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using TeacherSubjectDetail = SchoolDemo.Domain.Entities.TeacherSubjectDetail;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class TeacherSubjectDetailRepository : ITeacherSubjectDetailRepository
{
    private readonly SchoolDbContext _context;

    public TeacherSubjectDetailRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<TeacherSubjectDetail?> GetByIdAsync(Guid id)
    {
        var infraEntity = await _context.TeacherSubjectDetails
            .FirstOrDefaultAsync(tsd => tsd.Id == id && !tsd.IsDeleted);

        if (infraEntity == null)
            return null;

        return MapToDomainEntity(infraEntity);
    }

    public async Task<IEnumerable<TeacherSubjectDetail>> GetAllAsync()
    {
        var infraEntities = await _context.TeacherSubjectDetails
            .Where(tsd => !tsd.IsDeleted)
            .ToListAsync();

        return infraEntities.Select(MapToDomainEntity);
    }

    public async Task<IEnumerable<TeacherSubjectDetail>> GetBySchoolIdAsync(Guid schoolId)
    {
        var infraEntities = await _context.TeacherSubjectDetails
            .Where(tsd => tsd.SchoolId == schoolId && !tsd.IsDeleted)
            .ToListAsync();

        return infraEntities.Select(MapToDomainEntity);
    }

    public async Task<IEnumerable<TeacherSubjectDetail>> GetBySubjectIdAsync(Guid subjectId)
    {
        var infraEntities = await _context.TeacherSubjectDetails
            .Where(tsd => tsd.SubjectId == subjectId && !tsd.IsDeleted)
            .ToListAsync();

        return infraEntities.Select(MapToDomainEntity);
    }

    public async Task<TeacherSubjectDetail> CreateAsync(TeacherSubjectDetail teacherSubjectDetail)
    {
        var infraEntity = MapToInfraEntity(teacherSubjectDetail);
        await _context.TeacherSubjectDetails.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        
        return MapToDomainEntity(infraEntity);
    }

    public async Task<TeacherSubjectDetail?> UpdateAsync(TeacherSubjectDetail teacherSubjectDetail)
    {
        var existingInfraEntity = await _context.TeacherSubjectDetails
            .FirstOrDefaultAsync(tsd => tsd.Id == teacherSubjectDetail.Id && !tsd.IsDeleted);

        if (existingInfraEntity == null)
            return null;

        existingInfraEntity.TeacherId = teacherSubjectDetail.TeacherId;
        existingInfraEntity.SubjectId = teacherSubjectDetail.SubjectId;
        existingInfraEntity.ClassId = teacherSubjectDetail.ClassId;
        existingInfraEntity.CompanyId = teacherSubjectDetail.CompanyId;
        existingInfraEntity.SchoolId = teacherSubjectDetail.SchoolId;
        existingInfraEntity.IsActive = teacherSubjectDetail.IsActive;
        existingInfraEntity.ModifiedBy = teacherSubjectDetail.ModifiedBy;
        existingInfraEntity.ModifiedDate = teacherSubjectDetail.ModifiedDate;
        existingInfraEntity.Status = teacherSubjectDetail.Status;
        existingInfraEntity.StatusMessage = teacherSubjectDetail.StatusMessage;

        await _context.SaveChangesAsync();
        return MapToDomainEntity(existingInfraEntity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _context.TeacherSubjectDetails
            .FirstOrDefaultAsync(tsd => tsd.Id == id && !tsd.IsDeleted);

        if (entity == null)
            return false;

        entity.IsDeleted = true;
        entity.ModifiedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return true;
    }

    private static TeacherSubjectDetail MapToDomainEntity(SchoolDemo.Infrastructure.Data.TeacherSubjectDetail infraEntity)
    {
        return new TeacherSubjectDetail
        {
            Id = infraEntity.Id,
            TeacherId = infraEntity.TeacherId,
            SubjectId = infraEntity.SubjectId,
            ClassId = infraEntity.ClassId,
            CompanyId = infraEntity.CompanyId,
            SchoolId = infraEntity.SchoolId,
            IsActive = infraEntity.IsActive,
            IsDeleted = infraEntity.IsDeleted,
            CreatedBy = infraEntity.CreatedBy,
            CreatedDate = infraEntity.CreatedDate,
            ModifiedBy = infraEntity.ModifiedBy,
            ModifiedDate = infraEntity.ModifiedDate,
            Status = infraEntity.Status,
            StatusMessage = infraEntity.StatusMessage
        };
    }

    private static SchoolDemo.Infrastructure.Data.TeacherSubjectDetail MapToInfraEntity(TeacherSubjectDetail domainEntity)
    {
        return new SchoolDemo.Infrastructure.Data.TeacherSubjectDetail
        {
            Id = domainEntity.Id,
            TeacherId = domainEntity.TeacherId,
            SubjectId = domainEntity.SubjectId,
            ClassId = domainEntity.ClassId,
            CompanyId = domainEntity.CompanyId,
            SchoolId = domainEntity.SchoolId,
            IsActive = domainEntity.IsActive,
            IsDeleted = domainEntity.IsDeleted,
            CreatedBy = domainEntity.CreatedBy,
            CreatedDate = domainEntity.CreatedDate,
            ModifiedBy = domainEntity.ModifiedBy,
            ModifiedDate = domainEntity.ModifiedDate,
            Status = domainEntity.Status,
            StatusMessage = domainEntity.StatusMessage
        };
    }
}
