using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface IItemLocationRepository
{
    Task<ItemLocation?> GetByIdAsync(Guid id);
    Task<IEnumerable<ItemLocation>> GetAllAsync();
    Task<ItemLocation> AddAsync(ItemLocation entity);
    Task<ItemLocation> UpdateAsync(ItemLocation entity);
    Task DeleteAsync(Guid id);
}
