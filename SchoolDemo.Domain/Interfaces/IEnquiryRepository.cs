namespace SchoolDemo.Domain.Interfaces;

public interface IEnquiryRepository
{
    Task<SchoolDemo.Domain.Entities.EnquiryMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.EnquiryMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.EnquiryMaster> AddAsync(SchoolDemo.Domain.Entities.EnquiryMaster entity);
    Task<SchoolDemo.Domain.Entities.EnquiryMaster> UpdateAsync(SchoolDemo.Domain.Entities.EnquiryMaster entity);
    Task DeleteAsync(Guid id);
}
