using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ITransportHelpRepository
{
    Task<IEnumerable<TransportHelp>> GetAllAsync();
    Task<TransportHelp?> GetByIdAsync(Guid id);
    Task<TransportHelp> AddAsync(TransportHelp entity);
    Task<TransportHelp?> UpdateAsync(TransportHelp entity);
    Task<bool> DeleteAsync(Guid id);
}
