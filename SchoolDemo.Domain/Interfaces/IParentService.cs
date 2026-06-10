using SchoolDemo.Domain.DTOs;

namespace SchoolDemo.Domain.Interfaces;

public interface IParentService
{
    Task<ParentResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<ParentResponse>> GetAllAsync();
    Task<ParentResponse> CreateAsync(ParentRequest request);
    Task<ParentResponse> UpdateAsync(Guid id, ParentRequest request);
    Task<bool> DeleteAsync(Guid id);
}
