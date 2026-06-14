using SchoolDemo.Domain.DTOs;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using System;

namespace SchoolDemo.Application.Services;

public class ParentService : IParentService
{
	private readonly IParentRepository _repository;

	public ParentService(IParentRepository repository)
	{
		_repository = repository;
	}

	public async Task<ParentResponse?> GetByIdAsync(Guid id)
	{
		var entity = await _repository.GetByIdAsync(id);
		return entity == null ? null : MapToResponse(entity);
	}

	public async Task<IEnumerable<ParentResponse>> GetAllAsync()
	{
		var entities = await _repository.GetAllAsync();
		return entities.Select(MapToResponse);
	}

	public async Task<IEnumerable<ParentResponse>> GetByStudentIdAsync(Guid studentId)
	{
		var entities = await _repository.GetByStudentIdAsync(studentId);
		return entities.Select(MapToResponse);
	}

	public async Task<ParentResponse> CreateAsync(ParentRequest request)
	{
		var entity = new ParentMaster
		{
			Id = Guid.NewGuid(),
			StudentGuid = request.StudentGuid,
			ParentFirstName = request.ParentFirstName,
			ParentLastName = request.ParentLastName,
			ParentDob = request.ParentDob,
			QualificationId = request.QualificationId,
			Occupation = request.Occupation,
			AnnualIncome = request.AnnualIncome,
			DesignationId = request.DesignationId,
			Phone = request.Phone,
			Mobile = request.Mobile,
			Email = request.Email,
			Address1 = request.Address1,
			Address2 = request.Address2,
			CityId = request.CityId,
			StateId = request.StateId,
			CountryId = request.CountryId,
			ZipCode = request.ZipCode,
			OfficeAddress1 = request.OfficeAddress1,
			OfficeAddress2 = request.OfficeAddress2,
			OfficeCityId = request.OfficeCityId,
			OfficeStateId = request.OfficeStateId,
			OfficeCountryId = request.OfficeCountryId,
			OfficeZipCode = request.OfficeZipCode,
			OfficePhone = request.OfficePhone,
			Image = request.Image,
			RelationTypeId = request.RelationTypeId,
			SchoolId = request.SchoolId,
			CompanyId = request.CompanyId,
			IsActive = request.IsActive,
			IsDeleted = false,
			CreatedBy = request.CreatedBy,
			CreatedDate = DateTime.UtcNow,
			ModifiedBy = null,
			ModifiedDate = null,
			Status = "Created",
			StatusMessage = "Parent created successfully"
		};

		var createdEntity = await _repository.AddAsync(entity);
		return MapToResponse(createdEntity);
	}

	public async Task<ParentResponse> UpdateAsync(Guid id, ParentRequest request)
	{
		var existingEntity = await _repository.GetByIdAsync(id);
		if (existingEntity == null || existingEntity.IsDeleted)
		{
			throw new Exception($"Parent with ID {id} not found.");
		}

		// Update properties
		existingEntity.StudentGuid = request.StudentGuid;
		existingEntity.ParentFirstName = request.ParentFirstName;
		existingEntity.ParentLastName = request.ParentLastName;
		existingEntity.ParentDob = request.ParentDob;
		existingEntity.QualificationId = request.QualificationId;
		existingEntity.Occupation = request.Occupation;
		existingEntity.AnnualIncome = request.AnnualIncome;
		existingEntity.DesignationId = request.DesignationId;
		existingEntity.Phone = request.Phone;
		existingEntity.Mobile = request.Mobile;
		existingEntity.Email = request.Email;
		existingEntity.Address1 = request.Address1;
		existingEntity.Address2 = request.Address2;
		existingEntity.CityId = request.CityId;
		existingEntity.StateId = request.StateId;
		existingEntity.CountryId = request.CountryId;
		existingEntity.ZipCode = request.ZipCode;
		existingEntity.OfficeAddress1 = request.OfficeAddress1;
		existingEntity.OfficeAddress2 = request.OfficeAddress2;
		existingEntity.OfficeCityId = request.OfficeCityId;
		existingEntity.OfficeStateId = request.OfficeStateId;
		existingEntity.OfficeCountryId = request.OfficeCountryId;
		existingEntity.OfficeZipCode = request.OfficeZipCode;
		existingEntity.OfficePhone = request.OfficePhone;
		existingEntity.Image = request.Image;
		existingEntity.RelationTypeId = request.RelationTypeId;
		existingEntity.SchoolId = request.SchoolId;
		existingEntity.CompanyId = request.CompanyId;
		existingEntity.IsActive = request.IsActive;
		existingEntity.ModifiedBy = request.ModifiedBy;
		existingEntity.ModifiedDate = DateTime.UtcNow;
		existingEntity.Status = "Updated";
		existingEntity.StatusMessage = "Parent updated successfully";

		var updatedEntity = await _repository.UpdateAsync(existingEntity);
		return MapToResponse(updatedEntity);
	}

	public async Task<bool> DeleteAsync(Guid id)
	{
		try
		{
			await _repository.DeleteAsync(id);
			return true;
		}
		catch (Exception)
		{
			return false;
		}
	}

	private static ParentResponse MapToResponse(ParentMaster entity)
	{
		return new ParentResponse
		{
			Id = entity.Id,
			StudentGuid = entity.StudentGuid,
			ParentFirstName = entity.ParentFirstName,
			ParentLastName = entity.ParentLastName,
			ParentDob = entity.ParentDob,
			QualificationId = entity.QualificationId,
			Occupation = entity.Occupation,
			AnnualIncome = entity.AnnualIncome,
			DesignationId = entity.DesignationId,
			Phone = entity.Phone,
			Mobile = entity.Mobile,
			Email = entity.Email,
			Address1 = entity.Address1,
			Address2 = entity.Address2,
			CityId = entity.CityId,
			StateId = entity.StateId,
			CountryId = entity.CountryId,
			ZipCode = entity.ZipCode,
			OfficeAddress1 = entity.OfficeAddress1,
			OfficeAddress2 = entity.OfficeAddress2,
			OfficeCityId = entity.OfficeCityId,
			OfficeStateId = entity.OfficeStateId,
			OfficeCountryId = entity.OfficeCountryId,
			OfficeZipCode = entity.OfficeZipCode,
			OfficePhone = entity.OfficePhone,
			Image = entity.Image,
			RelationTypeId = entity.RelationTypeId,
			RelationTypeName = entity.RelationType?.Name,
			SchoolId = entity.SchoolId,
			CompanyId = entity.CompanyId,
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
