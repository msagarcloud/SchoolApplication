using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class StudentRepository : IStudentRepository
{
    private readonly SchoolDbContext _context;

    public StudentRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.StudentMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.StudentMasters
            .Include(s => s.Class)
            .Include(s => s.Section)
            .Include(s => s.Category)
            .Include(s => s.School)
            .Include(s => s.Company)
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.StudentMaster>> GetAllAsync()
    {
        var entities = await _context.StudentMasters
            .Include(s => s.Class)
            .Include(s => s.Section)
            .Include(s => s.Category)
            .Include(s => s.School)
            .Include(s => s.Company)
            .Where(s => !s.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.StudentMaster>> GetMinimalAsync()
    {
        var entities = await _context.StudentMasters
            .AsNoTracking()
            .Where(s => !s.IsDeleted)
            .Select(s => new SchoolDemo.Infrastructure.Data.StudentMaster
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

        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<PagedResponse<SchoolDemo.Domain.Entities.StudentMaster>> GetPagedAsync(int page, int pageSize)
    {
        page = Math.Max(1, page);
        pageSize = pageSize is < 1 or > 100 ? 20 : pageSize;

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

        return new PagedResponse<SchoolDemo.Domain.Entities.StudentMaster>
        {
            Data = entities.Select(MapToDomainEntity).Where(e => e != null).Select(e => e!),
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        };
    }

    public async Task<PagedResponse<SchoolDemo.Domain.Entities.StudentMaster>> SearchAsync(string query, int page, int pageSize)
    {
        page = Math.Max(1, page);
        pageSize = pageSize is < 1 or > 100 ? 20 : pageSize;
        query = query.Trim();
        var hasRollNumberQuery = Guid.TryParse(query, out var rollNumberQuery);

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

        return new PagedResponse<SchoolDemo.Domain.Entities.StudentMaster>
        {
            Data = entities.Select(MapToDomainEntity).Where(e => e != null).Select(e => e!),
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling((double)totalCount / pageSize)
        };
    }

    public async Task<SchoolDemo.Domain.Entities.StudentMaster> AddAsync(SchoolDemo.Domain.Entities.StudentMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        await _context.StudentMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<SchoolDemo.Domain.Entities.StudentMaster> UpdateAsync(SchoolDemo.Domain.Entities.StudentMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        _context.StudentMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
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
        }
    }

    private static SchoolDemo.Domain.Entities.StudentMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.StudentMaster? entity)
    {
        if (entity == null) return null;
        return new SchoolDemo.Domain.Entities.StudentMaster
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
        };
    }

    private static SchoolDemo.Infrastructure.Data.StudentMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.StudentMaster entity)
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
        };
    }
}
