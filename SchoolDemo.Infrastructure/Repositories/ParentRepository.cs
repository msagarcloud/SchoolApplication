using Microsoft.EntityFrameworkCore;
using DomainEntity = SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using System;

namespace SchoolDemo.Infrastructure.Repositories;

public class ParentRepository : IParentRepository
{
    private readonly SchoolDbContext _context;

    public ParentRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<DomainEntity.ParentMaster?> GetByIdAsync(Guid id)
    {
        var entity = await _context.ParentMasters
            .Include(p => p.City)
            .Include(p => p.State)
            .Include(p => p.Country)
            .Include(p => p.OfficeCity)
            .Include(p => p.OfficeState)
            .Include(p => p.OfficeCountry)
            .Include(p => p.Qualification)
            .Include(p => p.Designation)
            .Include(p => p.RelationType)
            .Include(p => p.School)
            .Include(p => p.Company)
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<DomainEntity.ParentMaster>> GetAllAsync()
    {
        var entities = await _context.ParentMasters
            .Include(p => p.City)
            .Include(p => p.State)
            .Include(p => p.Country)
            .Include(p => p.OfficeCity)
            .Include(p => p.OfficeState)
            .Include(p => p.OfficeCountry)
            .Include(p => p.Qualification)
            .Include(p => p.Designation)
            .Include(p => p.RelationType)
            .Include(p => p.School)
            .Include(p => p.Company)
            .Where(p => !p.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<DomainEntity.ParentMaster> AddAsync(DomainEntity.ParentMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);
        infraEntity.CreatedDate = DateTime.UtcNow;
        infraEntity.IsActive = true;
        infraEntity.IsDeleted = false;
        await _context.ParentMasters.AddAsync(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

    public async Task<DomainEntity.ParentMaster> UpdateAsync(DomainEntity.ParentMaster entity)
    {
        var existingEntity = await _context.ParentMasters
            .FirstOrDefaultAsync(p => p.Id == entity.Id && !p.IsDeleted);
        
        if (existingEntity == null)
        {
            throw new Exception($"Parent with ID {entity.Id} not found.");
        }

        // Update properties
        existingEntity.StudentGuid = entity.StudentGuid;
        existingEntity.ParentFirstName = entity.ParentFirstName;
        existingEntity.ParentLastName = entity.ParentLastName;
        existingEntity.ParentDob = entity.ParentDob;
        existingEntity.QualificationId = entity.QualificationId;
        existingEntity.Occupation = entity.Occupation;
        existingEntity.AnnualIncome = entity.AnnualIncome;
        existingEntity.DesignationId = entity.DesignationId;
        existingEntity.Phone = entity.Phone;
        existingEntity.Mobile = entity.Mobile;
        existingEntity.Email = entity.Email;
        existingEntity.Address1 = entity.Address1;
        existingEntity.Address2 = entity.Address2;
        existingEntity.CityId = entity.CityId;
        existingEntity.StateId = entity.StateId;
        existingEntity.CountryId = entity.CountryId;
        existingEntity.ZipCode = entity.ZipCode;
        existingEntity.OfficeAddress1 = entity.OfficeAddress1;
        existingEntity.OfficeAddress2 = entity.OfficeAddress2;
        existingEntity.OfficeCityId = entity.OfficeCityId;
        existingEntity.OfficeStateId = entity.OfficeStateId;
        existingEntity.OfficeCountryId = entity.OfficeCountryId;
        existingEntity.OfficeZipCode = entity.OfficeZipCode;
        existingEntity.OfficePhone = entity.OfficePhone;
        existingEntity.Image = entity.Image;
        existingEntity.RelationTypeId = entity.RelationTypeId;
        existingEntity.SchoolId = entity.SchoolId;
        existingEntity.CompanyId = entity.CompanyId;
        existingEntity.IsActive = entity.IsActive;
        existingEntity.ModifiedBy = entity.ModifiedBy;
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = entity.Status;
        existingEntity.StatusMessage = entity.StatusMessage;

        await _context.SaveChangesAsync();
        return MapToDomainEntity(existingEntity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.ParentMasters
            .FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        
        if (entity == null)
        {
            throw new Exception($"Parent with ID {id} not found.");
        }

        entity.IsDeleted = true;
        entity.ModifiedDate = DateTime.UtcNow;
        entity.Status = "Deleted";
        entity.StatusMessage = "Parent deleted successfully";

        await _context.SaveChangesAsync();
    }

    private static DomainEntity.ParentMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.ParentMaster? infraEntity)
    {
        if (infraEntity == null) return null;

        return new DomainEntity.ParentMaster
        {
            Id = infraEntity.Id,
            StudentGuid = infraEntity.StudentGuid,
            ParentFirstName = infraEntity.ParentFirstName,
            ParentLastName = infraEntity.ParentLastName,
            ParentDob = infraEntity.ParentDob,
            QualificationId = infraEntity.QualificationId,
            Occupation = infraEntity.Occupation,
            AnnualIncome = infraEntity.AnnualIncome,
            DesignationId = infraEntity.DesignationId,
            Phone = infraEntity.Phone,
            Mobile = infraEntity.Mobile,
            Email = infraEntity.Email,
            Address1 = infraEntity.Address1,
            Address2 = infraEntity.Address2,
            CityId = infraEntity.CityId,
            StateId = infraEntity.StateId,
            CountryId = infraEntity.CountryId,
            ZipCode = infraEntity.ZipCode,
            OfficeAddress1 = infraEntity.OfficeAddress1,
            OfficeAddress2 = infraEntity.OfficeAddress2,
            OfficeCityId = infraEntity.OfficeCityId,
            OfficeStateId = infraEntity.OfficeStateId,
            OfficeCountryId = infraEntity.OfficeCountryId,
            OfficeZipCode = infraEntity.OfficeZipCode,
            OfficePhone = infraEntity.OfficePhone,
            Image = infraEntity.Image,
            RelationTypeId = infraEntity.RelationTypeId,
            SchoolId = infraEntity.SchoolId,
            CompanyId = infraEntity.CompanyId,
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

    private static SchoolDemo.Infrastructure.Data.ParentMaster MapToInfrastructureEntity(DomainEntity.ParentMaster domainEntity)
    {
        return new SchoolDemo.Infrastructure.Data.ParentMaster
        {
            Id = domainEntity.Id,
            StudentGuid = domainEntity.StudentGuid,
            ParentFirstName = domainEntity.ParentFirstName,
            ParentLastName = domainEntity.ParentLastName,
            ParentDob = domainEntity.ParentDob,
            QualificationId = domainEntity.QualificationId,
            Occupation = domainEntity.Occupation,
            AnnualIncome = domainEntity.AnnualIncome,
            DesignationId = domainEntity.DesignationId,
            Phone = domainEntity.Phone,
            Mobile = domainEntity.Mobile,
            Email = domainEntity.Email,
            Address1 = domainEntity.Address1,
            Address2 = domainEntity.Address2,
            CityId = domainEntity.CityId,
            StateId = domainEntity.StateId,
            CountryId = domainEntity.CountryId,
            ZipCode = domainEntity.ZipCode,
            OfficeAddress1 = domainEntity.OfficeAddress1,
            OfficeAddress2 = domainEntity.OfficeAddress2,
            OfficeCityId = domainEntity.OfficeCityId,
            OfficeStateId = domainEntity.OfficeStateId,
            OfficeCountryId = domainEntity.OfficeCountryId,
            OfficeZipCode = domainEntity.OfficeZipCode,
            OfficePhone = domainEntity.OfficePhone,
            Image = domainEntity.Image,
            RelationTypeId = domainEntity.RelationTypeId,
            SchoolId = domainEntity.SchoolId,
            CompanyId = domainEntity.CompanyId,
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
