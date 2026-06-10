using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class TransportSettingRepository : ITransportSettingRepository
{
    private readonly SchoolDbContext _context;

    public TransportSettingRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<TransportSetting?> GetByIdAsync(Guid id)
    {
        return await _context.TransportSettingDomain.FindAsync(id);
    }

    public async Task<IEnumerable<TransportSetting>> GetAllAsync()
    {
        return await _context.TransportSettingDomain.ToListAsync();
    }

    public async Task<TransportSetting> AddAsync(TransportSetting transportSetting)
    {
        await _context.TransportSettingDomain.AddAsync(transportSetting);
        await _context.SaveChangesAsync();
        return transportSetting;
    }

    public async Task<TransportSetting?> UpdateAsync(TransportSetting transportSetting)
    {
        _context.TransportSettingDomain.Update(transportSetting);
        await _context.SaveChangesAsync();
        return transportSetting;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var transportSetting = await GetByIdAsync(id);
        if (transportSetting != null)
        {
            _context.TransportSettingDomain.Remove(transportSetting);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }
}
