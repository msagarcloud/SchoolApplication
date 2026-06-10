using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class TimeTableRepository : ITimeTableRepository
{
    private readonly SchoolDbContext _context;

    public TimeTableRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TimeTable>> GetAllAsync()
    {
        // Since infrastructure doesn't have a main TimeTable entity, we'll create TimeTable objects
        // from TimeTableSetupDetail and TimeTableClassPeriodDetail
        var setupDetails = await _context.TimeTableSetupDetails
            .Include(t => t.School)
            .Where(t => !t.IsDeleted)
            .ToListAsync();

        var timetables = new List<TimeTable>();
        foreach (var setup in setupDetails)
        {
            timetables.Add(new TimeTable
            {
                Id = setup.Id,
                Name = $"Timetable - {setup.School?.Name}",
                Description = "Generated from setup details",
                ClassId = Guid.Empty, // Will be set from period details
                AcademicYearId = setup.SessionId,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddYears(1),
                CompanyId = setup.CompanyId,
                SchoolId = setup.SchoolId,
                CreatedBy = setup.CreatedBy,
                CreatedDate = setup.CreatedDate,
                IsActive = setup.IsActive,
                IsDeleted = setup.IsDeleted,
                Status = setup.Status,
                StatusMessage = setup.StatusMessage
            });
        }

        return timetables;
    }

    public async Task<IEnumerable<TimeTable>> GetBySchoolIdAsync(Guid schoolId)
    {
        var setupDetails = await _context.TimeTableSetupDetails
            .Include(t => t.School)
            .Where(t => t.SchoolId == schoolId && !t.IsDeleted)
            .ToListAsync();

        var timetables = new List<TimeTable>();
        foreach (var setup in setupDetails)
        {
            timetables.Add(new TimeTable
            {
                Id = setup.Id,
                Name = $"Timetable - {setup.School?.Name}",
                Description = "Generated from setup details",
                ClassId = Guid.Empty,
                AcademicYearId = setup.SessionId,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddYears(1),
                CompanyId = setup.CompanyId,
                SchoolId = setup.SchoolId,
                CreatedBy = setup.CreatedBy,
                CreatedDate = setup.CreatedDate,
                IsActive = setup.IsActive,
                IsDeleted = setup.IsDeleted,
                Status = setup.Status,
                StatusMessage = setup.StatusMessage
            });
        }

        return timetables;
    }

    public async Task<IEnumerable<TimeTable>> GetByClassIdAsync(Guid classId)
    {
        var periodDetails = await _context.TimeTableClassPeriodDetails
            .Include(t => t.Class)
            .Include(t => t.Subject)
            .Where(t => t.ClassId == classId && !t.IsDeleted)
            .ToListAsync();

        // Group by session to create timetable entries
        var groupedBySession = periodDetails.GroupBy(t => t.SessionId);
        var timetables = new List<TimeTable>();

        foreach (var group in groupedBySession)
        {
            var firstDetail = group.First();
            timetables.Add(new TimeTable
            {
                Id = Guid.NewGuid(), // Generate new ID for domain entity
                Name = $"Timetable - {firstDetail.Class?.Name}",
                Description = "Generated from class period details",
                ClassId = classId,
                AcademicYearId = firstDetail.SessionId,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddYears(1),
                CompanyId = firstDetail.CompanyId,
                SchoolId = firstDetail.SchoolId,
                CreatedBy = firstDetail.CreatedBy,
                CreatedDate = firstDetail.CreatedDate,
                IsActive = firstDetail.IsActive,
                IsDeleted = firstDetail.IsDeleted,
                Status = firstDetail.Status,
                StatusMessage = firstDetail.StatusMessage
            });
        }

        return timetables;
    }

    public async Task<TimeTable?> GetByIdAsync(Guid id)
    {
        var setupDetail = await _context.TimeTableSetupDetails
            .Include(t => t.School)
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);

        if (setupDetail == null) return null;

        return new TimeTable
        {
            Id = setupDetail.Id,
            Name = $"Timetable - {setupDetail.School?.Name}",
            Description = "Generated from setup details",
            ClassId = Guid.Empty,
            AcademicYearId = setupDetail.SessionId,
            StartDate = DateTime.UtcNow,
            EndDate = DateTime.UtcNow.AddYears(1),
            CompanyId = setupDetail.CompanyId,
            SchoolId = setupDetail.SchoolId,
            CreatedBy = setupDetail.CreatedBy,
            CreatedDate = setupDetail.CreatedDate,
            IsActive = setupDetail.IsActive,
            IsDeleted = setupDetail.IsDeleted,
            Status = setupDetail.Status,
            StatusMessage = setupDetail.StatusMessage
        };
    }

    public async Task<TimeTable> CreateAsync(TimeTable timetable)
    {
        // Create a TimeTableSetupDetail in the infrastructure
        var setupDetail = new TimeTableSetupDetail
        {
            Id = timetable.Id,
            SchoolStartTime = TimeOnly.Parse("08:00"),
            SchoolEndTime = TimeOnly.Parse("15:00"),
            PeriodStartTime = TimeOnly.Parse("08:00"),
            TotalPeriods = 8,
            PeriodDuration = 45,
            RecessDuration = 30,
            RecessAfterPeriod = 4,
            SessionId = timetable.AcademicYearId,
            CompanyId = timetable.CompanyId,
            SchoolId = timetable.SchoolId,
            CreatedBy = timetable.CreatedBy,
            CreatedDate = DateTime.UtcNow,
            IsActive = timetable.IsActive,
            IsDeleted = false,
            Status = timetable.Status,
            StatusMessage = timetable.StatusMessage
        };

        await _context.TimeTableSetupDetails.AddAsync(setupDetail);
        await _context.SaveChangesAsync();
        return timetable;
    }

    public async Task<TimeTable> UpdateAsync(TimeTable timetable)
    {
        var setupDetail = await _context.TimeTableSetupDetails
            .FirstOrDefaultAsync(t => t.Id == timetable.Id);

        if (setupDetail != null)
        {
            setupDetail.ModifiedBy = timetable.ModifiedBy;
            setupDetail.ModifiedDate = DateTime.UtcNow;
            setupDetail.Status = timetable.Status;
            setupDetail.StatusMessage = timetable.StatusMessage;
            setupDetail.IsActive = timetable.IsActive;

            _context.TimeTableSetupDetails.Update(setupDetail);
            await _context.SaveChangesAsync();
        }

        return timetable;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var setupDetail = await _context.TimeTableSetupDetails
            .FirstOrDefaultAsync(t => t.Id == id);

        if (setupDetail == null) return false;

        setupDetail.IsDeleted = true;
        setupDetail.ModifiedDate = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<TimeTableDetail>> GetTimeTableDetailsByTimeTableIdAsync(Guid timeTableId)
    {
        var periodDetails = await _context.TimeTableClassPeriodDetails
            .Include(t => t.Subject)
            .Include(t => t.Class)
            .Where(t => t.SessionId == timeTableId && !t.IsDeleted)
            .OrderBy(t => t.DayOfWeek)
                .ThenBy(t => t.PeriodNumber)
            .ToListAsync();

        return periodDetails.Select(pd => new TimeTableDetail
        {
            Id = pd.Id,
            TimeTableId = timeTableId,
            ClassId = pd.ClassId,
            SubjectId = pd.SubjectId,
            TeacherId = pd.TeacherId ?? Guid.Empty,
            DayOfWeek = pd.DayOfWeek,
            PeriodNumber = pd.PeriodNumber ?? 0,
            RoomNumber = null, // Not available in infrastructure entity
            CompanyId = pd.CompanyId,
            SchoolId = pd.SchoolId,
            CreatedBy = pd.CreatedBy,
            CreatedDate = pd.CreatedDate,
            ModifiedBy = pd.ModifiedBy,
            ModifiedDate = pd.ModifiedDate,
            IsActive = pd.IsActive,
            IsDeleted = pd.IsDeleted,
            Status = pd.Status,
            StatusMessage = pd.StatusMessage
        });
    }

    public async Task<IEnumerable<TimeTableDetail>> GetTimeTableDetailsByClassIdAsync(Guid classId)
    {
        var periodDetails = await _context.TimeTableClassPeriodDetails
            .Include(t => t.Subject)
            .Include(t => t.Class)
            .Where(t => t.ClassId == classId && !t.IsDeleted)
            .OrderBy(t => t.DayOfWeek)
                .ThenBy(t => t.PeriodNumber)
            .ToListAsync();

        return periodDetails.Select(pd => new TimeTableDetail
        {
            Id = pd.Id,
            TimeTableId = pd.SessionId,
            ClassId = pd.ClassId,
            SubjectId = pd.SubjectId,
            TeacherId = pd.TeacherId ?? Guid.Empty,
            DayOfWeek = pd.DayOfWeek,
            PeriodNumber = pd.PeriodNumber ?? 0,
            RoomNumber = null,
            CompanyId = pd.CompanyId,
            SchoolId = pd.SchoolId,
            CreatedBy = pd.CreatedBy,
            CreatedDate = pd.CreatedDate,
            ModifiedBy = pd.ModifiedBy,
            ModifiedDate = pd.ModifiedDate,
            IsActive = pd.IsActive,
            IsDeleted = pd.IsDeleted,
            Status = pd.Status,
            StatusMessage = pd.StatusMessage
        });
    }

    public async Task<TimeTableDetail> CreateTimeTableDetailAsync(TimeTableDetail detail)
    {
        var periodDetail = new TimeTableClassPeriodDetail
        {
            Id = detail.Id,
            ClassId = detail.ClassId,
            SubjectId = detail.SubjectId,
            TeacherId = detail.TeacherId,
            DayOfWeek = detail.DayOfWeek,
            PeriodNumber = detail.PeriodNumber,
            SessionId = detail.TimeTableId,
            CompanyId = detail.CompanyId,
            SchoolId = detail.SchoolId,
            CreatedBy = detail.CreatedBy,
            CreatedDate = DateTime.UtcNow,
            IsActive = detail.IsActive,
            IsDeleted = false,
            Status = detail.Status,
            StatusMessage = detail.StatusMessage
        };

        await _context.TimeTableClassPeriodDetails.AddAsync(periodDetail);
        await _context.SaveChangesAsync();
        return detail;
    }

    public async Task<TimeTableDetail> UpdateTimeTableDetailAsync(TimeTableDetail detail)
    {
        var periodDetail = await _context.TimeTableClassPeriodDetails
            .FirstOrDefaultAsync(t => t.Id == detail.Id);

        if (periodDetail != null)
        {
            periodDetail.SubjectId = detail.SubjectId;
            periodDetail.TeacherId = detail.TeacherId;
            periodDetail.DayOfWeek = detail.DayOfWeek;
            periodDetail.PeriodNumber = detail.PeriodNumber;
            periodDetail.ModifiedBy = detail.ModifiedBy;
            periodDetail.ModifiedDate = DateTime.UtcNow;
            periodDetail.Status = detail.Status;
            periodDetail.StatusMessage = detail.StatusMessage;

            _context.TimeTableClassPeriodDetails.Update(periodDetail);
            await _context.SaveChangesAsync();
        }

        return detail;
    }

    public async Task<bool> DeleteTimeTableDetailAsync(Guid id)
    {
        var periodDetail = await _context.TimeTableClassPeriodDetails
            .FirstOrDefaultAsync(t => t.Id == id);

        if (periodDetail == null) return false;

        periodDetail.IsDeleted = true;
        periodDetail.ModifiedDate = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> TimeTableExistsAsync(Guid classId, Guid academicYearId)
    {
        return await _context.TimeTableClassPeriodDetails
            .AnyAsync(t => t.ClassId == classId && 
                          t.SessionId == academicYearId && 
                          !t.IsDeleted);
    }

    public async Task<IEnumerable<TimeTableDetail>> GetTimeTableByClassAndDayAsync(Guid classId, int dayOfWeek)
    {
        var periodDetails = await _context.TimeTableClassPeriodDetails
            .Include(t => t.Subject)
            .Include(t => t.Class)
            .Where(t => t.ClassId == classId && 
                        t.DayOfWeek == dayOfWeek && 
                        !t.IsDeleted)
            .OrderBy(t => t.PeriodNumber)
            .ToListAsync();

        return periodDetails.Select(pd => new TimeTableDetail
        {
            Id = pd.Id,
            TimeTableId = pd.SessionId,
            ClassId = pd.ClassId,
            SubjectId = pd.SubjectId,
            TeacherId = pd.TeacherId ?? Guid.Empty,
            DayOfWeek = pd.DayOfWeek,
            PeriodNumber = pd.PeriodNumber ?? 0,
            RoomNumber = null,
            CompanyId = pd.CompanyId,
            SchoolId = pd.SchoolId,
            CreatedBy = pd.CreatedBy,
            CreatedDate = pd.CreatedDate,
            ModifiedBy = pd.ModifiedBy,
            ModifiedDate = pd.ModifiedDate,
            IsActive = pd.IsActive,
            IsDeleted = pd.IsDeleted,
            Status = pd.Status,
            StatusMessage = pd.StatusMessage
        });
    }
}
