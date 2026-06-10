using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByUserNameAsync(string userName);
    Task<User?> GetByIdAsync(Guid id);
    Task<User?> GetByUserNameWithRelatedDataAsync(string userName);
    Task<IEnumerable<User>> GetAllAsync();
    Task<User> AddAsync(User user);
    Task<User> UpdateAsync(User user);
    Task DeleteAsync(Guid id);
}
