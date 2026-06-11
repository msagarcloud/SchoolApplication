using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using DomainStudentMaster = SchoolDemo.Domain.Entities.StudentMaster;
using InfrastructureStudentMaster = SchoolDemo.Infrastructure.Data.StudentMaster;

namespace SchoolDemo.Infrastructure.Repositories;

public class StudentRepositoryOptimized : IStudentRepository
{
    private readonly SchoolDbContext _context;
    private readonly IMemoryCache _cache;
    private static long _cacheVersion;

    public StudentRepositoryOptimized(SchoolDbContext context, IMemoryCache cache)
    {
        _context = context;
        _cache = cache;
    }

    public async Task<DomainStudentMaster?> GetByIdAsync(Guid id)
    {
        var cacheKey = $"students_v{_cacheVersion}_by_id_{id}";
        if (_cache.TryGetValue(cacheKey, out DomainStudentMaster? cachedStudent))
        {
            return cachedStudent;
        }

        var entity = await _context.StudentMasters
            .AsNoTracking()
            .Include(s => s.Class)
            .Include(s => s.Section)
            .Include(s => s.Category)
            .Include(s => s.School)
            .Include(s => s.Company)
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);

        var student = MapToDomainEntity(entity);

        // If parent info exists, prefer parent's record for father's name
        if (student != null)
        {
            var father = await _context.ParentMasters
                .AsNoTracking()
                .Include(p => p.RelationType)
                .FirstOrDefaultAsync(p => p.StudentGuid == entity.Id && !p.IsDeleted && p.RelationType != null && p.RelationType.Name == "Father");

            if (father != null)
            {
                var parts = new[] { father.ParentFirstName, father.ParentLastName };
                student.FathersName = string.Join(" ", parts.Where(p => !string.IsNullOrWhiteSpace(p)));
            }

            _cache.Set(cacheKey, student, TimeSpan.FromMinutes(30));
        }

        return student;
    }

    public async Task<IEnumerable<DomainStudentMaster>> GetAllAsync()
    {
        var cacheKey = $"students_v{_cacheVersion}_all";
        if (_cache.TryGetValue(cacheKey, out IEnumerable<DomainStudentMaster>? cachedStudents))
        {
            return cachedStudents!;
        }

        var entities = await _context.StudentMasters
            .AsNoTracking()
            .Include(s => s.Class)
            .Include(s => s.Section)
            .Include(s => s.Category)
            .Include(s => s.School)
            .Include(s => s.Company)
            .Where(s => !s.IsDeleted)
            .ToListAsync();
        
        var students = entities
            .Select(MapToDomainEntity)
            .Where(e => e != null)
            .Select(e => e!)
            .ToList();

        // Assign fathers' names from ParentMaster table
        await AssignFatherNamesAsync(students);

        _cache.Set(cacheKey, students, TimeSpan.FromMinutes(10));

        return students;
    }

    public async Task<DomainStudentMaster> AddAsync(DomainStudentMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.StudentMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        
        // Clear cache
        ClearStudentCache();
        
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<DomainStudentMaster> UpdateAsync(DomainStudentMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.StudentMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        
        // Clear cache
        ClearStudentCache();
        _cache.Remove($"students_v{_cacheVersion}_by_id_{entity.Id}");
        
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.StudentMasters
            .FirstOrDefaultAsync(s => s.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            
            // Clear cache
            ClearStudentCache();
            _cache.Remove($"students_v{_cacheVersion}_by_id_{id}");
        }
    }

    // Optimized method for getting students with projection (less data transfer)
    public async Task<IEnumerable<DomainStudentMaster>> GetStudentsMinimalAsync()
    {
        return await GetMinimalAsync();
    }

    public async Task<IEnumerable<DomainStudentMaster>> GetMinimalAsync()
    {
        var cacheKey = $"students_v{_cacheVersion}_minimal";
        if (_cache.TryGetValue(cacheKey, out IEnumerable<DomainStudentMaster>? cachedStudents))
        {
            return cachedStudents!;
        }

        var students = await _context.StudentMasters
            .AsNoTracking()
            .Where(s => !s.IsDeleted)
            .Select(s => new DomainStudentMaster
            {
                Id = s.Id,
                RollNumber = s.RollNumber,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Email = s.Email,
                ContactNumber = s.ContactNumber,
                ClassId = s.ClassId,
                SectionId = s.SectionId,
                IsActive = s.IsActive
            })
            .ToListAsync();

        _cache.Set(cacheKey, students, TimeSpan.FromMinutes(15));
        
        return students;
    }

    // Paginated method for large datasets
    public async Task<PagedResult<DomainStudentMaster>> GetStudentsPagedAsync(int page, int pageSize)
    {
        var result = await GetPagedAsync(page, pageSize);
        return new PagedResult<DomainStudentMaster>
        {
            Data = result.Data,
            TotalCount = result.TotalCount,
            Page = result.Page,
            PageSize = result.PageSize,
            TotalPages = result.TotalPages
        };
    }

    public async Task<PagedResponse<DomainStudentMaster>> GetPagedAsync(int page, int pageSize)
    {
        page = Math.Max(1, page);
        pageSize = pageSize is < 1 or > 100 ? 20 : pageSize;

        var cacheKey = $"students_v{_cacheVersion}_paged_{page}_{pageSize}";
        if (_cache.TryGetValue(cacheKey, out PagedResponse<DomainStudentMaster>? cachedResult))
        {
            return cachedResult!;
        }

        var query = _context.StudentMasters
            .AsNoTracking()
            .Include(s => s.Class)
            .Include(s => s.Section)
            .Where(s => !s.IsDeleted);

        var totalCount = await query.CountAsync();
        var entities = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var students = entities
            .Select(MapToDomainEntity)
            .Where(e => e != null)
            .Select(e => e!)
            .ToList();

        await AssignFatherNamesAsync(students);

        var result = new PagedResponse<DomainStudentMaster>
        {
            Data = students,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        };

        _cache.Set(cacheKey, result, TimeSpan.FromMinutes(5));
        
        return result;
    }

    public async Task<PagedResponse<DomainStudentMaster>> SearchAsync(string query, int page, int pageSize)
    {
        page = Math.Max(1, page);
        pageSize = pageSize is < 1 or > 100 ? 20 : pageSize;
        query = query.Trim();
        var hasRollNumberQuery = Guid.TryParse(query, out var rollNumberQuery);

        var cacheKey = $"students_v{_cacheVersion}_search_{query}_{page}_{pageSize}";
        if (_cache.TryGetValue(cacheKey, out PagedResponse<DomainStudentMaster>? cachedResult))
        {
            return cachedResult!;
        }

        var studentsQuery = _context.StudentMasters
            .AsNoTracking()
            .Include(s => s.Class)
            .Include(s => s.Section)
            .Where(s => !s.IsDeleted)
            .Where(s =>
                (s.FirstName != null && EF.Functions.Like(s.FirstName, $"%{query}%")) ||
                (s.LastName != null && EF.Functions.Like(s.LastName, $"%{query}%")) ||
                (s.Email != null && EF.Functions.Like(s.Email, $"%{query}%")) ||
                (hasRollNumberQuery && s.RollNumber == rollNumberQuery));

        var totalCount = await studentsQuery.CountAsync();
        var entities = await studentsQuery
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var mapped = entities
            .Select(MapToDomainEntity)
            .Where(e => e != null)
            .Select(e => e!)
            .ToList();

        await AssignFatherNamesAsync(mapped);

        var result = new PagedResponse<DomainStudentMaster>
        {
            Data = mapped,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        };

        _cache.Set(cacheKey, result, TimeSpan.FromMinutes(5));
        return result;
    }

    private void ClearStudentCache()
    {
        System.Threading.Interlocked.Increment(ref _cacheVersion);
    }

    private static DomainStudentMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.StudentMaster? entity)
    {
        if (entity == null) return null;
        
        return new DomainStudentMaster
        {
            Id = entity.Id,
            RollNumber = entity.RollNumber,
            FirstName = entity.FirstName,
            LastName = entity.LastName,
            Address = entity.Address,
            CityId = entity.CityId,
            StateId = entity.StateId,
            CountryId = entity.CountryId,
            ZipCode = entity.ZipCode,
            ContactNumber = entity.ContactNumber,
            EmergencyContactNumber = entity.EmergencyContactNumber,
            Dob = entity.Dob,
            Doj = entity.Doj,
            RegistrationNumber = entity.RegistrationNumber,
            ClassId = entity.ClassId,
            SectionId = entity.SectionId,
            AvailTransport = entity.AvailTransport,
            Image = entity.Image,
            Email = entity.Email,
            CategoryId = entity.CategoryId,
            SiblingsIfAny = entity.SiblingsIfAny,
            SiblingClassId = entity.SiblingClassId,
            Gender = entity.Gender,
            DisabilityAny = entity.DisabilityAny,
            MedicalAlleryAny = entity.MedicalAlleryAny,
            BirthCityId = entity.BirthCityId,
            BirthStateId = entity.BirthStateId,
            BirthCountryId = entity.BirthCountryId,
            PreviousSchoolAttended = entity.PreviousSchoolAttended,
            PreviousSchoolClassId = entity.PreviousSchoolClassId,
            PreviousSchoolPercentage = entity.PreviousSchoolPercentage,
            PreviousSchoolRank = entity.PreviousSchoolRank,
            PreviousSchoolBoardId = entity.PreviousSchoolBoardId,
            PreviousSchoolFromDate = entity.PreviousSchoolFromDate,
            PreviousSchoolToDate = entity.PreviousSchoolToDate,
            WithdrawnDate = entity.WithdrawnDate,
            WithdrawnReason = entity.WithdrawnReason,
            BloodGroupId = entity.BloodGroupId,
            Nationality = entity.Nationality,
            Hobbies = entity.Hobbies,
            ReligionId = entity.ReligionId,
            Phone = entity.Phone,
            RouteId = entity.RouteId,
            RouteStopDetailsId = entity.RouteStopDetailsId,
            ClassTeacherId = entity.ClassTeacherId,
            RoutePickAndDrop = entity.RoutePickAndDrop,
            FeesDiscountCategoryMasterId = entity.FeesDiscountCategoryMasterId,
            TutionFees = entity.TutionFees,
            AnnualFees = entity.AnnualFees,
            TransportFees = entity.TransportFees,
            UseTransportFees = entity.UseTransportFees,
            SessionId = entity.SessionId,
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
            HouseAllotted = entity.HouseAllotted,
            AdditionalNotes = entity.AdditionalNotes,
            FathersName = entity.FathersName
        };
    }

    private static SchoolDemo.Infrastructure.Data.StudentMaster MapToInfrastructureEntity(DomainStudentMaster entity)
    {
        return new SchoolDemo.Infrastructure.Data.StudentMaster
        {
            Id = entity.Id,
            RollNumber = entity.RollNumber,
            FirstName = entity.FirstName,
            LastName = entity.LastName,
            Address = entity.Address,
            CityId = entity.CityId,
            StateId = entity.StateId,
            CountryId = entity.CountryId,
            ZipCode = entity.ZipCode,
            ContactNumber = entity.ContactNumber,
            EmergencyContactNumber = entity.EmergencyContactNumber,
            Dob = entity.Dob,
            Doj = entity.Doj,
            RegistrationNumber = entity.RegistrationNumber,
            ClassId = entity.ClassId,
            SectionId = entity.SectionId,
            AvailTransport = entity.AvailTransport,
            Image = entity.Image,
            Email = entity.Email,
            CategoryId = entity.CategoryId,
            SiblingsIfAny = entity.SiblingsIfAny,
            SiblingClassId = entity.SiblingClassId,
            Gender = entity.Gender,
            DisabilityAny = entity.DisabilityAny,
            MedicalAlleryAny = entity.MedicalAlleryAny,
            BirthCityId = entity.BirthCityId,
            BirthStateId = entity.BirthStateId,
            BirthCountryId = entity.BirthCountryId,
            PreviousSchoolAttended = entity.PreviousSchoolAttended,
            PreviousSchoolClassId = entity.PreviousSchoolClassId,
            PreviousSchoolPercentage = entity.PreviousSchoolPercentage,
            PreviousSchoolRank = entity.PreviousSchoolRank,
            PreviousSchoolBoardId = entity.PreviousSchoolBoardId,
            PreviousSchoolFromDate = entity.PreviousSchoolFromDate,
            PreviousSchoolToDate = entity.PreviousSchoolToDate,
            WithdrawnDate = entity.WithdrawnDate,
            WithdrawnReason = entity.WithdrawnReason,
            BloodGroupId = entity.BloodGroupId,
            Nationality = entity.Nationality,
            Hobbies = entity.Hobbies,
            ReligionId = entity.ReligionId,
            Phone = entity.Phone,
            RouteId = entity.RouteId,
            RouteStopDetailsId = entity.RouteStopDetailsId,
            ClassTeacherId = entity.ClassTeacherId,
            RoutePickAndDrop = entity.RoutePickAndDrop,
            FeesDiscountCategoryMasterId = entity.FeesDiscountCategoryMasterId,
            TutionFees = entity.TutionFees,
            AnnualFees = entity.AnnualFees,
            TransportFees = entity.TransportFees,
            UseTransportFees = entity.UseTransportFees,
            SessionId = entity.SessionId,
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
            HouseAllotted = entity.HouseAllotted,
            AdditionalNotes = entity.AdditionalNotes
            ,FathersName = entity.FathersName
        };
    }

    private async Task AssignFatherNamesAsync(List<DomainStudentMaster> students)
    {
        if (students == null || students.Count == 0) return;

        var studentIds = students.Select(s => s.Id).ToList();

        var parents = await _context.ParentMasters
            .AsNoTracking()
            .Where(p => studentIds.Contains(p.StudentGuid) && !p.IsDeleted)
            .Include(p => p.RelationType)
            .ToListAsync();

        var fatherRelationIds = parents.Where(p => p.RelationType != null && p.RelationType.Name == "Father")
            .GroupBy(p => p.StudentGuid)
            .ToDictionary(g => g.Key, g => g.First());

        foreach (var s in students)
        {
            if (fatherRelationIds.TryGetValue(s.Id, out var father))
            {
                var parts = new[] { father.ParentFirstName, father.ParentLastName };
                s.FathersName = string.Join(" ", parts.Where(p => !string.IsNullOrWhiteSpace(p)));
            }
        }
    }
}
