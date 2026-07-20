using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class CleanerMasterRepository : ICleanerMasterRepository
{
    private readonly SchoolDbContext _context;

    public CleanerMasterRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<SchoolDemo.Domain.Entities.CleanerMaster?> GetByIdAsync(Guid id)
    {
        return await _context.CleanerMasterDomain.FindAsync(id);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.CleanerMaster>> GetAllAsync()
    {
        return await _context.CleanerMasterDomain.ToListAsync<SchoolDemo.Domain.Entities.CleanerMaster>();
    }

    public async Task<SchoolDemo.Domain.Entities.CleanerMaster> AddAsync(SchoolDemo.Domain.Entities.CleanerMaster cleanerMaster)
    {
        await _context.CleanerMasterDomain.AddAsync(cleanerMaster);
        await _context.SaveChangesAsync();
        return cleanerMaster;
    }

    public async Task<SchoolDemo.Domain.Entities.CleanerMaster> UpdateAsync(SchoolDemo.Domain.Entities.CleanerMaster cleanerMaster)
    {
        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.CleanerMasterDomain.Local.FirstOrDefault(e => e.Id == cleanerMaster.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.CleanerMasterDomain.Update(cleanerMaster);
        await _context.SaveChangesAsync();
        return cleanerMaster;
    }

    public async Task DeleteAsync(Guid id)
    {
        var cleanerMaster = await GetByIdAsync(id);
        if (cleanerMaster != null)
        {
            _context.CleanerMasterDomain.Remove(cleanerMaster);
            await _context.SaveChangesAsync();
        }
    }
}
