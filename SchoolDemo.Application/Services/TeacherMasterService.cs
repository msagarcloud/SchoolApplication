using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using TeacherMaster = SchoolDemo.Domain.Entities.TeacherMaster;

namespace SchoolDemo.Application.Services;

public class TeacherMasterService : ITeacherMasterService
{
    private readonly ITeacherMasterRepository _repository;

    public TeacherMasterService(ITeacherMasterRepository repository)
    {
        _repository = repository;
    }

    public async Task<TeacherMaster?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<TeacherMaster>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<TeacherMaster> CreateAsync(TeacherMaster entity)
    {
        return await _repository.CreateAsync(entity);
    }

    public async Task<TeacherMaster?> UpdateAsync(TeacherMaster entity)
    {
        return await _repository.UpdateAsync(entity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }
}
