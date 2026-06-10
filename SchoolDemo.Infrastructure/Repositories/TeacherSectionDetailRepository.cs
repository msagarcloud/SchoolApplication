using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using DomainEntity = SchoolDemo.Domain.Entities.TeacherSectionDetail;
using InfrastructureEntity = SchoolDemo.Infrastructure.Data.TeacherSectionDetail;

namespace SchoolDemo.Infrastructure.Repositories;

public class TeacherSectionDetailRepository : ITeacherSectionDetailRepository
{
    private readonly SchoolDbContext _context;

    public TeacherSectionDetailRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<DomainEntity?> GetByIdAsync(Guid id)
    {
        var entity = await _context.TeacherSectionDetails
            .Include(t => t.Teacher)
            .Include(t => t.Class)
            .Include(t => t.Section)
            .Include(t => t.Subject)
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<DomainEntity>> GetAllAsync()
    {
        var entities = await _context.TeacherSectionDetails
            .Include(t => t.Teacher)
            .Include(t => t.Class)
            .Include(t => t.Section)
            .Include(t => t.Subject)
            .Where(t => !t.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<DomainEntity> AddAsync(DomainEntity teacherSectionDetail)
    {
        var entity = MapToInfrastructureEntity(teacherSectionDetail);
        await _context.TeacherSectionDetails.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task<DomainEntity> UpdateAsync(DomainEntity teacherSectionDetail)
    {
        var entity = MapToInfrastructureEntity(teacherSectionDetail);
        _context.TeacherSectionDetails.Update(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.TeacherSectionDetails
            .FirstOrDefaultAsync(t => t.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static DomainEntity? MapToDomainEntity(InfrastructureEntity? entity)
    {
        if (entity == null) return null;
        return new DomainEntity
        {
            Id = entity.Id,
            TeacherId = entity.TeacherId,
            ClassId = entity.ClassId,
            SectionId = entity.SectionId,
            SubjectId = entity.SubjectId,
            IsClassTeacher = entity.IsClassTeacher,
            SchoolId = entity.SchoolId,
            CompanyId = entity.CompanyId,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage,
            TeacherName = $"{entity.Teacher?.FirstName} {entity.Teacher?.LastName}",
            ClassName = entity.Class?.Name,
            SectionName = entity.Section?.Name,
            SubjectName = entity.Subject?.SubjectName
        };
    }

    private static InfrastructureEntity MapToInfrastructureEntity(DomainEntity teacherSectionDetail)
    {
        return new InfrastructureEntity
        {
            Id = teacherSectionDetail.Id,
            TeacherId = teacherSectionDetail.TeacherId,
            ClassId = teacherSectionDetail.ClassId,
            SectionId = teacherSectionDetail.SectionId,
            SubjectId = teacherSectionDetail.SubjectId,
            IsClassTeacher = teacherSectionDetail.IsClassTeacher,
            SchoolId = teacherSectionDetail.SchoolId,
            CompanyId = teacherSectionDetail.CompanyId,
            IsActive = teacherSectionDetail.IsActive,
            IsDeleted = teacherSectionDetail.IsDeleted,
            CreatedBy = teacherSectionDetail.CreatedBy,
            CreatedDate = teacherSectionDetail.CreatedDate,
            ModifiedBy = teacherSectionDetail.ModifiedBy,
            ModifiedDate = teacherSectionDetail.ModifiedDate,
            Status = teacherSectionDetail.Status,
            StatusMessage = teacherSectionDetail.StatusMessage
        };
    }
}
