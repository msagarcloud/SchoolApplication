using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class StudentAttendanceService : IStudentAttendanceService
{
	private readonly IStudentAttendanceRepository _repository;

	public StudentAttendanceService(IStudentAttendanceRepository repository)
	{
		_repository = repository;
	}

	public async Task<StudentAttendanceResponse?> GetByIdAsync(Guid id)
	{
		var entity = await _repository.GetByIdAsync(id);
		return entity == null ? null : MapToResponse(entity);
	}

	public async Task<IEnumerable<StudentAttendanceResponse>> GetAllAsync()
	{
		var list = await _repository.GetAllAsync();
		return list.Select(MapToResponse);
	}

	public async Task<StudentAttendanceResponse> CreateAsync(StudentAttendanceRequest request)
	{
		var entity = new StudentAttendanceDetail
		{
			Id = Guid.NewGuid(),
			StudentGuid = request.StudentGuid,
			ClassId = request.ClassId,
			SectionId = request.SectionId,
			Month = request.Month,
			Year = request.Year,
			AttendenceDate = request.AttendenceDate,
			AttendenceStatus = request.AttendenceStatus,
			AttendanceReasonId = request.AttendanceReasonId,
			AttendenceTime = request.AttendenceTime,
			CompanyId = request.CompanyId,
			SchoolId = request.SchoolId,
			IsActive = true,
			IsDeleted = false,
			CreatedBy = request.CreatedBy == Guid.Empty ? Guid.NewGuid() : request.CreatedBy,
			CreatedDate = DateTime.UtcNow,
			Status = request.Status ?? "Active",
			StatusMessage = request.StatusMessage
		};

		var created = await _repository.AddAsync(entity);
		return MapToResponse(created);
	}

	public async Task<StudentAttendanceResponse?> UpdateAsync(Guid id, StudentAttendanceRequest request)
	{
		var existing = await _repository.GetByIdAsync(id);
		if (existing == null || existing.IsDeleted) return null;

		existing.StudentGuid = request.StudentGuid != Guid.Empty ? request.StudentGuid : existing.StudentGuid;
		existing.ClassId = request.ClassId != Guid.Empty ? request.ClassId : existing.ClassId;
		existing.SectionId = request.SectionId != Guid.Empty ? request.SectionId : existing.SectionId;
		existing.Month = request.Month ?? existing.Month;
		existing.Year = request.Year ?? existing.Year;
		existing.AttendenceDate = request.AttendenceDate != default ? request.AttendenceDate : existing.AttendenceDate;
		existing.AttendenceStatus = request.AttendenceStatus;
		existing.AttendanceReasonId = request.AttendanceReasonId != Guid.Empty ? request.AttendanceReasonId : existing.AttendanceReasonId;
		existing.AttendenceTime = request.AttendenceTime ?? existing.AttendenceTime;
		existing.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existing.CompanyId;
		existing.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existing.SchoolId;
		existing.ModifiedBy = request.ModifiedBy ?? existing.ModifiedBy;
		existing.ModifiedDate = DateTime.UtcNow;
		existing.Status = request.Status ?? existing.Status;
		existing.StatusMessage = request.StatusMessage ?? existing.StatusMessage;

		var updated = await _repository.UpdateAsync(existing);
		return MapToResponse(updated);
	}

	public async Task<bool> DeleteAsync(Guid id)
	{
		var existing = await _repository.GetByIdAsync(id);
		if (existing == null || existing.IsDeleted) return false;
		await _repository.DeleteAsync(id);
		return true;
	}

	private static StudentAttendanceResponse MapToResponse(StudentAttendanceDetail entity)
	{
		return new StudentAttendanceResponse
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
			CreatedDate = entity.CreatedDate,
			ModifiedDate = entity.ModifiedDate,
			Status = entity.Status,
			StatusMessage = entity.StatusMessage
		};
	}
}
