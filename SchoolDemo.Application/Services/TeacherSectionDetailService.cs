using Microsoft.AspNetCore.Http;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using System.Security.Claims;

namespace SchoolDemo.Application.Services;

public class TeacherSectionDetailService : ITeacherSectionDetailService
{
    private readonly ITeacherSectionDetailRepository _repository;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public TeacherSectionDetailService(ITeacherSectionDetailRepository repository, IHttpContextAccessor httpContextAccessor)
    {
        _repository = repository;
        _httpContextAccessor = httpContextAccessor;
    }

    private Guid GetCurrentUserId()
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Guid.TryParse(userId, out var guid) ? guid : Guid.Empty;
    }

    public async Task<TeacherSectionDetailResponse?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<TeacherSectionDetailResponse>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<TeacherSectionDetailResponse> CreateAsync(TeacherSectionDetailRequest request)
    {
        // Validate the request
        if (request.TeacherId == Guid.Empty)
            throw new ArgumentException("Teacher ID is required");
        if (request.ClassId == Guid.Empty)
            throw new ArgumentException("Class ID is required");
        if (request.SectionId == Guid.Empty)
            throw new ArgumentException("Section ID is required");
        if (request.SubjectId == Guid.Empty)
            throw new ArgumentException("Subject ID is required");
        if (request.SchoolId == Guid.Empty)
            throw new ArgumentException("School ID is required");
        if (request.CompanyId == Guid.Empty)
            throw new ArgumentException("Company ID is required");

        // Use createdBy from request, fallback to empty GUID if not provided
        var createdBy = request.CreatedBy ?? Guid.Empty;
        if (createdBy == Guid.Empty)
        {
            Console.WriteLine("Warning: CreatedBy not provided in request, using empty GUID");
        }

        Console.WriteLine($"Creating TeacherSectionDetail with:");
        Console.WriteLine($"  TeacherId: {request.TeacherId}");
        Console.WriteLine($"  ClassId: {request.ClassId}");
        Console.WriteLine($"  SectionId: {request.SectionId}");
        Console.WriteLine($"  SubjectId: {request.SubjectId}");
        Console.WriteLine($"  SchoolId: {request.SchoolId}");
        Console.WriteLine($"  CompanyId: {request.CompanyId}");
        Console.WriteLine($"  CreatedBy: {createdBy}");

        var entity = new TeacherSectionDetail
        {
            Id = Guid.NewGuid(),
            TeacherId = request.TeacherId,
            ClassId = request.ClassId,
            SectionId = request.SectionId,
            SubjectId = request.SubjectId,
            IsClassTeacher = request.IsClassTeacher,
            SchoolId = request.SchoolId,
            CompanyId = request.CompanyId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = createdBy,
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Teacher section detail created successfully"
        };

        try
        {
            var createdEntity = await _repository.AddAsync(entity);
            return MapToResponse(createdEntity);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating TeacherSectionDetail: {ex.Message}");
            Console.WriteLine($"Inner exception: {ex.InnerException?.Message}");
            throw;
        }
    }

    public async Task<TeacherSectionDetailResponse?> UpdateAsync(Guid id, TeacherSectionDetailRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null || existingEntity.IsDeleted)
        {
            return null;
        }

        // Use modifiedBy from request, fallback to existing CreatedBy if not provided
        var modifiedBy = request.ModifiedBy ?? existingEntity.CreatedBy;
        if (modifiedBy == Guid.Empty)
        {
            Console.WriteLine("Warning: ModifiedBy not provided in request, using empty GUID");
        }

        existingEntity.TeacherId = request.TeacherId != Guid.Empty ? request.TeacherId : existingEntity.TeacherId;
        existingEntity.ClassId = request.ClassId != Guid.Empty ? request.ClassId : existingEntity.ClassId;
        existingEntity.SectionId = request.SectionId != Guid.Empty ? request.SectionId : existingEntity.SectionId;
        existingEntity.SubjectId = request.SubjectId != Guid.Empty ? request.SubjectId : existingEntity.SubjectId;
        existingEntity.IsClassTeacher = request.IsClassTeacher;
        existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
        existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
        existingEntity.ModifiedBy = modifiedBy;
        existingEntity.ModifiedDate = DateTime.UtcNow;
        existingEntity.Status = "Updated";
        existingEntity.StatusMessage = "Teacher section detail updated successfully";

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

    private static TeacherSectionDetailResponse MapToResponse(TeacherSectionDetail entity)
    {
        return new TeacherSectionDetailResponse
        {
            Id = entity.Id,
            TeacherId = entity.TeacherId,
            ClassId = entity.ClassId,
            SectionId = entity.SectionId,
            SubjectId = entity.SubjectId,
            IsClassTeacher = entity.IsClassTeacher,
            SchoolId = entity.SchoolId,
            CompanyId = entity.CompanyId,
            IsActive = entity.IsActive,
            CreatedDate = entity.CreatedDate,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage,
            TeacherName = entity.TeacherName,
            ClassName = entity.ClassName,
            SectionName = entity.SectionName,
            SubjectName = entity.SubjectName
        };
    }
}
