using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class StudentService : IStudentService
{
	private readonly IStudentRepository _repository;

	public StudentService(IStudentRepository repository)
	{
		_repository = repository;
	}

	public async Task<StudentResponse?> GetByIdAsync(Guid id)
	{
		var entity = await _repository.GetByIdAsync(id);
		return entity == null ? null : MapToResponse(entity);
	}

	public async Task<IEnumerable<StudentResponse>> GetAllAsync()
	{
		var entities = await _repository.GetAllAsync();
		return entities.Select(MapToResponse);
	}

	public async Task<IEnumerable<StudentResponse>> GetMinimalAsync()
	{
		var entities = await _repository.GetMinimalAsync();
		return entities.Select(MapToResponse);
	}

	public async Task<PagedResponse<StudentResponse>> GetPagedAsync(int page, int pageSize)
	{
		var result = await _repository.GetPagedAsync(page, pageSize);
		return new PagedResponse<StudentResponse>
		{
			Data = result.Data.Select(MapToResponse),
			TotalCount = result.TotalCount,
			Page = result.Page,
			PageSize = result.PageSize,
			TotalPages = result.TotalPages
		};
	}

	public async Task<PagedResponse<StudentResponse>> SearchAsync(string query, int page, int pageSize)
	{
		var result = await _repository.SearchAsync(query, page, pageSize);
		return new PagedResponse<StudentResponse>
		{
			Data = result.Data.Select(MapToResponse),
			TotalCount = result.TotalCount,
			Page = result.Page,
			PageSize = result.PageSize,
			TotalPages = result.TotalPages
		};
	}

	public async Task<StudentResponse> CreateAsync(StudentRequest request)
	{
		var entity = new SchoolDemo.Domain.Entities.StudentMaster
		{
			Id = Guid.NewGuid(),
			RollNumber = request.RollNumber,
			FirstName = request.FirstName,
			LastName = request.LastName,
			Address = request.Address,
			CityId = request.CityId,
			StateId = request.StateId,
			CountryId = request.CountryId,
			ZipCode = request.ZipCode,
			ContactNumber = request.ContactNumber,
			EmergencyContactNumber = request.EmergencyContactNumber,
			Dob = request.Dob,
			Doj = request.Doj,
			RegistrationNumber = request.RegistrationNumber,
			ClassId = request.ClassId,
			SectionId = request.SectionId,
			AvailTransport = request.AvailTransport,
			Image = request.Image,
			Email = request.Email,
			CategoryId = request.CategoryId,
			SiblingsIfAny = request.SiblingsIfAny,
			SiblingClassId = request.SiblingClassId,
			Gender = request.Gender,
			DisabilityAny = request.DisabilityAny,
			MedicalAlleryAny = request.MedicalAlleryAny,
			BirthCityId = request.BirthCityId,
			BirthStateId = request.BirthStateId,
			BirthCountryId = request.BirthCountryId,
			PreviousSchoolAttended = request.PreviousSchoolAttended,
			PreviousSchoolClassId = request.PreviousSchoolClassId,
			PreviousSchoolPercentage = request.PreviousSchoolPercentage,
			PreviousSchoolRank = request.PreviousSchoolRank,
			PreviousSchoolBoardId = request.PreviousSchoolBoardId,
			PreviousSchoolFromDate = request.PreviousSchoolFromDate,
			PreviousSchoolToDate = request.PreviousSchoolToDate,
			WithdrawnDate = request.WithdrawnDate,
			WithdrawnReason = request.WithdrawnReason,
			BloodGroupId = request.BloodGroupId,
			Nationality = request.Nationality,
			Hobbies = request.Hobbies,
			ReligionId = request.ReligionId,
			Phone = request.Phone,
			RouteId = request.RouteId,
			RouteStopDetailsId = request.RouteStopDetailsId,
			ClassTeacherId = request.ClassTeacherId,
			RoutePickAndDrop = request.RoutePickAndDrop,
			FeesDiscountCategoryMasterId = request.FeesDiscountCategoryMasterId,
			TutionFees = request.TutionFees,
			AnnualFees = request.AnnualFees,
			TransportFees = request.TransportFees,
			UseTransportFees = request.UseTransportFees,
			SessionId = request.SessionId,
			CompanyId = request.CompanyId,
			SchoolId = request.SchoolId,
			HouseAllotted = request.HouseAllotted,
			AdditionalNotes = request.AdditionalNotes,
			IsActive = true,
			IsDeleted = false,
			CreatedBy = Guid.NewGuid(),
			CreatedDate = DateTime.UtcNow,
			Status = "Active",
			StatusMessage = "Student created successfully"
		};

		var createdEntity = await _repository.AddAsync(entity);
		return MapToResponse(createdEntity);
	}

	public async Task<StudentResponse?> UpdateAsync(Guid id, StudentRequest request)
	{
		var existingEntity = await _repository.GetByIdAsync(id);
		if (existingEntity == null || existingEntity.IsDeleted)
		{
			return null;
		}

		existingEntity.RollNumber = request.RollNumber;
		existingEntity.FirstName = request.FirstName ?? existingEntity.FirstName;
		existingEntity.LastName = request.LastName ?? existingEntity.LastName;
		existingEntity.Address = request.Address ?? existingEntity.Address;
		existingEntity.CityId = request.CityId != Guid.Empty ? request.CityId : existingEntity.CityId;
		existingEntity.StateId = request.StateId != Guid.Empty ? request.StateId : existingEntity.StateId;
		existingEntity.CountryId = request.CountryId != Guid.Empty ? request.CountryId : existingEntity.CountryId;
		existingEntity.ZipCode = request.ZipCode ?? existingEntity.ZipCode;
		existingEntity.ContactNumber = request.ContactNumber ?? existingEntity.ContactNumber;
		existingEntity.EmergencyContactNumber = request.EmergencyContactNumber ?? existingEntity.EmergencyContactNumber;
		existingEntity.Dob = request.Dob != default ? request.Dob : existingEntity.Dob;
		existingEntity.Doj = request.Doj != default ? request.Doj : existingEntity.Doj;
		existingEntity.RegistrationNumber = request.RegistrationNumber ?? existingEntity.RegistrationNumber;
		existingEntity.ClassId = request.ClassId != Guid.Empty ? request.ClassId : existingEntity.ClassId;
		existingEntity.SectionId = request.SectionId != Guid.Empty ? request.SectionId : existingEntity.SectionId;
		existingEntity.AvailTransport = request.AvailTransport ?? existingEntity.AvailTransport;
		existingEntity.Image = request.Image ?? existingEntity.Image;
		existingEntity.Email = request.Email ?? existingEntity.Email;
		existingEntity.CategoryId = request.CategoryId != Guid.Empty ? request.CategoryId : existingEntity.CategoryId;
		existingEntity.SiblingsIfAny = request.SiblingsIfAny ?? existingEntity.SiblingsIfAny;
		existingEntity.SiblingClassId = request.SiblingClassId ?? existingEntity.SiblingClassId;
		existingEntity.Gender = request.Gender ?? existingEntity.Gender;
		existingEntity.DisabilityAny = request.DisabilityAny ?? existingEntity.DisabilityAny;
		existingEntity.MedicalAlleryAny = request.MedicalAlleryAny ?? existingEntity.MedicalAlleryAny;
		existingEntity.BirthCityId = request.BirthCityId != Guid.Empty ? request.BirthCityId : existingEntity.BirthCityId;
		existingEntity.BirthStateId = request.BirthStateId != Guid.Empty ? request.BirthStateId : existingEntity.BirthStateId;
		existingEntity.BirthCountryId = request.BirthCountryId != Guid.Empty ? request.BirthCountryId : existingEntity.BirthCountryId;
		existingEntity.PreviousSchoolAttended = request.PreviousSchoolAttended ?? existingEntity.PreviousSchoolAttended;
		existingEntity.PreviousSchoolClassId = request.PreviousSchoolClassId ?? existingEntity.PreviousSchoolClassId;
		existingEntity.PreviousSchoolPercentage = request.PreviousSchoolPercentage ?? existingEntity.PreviousSchoolPercentage;
		existingEntity.PreviousSchoolRank = request.PreviousSchoolRank ?? existingEntity.PreviousSchoolRank;
		existingEntity.PreviousSchoolBoardId = request.PreviousSchoolBoardId != Guid.Empty ? request.PreviousSchoolBoardId : existingEntity.PreviousSchoolBoardId;
		existingEntity.PreviousSchoolFromDate = request.PreviousSchoolFromDate ?? existingEntity.PreviousSchoolFromDate;
		existingEntity.PreviousSchoolToDate = request.PreviousSchoolToDate ?? existingEntity.PreviousSchoolToDate;
		existingEntity.WithdrawnDate = request.WithdrawnDate ?? existingEntity.WithdrawnDate;
		existingEntity.WithdrawnReason = request.WithdrawnReason ?? existingEntity.WithdrawnReason;
		existingEntity.BloodGroupId = request.BloodGroupId != Guid.Empty ? request.BloodGroupId : existingEntity.BloodGroupId;
		existingEntity.Nationality = request.Nationality != Guid.Empty ? request.Nationality : existingEntity.Nationality;
		existingEntity.Hobbies = request.Hobbies ?? existingEntity.Hobbies;
		existingEntity.ReligionId = request.ReligionId != Guid.Empty ? request.ReligionId : existingEntity.ReligionId;
		existingEntity.Phone = request.Phone ?? existingEntity.Phone;
		existingEntity.RouteId = request.RouteId ?? existingEntity.RouteId;
		existingEntity.RouteStopDetailsId = request.RouteStopDetailsId ?? existingEntity.RouteStopDetailsId;
		existingEntity.ClassTeacherId = request.ClassTeacherId ?? existingEntity.ClassTeacherId;
		existingEntity.RoutePickAndDrop = request.RoutePickAndDrop ?? existingEntity.RoutePickAndDrop;
		existingEntity.FeesDiscountCategoryMasterId = request.FeesDiscountCategoryMasterId ?? existingEntity.FeesDiscountCategoryMasterId;
		existingEntity.TutionFees = request.TutionFees ?? existingEntity.TutionFees;
		existingEntity.AnnualFees = request.AnnualFees ?? existingEntity.AnnualFees;
		existingEntity.TransportFees = request.TransportFees ?? existingEntity.TransportFees;
		existingEntity.UseTransportFees = request.UseTransportFees ?? existingEntity.UseTransportFees;
		existingEntity.SessionId = request.SessionId ?? existingEntity.SessionId;
		existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
		existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
		existingEntity.HouseAllotted = request.HouseAllotted ?? existingEntity.HouseAllotted;
		existingEntity.AdditionalNotes = request.AdditionalNotes ?? existingEntity.AdditionalNotes;
		existingEntity.ModifiedBy = Guid.NewGuid();
		existingEntity.ModifiedDate = DateTime.UtcNow;
		existingEntity.Status = "Updated";
		existingEntity.StatusMessage = "Student updated successfully";

		var updatedEntity = await _repository.UpdateAsync(existingEntity);
		return MapToResponse(updatedEntity);
	}

	public async Task<bool> DeleteAsync(Guid id)
	{
		var entity = await _repository.GetByIdAsync(id);
		if (entity == null || entity.IsDeleted)
		{
			return false;
		}

		await _repository.DeleteAsync(id);
		return true;
	}

	private static StudentResponse MapToResponse(SchoolDemo.Domain.Entities.StudentMaster entity)
	{
		return new StudentResponse
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
			CreatedDate = entity.CreatedDate,
			ModifiedDate = entity.ModifiedDate,
			Status = entity.Status,
			StatusMessage = entity.StatusMessage,
			HouseAllotted = entity.HouseAllotted,
			AdditionalNotes = entity.AdditionalNotes
		};
	}
}
