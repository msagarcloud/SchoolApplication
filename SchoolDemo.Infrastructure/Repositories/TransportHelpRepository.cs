using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class TransportHelpRepository : ITransportHelpRepository
{
    private readonly SchoolDbContext _context;

    public TransportHelpRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<TransportHelp?> GetByIdAsync(Guid id)
    {
        return await _context.TransportHelpDomain.FindAsync(id);
    }

    public async Task<IEnumerable<TransportHelp>> GetAllAsync()
    {
        return await _context.TransportHelpDomain.ToListAsync();
    }

    public async Task<TransportHelp> AddAsync(TransportHelp transportHelp)
    {
        await _context.TransportHelpDomain.AddAsync(transportHelp);
        await _context.SaveChangesAsync();
        return transportHelp;
    }

    public async Task<TransportHelp?> UpdateAsync(TransportHelp transportHelp)
    {
        _context.TransportHelpDomain.Update(transportHelp);
        await _context.SaveChangesAsync();
        return transportHelp;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var transportHelp = await GetByIdAsync(id);
        if (transportHelp != null)
        {
            _context.TransportHelpDomain.Remove(transportHelp);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }
}
