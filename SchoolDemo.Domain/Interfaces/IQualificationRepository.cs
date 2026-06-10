namespace SchoolDemo.Domain.Interfaces;

public interface IQualificationRepository
{
    Task<SchoolDemo.Domain.Entities.QualificationMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.QualificationMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.QualificationMaster> AddAsync(SchoolDemo.Domain.Entities.QualificationMaster entity);
    Task<SchoolDemo.Domain.Entities.QualificationMaster> UpdateAsync(SchoolDemo.Domain.Entities.QualificationMaster entity);
    Task DeleteAsync(Guid id);
}
