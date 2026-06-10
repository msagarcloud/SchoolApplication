namespace SchoolDemo.Domain.Interfaces;

public interface IGradeRepository
{
    Task<SchoolDemo.Domain.Entities.GradeMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.GradeMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.GradeMaster> AddAsync(SchoolDemo.Domain.Entities.GradeMaster entity);
    Task<SchoolDemo.Domain.Entities.GradeMaster> UpdateAsync(SchoolDemo.Domain.Entities.GradeMaster entity);
    Task DeleteAsync(Guid id);
}
