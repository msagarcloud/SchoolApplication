using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class TransportAssignmentRepository : ITransportAssignmentRepository
{
    private readonly SchoolDbContext _context;

    public TransportAssignmentRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<TransportAssignment?> GetByIdAsync(Guid id)
    {
        return await _context.TransportAssignmentDomain
            .Include(t => t.Student)
            .Include(t => t.Vehicle)
            .Include(t => t.Driver)
            .Include(t => t.Route)
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<IEnumerable<TransportAssignment>> GetAllAsync()
    {
        return await _context.TransportAssignmentDomain
            .Include(t => t.Student)
            .Include(t => t.Vehicle)
            .Include(t => t.Driver)
            .Include(t => t.Route)
            .ToListAsync();
    }

    public async Task<TransportAssignment> AddAsync(TransportAssignment transportAssignment)
    {
        await _context.TransportAssignmentDomain.AddAsync(transportAssignment);
        await _context.SaveChangesAsync();
        return transportAssignment;
    }

    public async Task<TransportAssignment?> UpdateAsync(TransportAssignment transportAssignment)
    {
        _context.TransportAssignmentDomain.Update(transportAssignment);
        await _context.SaveChangesAsync();
        return transportAssignment;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var transportAssignment = await GetByIdAsync(id);
        if (transportAssignment != null)
        {
            _context.TransportAssignmentDomain.Remove(transportAssignment);
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<IEnumerable<TransportAssignment>> GetByStudentAsync(Guid studentId)
    {
        return await _context.TransportAssignmentDomain
            .Include(t => t.Student)
            .Include(t => t.Vehicle)
            .Include(t => t.Driver)
            .Include(t => t.Route)
            .Where(t => t.StudentId == studentId)
            .ToListAsync();
    }

    public async Task<IEnumerable<TransportAssignment>> GetByVehicleAsync(Guid vehicleId)
    {
        return await _context.TransportAssignmentDomain
            .Include(t => t.Student)
            .Include(t => t.Vehicle)
            .Include(t => t.Driver)
            .Include(t => t.Route)
            .Where(t => t.VehicleId == vehicleId)
            .ToListAsync();
    }
}
