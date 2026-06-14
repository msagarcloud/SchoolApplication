using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Interfaces;
using AutoMapper;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class StudentAttendanceRepository : IStudentAttendanceRepository
{
    private readonly SchoolDbContext _context;
    private readonly IMapper _mapper;

    public StudentAttendanceRepository(SchoolDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<SchoolDemo.Domain.Entities.StudentAttendanceDetail?> GetByIdAsync(Guid id)
    {
        var entity = await _context.StudentAttendanceDetails.FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
        return entity == null ? null : _mapper.Map<SchoolDemo.Domain.Entities.StudentAttendanceDetail>(entity);
    }

    public async Task<IEnumerable<SchoolDemo.Domain.Entities.StudentAttendanceDetail>> GetAllAsync()
    {
        var list = await _context.StudentAttendanceDetails.Where(e => !e.IsDeleted).ToListAsync();
        return list.Select(i => _mapper.Map<SchoolDemo.Domain.Entities.StudentAttendanceDetail>(i));
    }

    public async Task<SchoolDemo.Domain.Entities.StudentAttendanceDetail> AddAsync(SchoolDemo.Domain.Entities.StudentAttendanceDetail entity)
    {
        var infra = _mapper.Map<SchoolDemo.Infrastructure.Data.StudentAttendanceDetail>(entity);
        await _context.StudentAttendanceDetails.AddAsync(infra);
        await _context.SaveChangesAsync();
        return _mapper.Map<SchoolDemo.Domain.Entities.StudentAttendanceDetail>(infra)!;
    }

    public async Task<SchoolDemo.Domain.Entities.StudentAttendanceDetail> UpdateAsync(SchoolDemo.Domain.Entities.StudentAttendanceDetail entity)
    {
        var infra = _mapper.Map<SchoolDemo.Infrastructure.Data.StudentAttendanceDetail>(entity);
        _context.StudentAttendanceDetails.Update(infra);
        await _context.SaveChangesAsync();
        return _mapper.Map<SchoolDemo.Domain.Entities.StudentAttendanceDetail>(infra)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var infra = await _context.StudentAttendanceDetails.FirstOrDefaultAsync(e => e.Id == id);
        if (infra != null)
        {
            infra.IsDeleted = true;
            infra.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

}
