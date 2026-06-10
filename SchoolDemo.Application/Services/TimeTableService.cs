using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class TimeTableService : ITimeTableService
{
    private readonly ITimeTableRepository _timeTableRepository;
    private readonly IClassRepository _classRepository;
    private readonly ISubjectRepository _subjectRepository;
    private readonly ITeacherSubjectDetailRepository _teacherSubjectRepository;
    private readonly IClassSubjectDetailRepository _classSubjectRepository;

    public TimeTableService(
        ITimeTableRepository timeTableRepository,
        IClassRepository classRepository,
        ISubjectRepository subjectRepository,
        ITeacherSubjectDetailRepository teacherSubjectRepository,
        IClassSubjectDetailRepository classSubjectRepository)
    {
        _timeTableRepository = timeTableRepository;
        _classRepository = classRepository;
        _subjectRepository = subjectRepository;
        _teacherSubjectRepository = teacherSubjectRepository;
        _classSubjectRepository = classSubjectRepository;
    }

    public async Task<IEnumerable<TimeTable>> GetAllAsync()
    {
        return await _timeTableRepository.GetAllAsync();
    }

    public async Task<IEnumerable<TimeTable>> GetBySchoolIdAsync(Guid schoolId)
    {
        return await _timeTableRepository.GetBySchoolIdAsync(schoolId);
    }

    public async Task<IEnumerable<TimeTable>> GetByClassIdAsync(Guid classId)
    {
        return await _timeTableRepository.GetByClassIdAsync(classId);
    }

    public async Task<TimeTable?> GetByIdAsync(Guid id)
    {
        return await _timeTableRepository.GetByIdAsync(id);
    }

    public async Task<TimeTable> CreateAsync(TimeTable timetable)
    {
        return await _timeTableRepository.CreateAsync(timetable);
    }

    public async Task<TimeTable> UpdateAsync(TimeTable timetable)
    {
        return await _timeTableRepository.UpdateAsync(timetable);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _timeTableRepository.DeleteAsync(id);
    }

    public async Task<TimeTable> GenerateTimeTableAsync(Guid classId, Guid academicYearId, Guid createdBy)
    {
        // Check if timetable already exists
        if (await _timeTableRepository.TimeTableExistsAsync(classId, academicYearId))
        {
            throw new InvalidOperationException($"Timetable already exists for class {classId} and academic year {academicYearId}");
        }

        // Get class information
        var classInfo = await _classRepository.GetByIdAsync(classId);
        if (classInfo == null)
        {
            throw new ArgumentException($"Class with ID {classId} not found");
        }

        // Get subjects assigned to this class
        var classSubjects = await _classSubjectRepository.GetByClassIdAsync(classId);
        if (!classSubjects.Any())
        {
            throw new ArgumentException($"No subjects assigned to class {classInfo.Name}");
        }

        // Create timetable
        var timetable = new TimeTable
        {
            Id = Guid.NewGuid(),
            Name = $"Timetable - {classInfo.Name}",
            Description = $"Generated timetable for {classInfo.Name}",
            ClassId = classId,
            AcademicYearId = academicYearId,
            StartDate = DateTime.UtcNow,
            EndDate = DateTime.UtcNow.AddYears(1),
            CompanyId = classInfo.CompanyId,
            SchoolId = classInfo.SchoolId,
            CreatedBy = createdBy,
            CreatedDate = DateTime.UtcNow,
            IsActive = true,
            IsDeleted = false,
            Status = "Generated",
            StatusMessage = "Automatically generated timetable"
        };

        var createdTimetable = await _timeTableRepository.CreateAsync(timetable);

        // Generate timetable details
        await GenerateTimeTableDetailsAsync(createdTimetable.Id, classId, classInfo.CompanyId, classInfo.SchoolId, createdBy);

        return createdTimetable;
    }

    public async Task<IEnumerable<TimeTable>> GenerateTimeTablesForAllClassesAsync(Guid academicYearId, Guid createdBy)
    {
        var classes = await _classRepository.GetAllAsync();
        var generatedTimetables = new List<TimeTable>();

        foreach (var classInfo in classes.Where(c => c.IsActive && !c.IsDeleted))
        {
            try
            {
                var timetable = await GenerateTimeTableAsync(classInfo.Id, academicYearId, createdBy);
                generatedTimetables.Add(timetable);
            }
            catch (Exception ex)
            {
                // Log error and continue with next class
                Console.WriteLine($"Failed to generate timetable for class {classInfo.Name}: {ex.Message}");
            }
        }

        return generatedTimetables;
    }

    public async Task<bool> ValidateTimeTableAsync(Guid classId, Guid academicYearId)
    {
        var timetable = await _timeTableRepository.GetByClassIdAsync(classId);
        var currentTimetable = timetable.FirstOrDefault(t => t.AcademicYearId == academicYearId);
        
        if (currentTimetable == null)
            return false;

        var details = await _timeTableRepository.GetTimeTableDetailsByTimeTableIdAsync(currentTimetable.Id);
        
        // Check if all periods are filled for all days
        var requiredPeriodsPerDay = 8; // Default
        var requiredDaysPerWeek = 6; // Monday to Saturday

        var groupedDetails = details.GroupBy(d => d.DayOfWeek);
        
        foreach (var dayGroup in groupedDetails)
        {
            if (dayGroup.Count() < requiredPeriodsPerDay)
                return false;
        }

        return groupedDetails.Count() >= requiredDaysPerWeek;
    }

    public async Task<IEnumerable<TimeTableDetail>> GetTimeTableDetailsAsync(Guid timeTableId)
    {
        return await _timeTableRepository.GetTimeTableDetailsByTimeTableIdAsync(timeTableId);
    }

    public async Task<IEnumerable<TimeTableDetail>> GetTimeTableByClassAsync(Guid classId)
    {
        return await _timeTableRepository.GetTimeTableDetailsByClassIdAsync(classId);
    }

    public async Task<TimeTableDetail> AddTimeTableDetailAsync(TimeTableDetail detail)
    {
        return await _timeTableRepository.CreateTimeTableDetailAsync(detail);
    }

    public async Task<TimeTableDetail> UpdateTimeTableDetailAsync(TimeTableDetail detail)
    {
        return await _timeTableRepository.UpdateTimeTableDetailAsync(detail);
    }

    public async Task<bool> DeleteTimeTableDetailAsync(Guid id)
    {
        return await _timeTableRepository.DeleteTimeTableDetailAsync(id);
    }

    public async Task<IEnumerable<TimeTableDetail>> GetTimeTableByClassAndDayAsync(Guid classId, int dayOfWeek)
    {
        return await _timeTableRepository.GetTimeTableByClassAndDayAsync(classId, dayOfWeek);
    }

    public async Task<bool> IsTeacherAvailableAsync(Guid teacherId, int dayOfWeek, int periodNumber, Guid? excludeDetailId = null)
    {
        // Get all timetable details for this teacher on this day and period
        var allDetails = await _timeTableRepository.GetAllAsync();
        
        foreach (var timetable in allDetails)
        {
            var details = await _timeTableRepository.GetTimeTableDetailsByTimeTableIdAsync(timetable.Id);
            var conflict = details.FirstOrDefault(d => 
                d.TeacherId == teacherId && 
                d.DayOfWeek == dayOfWeek && 
                d.PeriodNumber == periodNumber &&
                (excludeDetailId == null || d.Id != excludeDetailId) &&
                !d.IsDeleted);

            if (conflict != null)
                return false;
        }

        return true;
    }

    public async Task<bool> IsClassAvailableAsync(Guid classId, int dayOfWeek, int periodNumber, Guid? excludeDetailId = null)
    {
        // Get all timetable details for this class on this day and period
        var allDetails = await _timeTableRepository.GetAllAsync();
        
        foreach (var timetable in allDetails)
        {
            var details = await _timeTableRepository.GetTimeTableDetailsByTimeTableIdAsync(timetable.Id);
            var conflict = details.FirstOrDefault(d => 
                d.ClassId == classId && 
                d.DayOfWeek == dayOfWeek && 
                d.PeriodNumber == periodNumber &&
                (excludeDetailId == null || d.Id != excludeDetailId) &&
                !d.IsDeleted);

            if (conflict != null)
                return false;
        }

        return true;
    }

    private async Task GenerateTimeTableDetailsAsync(Guid timetableId, Guid classId, Guid companyId, Guid schoolId, Guid createdBy)
    {
        // Get subjects assigned to this class
        var classSubjects = await _classSubjectRepository.GetByClassIdAsync(classId);
        
        // Get teacher assignments for these subjects
        var subjectIds = classSubjects.Select(cs => cs.SubjectId).ToList();
        var teacherAssignments = new List<(Guid SubjectId, Guid TeacherId, int PeriodsPerWeek)>();

        foreach (var subjectId in subjectIds)
        {
            var assignments = await _teacherSubjectRepository.GetBySubjectIdAsync(subjectId);
            var subject = await _subjectRepository.GetByIdAsync(subjectId);
            
            if (assignments.Any() && subject != null)
            {
                var assignment = assignments.First(); // Take first available teacher
                teacherAssignments.Add((subjectId, assignment.TeacherId, subject.PeriodsPerWeek ?? 1));
            }
        }

        // Generate timetable for 6 days (Monday to Saturday)
        var daysOfWeek = Enumerable.Range(1, 6); // 1=Monday, 6=Saturday
        var periodsPerDay = 8;
        var currentSchedule = new List<(int Day, int Period, Guid SubjectId, Guid TeacherId)>();

        // Distribute subjects across the week
        foreach (var (subjectId, teacherId, periodsPerWeek) in teacherAssignments)
        {
            var scheduledPeriods = 0;
            var attempts = 0;
            var maxAttempts = 100;

            while (scheduledPeriods < periodsPerWeek && attempts < maxAttempts)
            {
                attempts++;
                
                // Random day and period
                var day = daysOfWeek.ElementAt(Random.Shared.Next(daysOfWeek.Count()));
                var period = Random.Shared.Next(1, periodsPerDay + 1);

                // Check if this slot is available
                var isSlotAvailable = !currentSchedule.Any(s => s.Day == day && s.Period == period) &&
                                    await IsTeacherAvailableAsync(teacherId, day, period) &&
                                    await IsClassAvailableAsync(classId, day, period);

                if (isSlotAvailable)
                {
                    currentSchedule.Add((day, period, subjectId, teacherId));
                    scheduledPeriods++;
                }
            }
        }

        // Create timetable detail entities
        foreach (var (day, period, subjectId, teacherId) in currentSchedule)
        {
            var detail = new TimeTableDetail
            {
                Id = Guid.NewGuid(),
                TimeTableId = timetableId,
                ClassId = classId,
                SubjectId = subjectId,
                TeacherId = teacherId,
                DayOfWeek = day,
                PeriodNumber = period,
                CompanyId = companyId,
                SchoolId = schoolId,
                CreatedBy = createdBy,
                CreatedDate = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false,
                Status = "Scheduled",
                StatusMessage = "Automatically scheduled"
            };

            await _timeTableRepository.CreateTimeTableDetailAsync(detail);
        }
    }
}
