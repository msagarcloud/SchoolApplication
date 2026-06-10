using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using TeacherSubjectDetail = SchoolDemo.Domain.Entities.TeacherSubjectDetail;

namespace SchoolDemo.Application.Services;

public class TeacherSubjectDetailService : ITeacherSubjectDetailService
{
    private readonly ITeacherSubjectDetailRepository _repository;

    public TeacherSubjectDetailService(ITeacherSubjectDetailRepository repository)
    {
        _repository = repository;
    }

    public async Task<TeacherSubjectDetail?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<TeacherSubjectDetail>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<IEnumerable<TeacherSubjectDetail>> GetBySchoolIdAsync(Guid schoolId)
    {
        return await _repository.GetBySchoolIdAsync(schoolId);
    }

    public async Task<TeacherSubjectDetail> CreateAsync(TeacherSubjectDetail entity)
    {
        entity.Id = Guid.NewGuid();
        entity.CreatedDate = DateTime.UtcNow;
        entity.IsActive = true;
        entity.IsDeleted = false;
        
        return await _repository.CreateAsync(entity);
    }

    public async Task<TeacherSubjectDetail?> UpdateAsync(TeacherSubjectDetail entity)
    {
        entity.ModifiedDate = DateTime.UtcNow;
        
        return await _repository.UpdateAsync(entity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }
}
