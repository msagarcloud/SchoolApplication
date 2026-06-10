using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using TeacherMasterDomain = SchoolDemo.Domain.Entities.TeacherMaster;
using TeacherMasterInfra = SchoolDemo.Infrastructure.Data.TeacherMaster;

namespace SchoolDemo.Infrastructure.Repositories;

public class TeacherMasterRepository : ITeacherMasterRepository
{
    private readonly SchoolDbContext _context;

    public TeacherMasterRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<TeacherMasterDomain?> GetByIdAsync(Guid id)
    {
        var entity = await _context.TeacherMasters
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);
        
        if (entity == null)
            return null;

        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<TeacherMasterDomain>> GetAllAsync()
    {
        var entities = await _context.TeacherMasters
            .Where(t => !t.IsDeleted)
            .ToListAsync();
        
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<TeacherMasterDomain> CreateAsync(TeacherMasterDomain entity)
    {
        var infraEntity = MapToInfraEntity(entity);
        infraEntity.Id = Guid.NewGuid();
        infraEntity.CreatedDate = DateTime.UtcNow;
        infraEntity.IsActive = true;
        infraEntity.IsDeleted = false;
        
        await _context.TeacherMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        
        return MapToDomainEntity(infraEntity);
    }

    public async Task<TeacherMasterDomain?> UpdateAsync(TeacherMasterDomain entity)
    {
        var existingEntity = await _context.TeacherMasters
            .FirstOrDefaultAsync(t => t.Id == entity.Id && !t.IsDeleted);
        
        if (existingEntity == null)
            return null;

        existingEntity.FirstName = entity.FirstName;
        existingEntity.LastName = entity.LastName;
        existingEntity.Dob = entity.Dob;
        existingEntity.Doj = entity.Doj;
        existingEntity.DateOfLeaving = entity.DateOfLeaving;
        existingEntity.Address = entity.Address;
        existingEntity.CityId = entity.CityId;
        existingEntity.StateId = entity.StateId;
        existingEntity.CountryId = entity.CountryId;
        existingEntity.ZipCode = entity.ZipCode;
        existingEntity.Gender = entity.Gender;
        existingEntity.MaritalStatusId = entity.MaritalStatusId;
        existingEntity.Image = entity.Image;
        existingEntity.Phone = entity.Phone;
        existingEntity.MobilePhone = entity.MobilePhone;
        existingEntity.YearsOfExperience = entity.YearsOfExperience;
        existingEntity.PreviousSchool = entity.PreviousSchool;
        existingEntity.Salutation = entity.Salutation;
        existingEntity.Email = entity.Email;
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = entity.Status;
        existingEntity.StatusMessage = entity.StatusMessage;

        await _context.SaveChangesAsync();
        return MapToDomainEntity(existingEntity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _context.TeacherMasters
            .FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);
        
        if (entity == null)
            return false;

        entity.IsDeleted = true;
        entity.ModifiedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return true;
    }

    private TeacherMasterDomain MapToDomainEntity(TeacherMasterInfra infraEntity)
    {
        return new TeacherMasterDomain
        {
            Id = infraEntity.Id,
            FirstName = infraEntity.FirstName,
            LastName = infraEntity.LastName,
            Dob = infraEntity.Dob,
            Doj = infraEntity.Doj,
            DateOfLeaving = infraEntity.DateOfLeaving,
            Address = infraEntity.Address,
            CityId = infraEntity.CityId,
            StateId = infraEntity.StateId,
            CountryId = infraEntity.CountryId,
            ZipCode = infraEntity.ZipCode,
            Gender = infraEntity.Gender,
            MaritalStatusId = infraEntity.MaritalStatusId,
            Image = infraEntity.Image,
            Phone = infraEntity.Phone,
            MobilePhone = infraEntity.MobilePhone,
            YearsOfExperience = infraEntity.YearsOfExperience,
            PreviousSchool = infraEntity.PreviousSchool,
            Salutation = infraEntity.Salutation,
            Email = infraEntity.Email,
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

    private TeacherMasterInfra MapToInfraEntity(TeacherMasterDomain domainEntity)
    {
        return new TeacherMasterInfra
        {
            Id = domainEntity.Id,
            FirstName = domainEntity.FirstName,
            LastName = domainEntity.LastName,
            Dob = domainEntity.Dob,
            Doj = domainEntity.Doj,
            DateOfLeaving = domainEntity.DateOfLeaving,
            Address = domainEntity.Address,
            CityId = domainEntity.CityId,
            StateId = domainEntity.StateId,
            CountryId = domainEntity.CountryId,
            ZipCode = domainEntity.ZipCode,
            Gender = domainEntity.Gender,
            MaritalStatusId = domainEntity.MaritalStatusId,
            Image = domainEntity.Image,
            Phone = domainEntity.Phone,
            MobilePhone = domainEntity.MobilePhone,
            YearsOfExperience = domainEntity.YearsOfExperience,
            PreviousSchool = domainEntity.PreviousSchool,
            Salutation = domainEntity.Salutation,
            Email = domainEntity.Email,
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
