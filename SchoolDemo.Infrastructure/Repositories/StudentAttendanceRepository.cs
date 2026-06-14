using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class StudentAttendanceRepository : IStudentAttendanceRepository
{
    private readonly SchoolDbContext _context;

    public StudentAttendanceRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.StudentAttendanceDetail?> GetByIdAsync(Guid id)
    {
        var entity = await _context.StudentAttendanceDetails.FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        return entity == null ? null : MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.StudentAttendanceDetail>> GetAllAsync()
    {
        var list = await _context.StudentAttendanceDetails.Where(e => !e.IsDeleted).ToListAsync();
        return list.Select(MapToDomainEntity);
    }

    public async Task<SchoolDemo.Domain.Entities.StudentAttendanceDetail> AddAsync(SchoolDemo.Domain.Entities.StudentAttendanceDetail entity)
    {
        var infra = MapToInfrastructureEntity(entity);
        await _context.StudentAttendanceDetails.AddAsync(infra);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infra)!;
    }

    public async Task<SchoolDemo.Domain.Entities.StudentAttendanceDetail> UpdateAsync(SchoolDemo.Domain.Entities.StudentAttendanceDetail entity)
    {
        var infra = MapToInfrastructureEntity(entity);
        _context.StudentAttendanceDetails.Update(infra);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infra)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var infra = await _context.StudentAttendanceDetails.FirstOrDefaultAsync(e => e.Id == id);
        if (infra != null)
        {
            infra.IsDeleted = true;
            infra.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static SchoolDemo.Domain.Entities.StudentAttendanceDetail? MapToDomainEntity(SchoolDemo.Infrastructure.Data.StudentAttendanceDetail? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.StudentAttendanceDetail
        {
            Id = entity.Id,
            StudentGuid = entity.StudentGuid,
            ClassId = entity.ClassId,
            SectionId = entity.SectionId,
            Month = entity.Month,
            Year = entity.Year,
            AttendenceDate = entity.AttendenceDate,
            AttendenceStatus = entity.AttendenceStatus,
            AttendanceReasonId = entity.AttendanceReasonId,
            AttendenceTime = entity.AttendenceTime,
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

    private static SchoolDemo.Infrastructure.Data.StudentAttendanceDetail MapToInfrastructureEntity(SchoolDemo.Domain.Entities.StudentAttendanceDetail entity)
    {
        return new SchoolDemo.Infrastructure.Data.StudentAttendanceDetail
        {
            Id = entity.Id,
            StudentGuid = entity.StudentGuid,
            ClassId = entity.ClassId,
            SectionId = entity.SectionId,
            Month = entity.Month,
            Year = entity.Year,
            AttendenceDate = entity.AttendenceDate,
            AttendenceStatus = entity.AttendenceStatus,
            AttendanceReasonId = entity.AttendanceReasonId,
            AttendenceTime = entity.AttendenceTime,
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
