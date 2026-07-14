namespace SchoolDemo.Domain.Interfaces;

public interface IEnquiryTypeRepository
{
    Task<SchoolDemo.Domain.Entities.EnquiryType?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.EnquiryType>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.EnquiryType> AddAsync(SchoolDemo.Domain.Entities.EnquiryType entity);
    Task<SchoolDemo.Domain.Entities.EnquiryType> UpdateAsync(SchoolDemo.Domain.Entities.EnquiryType entity);
    Task DeleteAsync(Guid id);
}
