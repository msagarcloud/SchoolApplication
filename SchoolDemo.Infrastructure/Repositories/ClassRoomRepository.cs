using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class ClassRoomRepository : IClassRoomRepository
{
    private readonly SchoolDbContext _context;

    public ClassRoomRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<ClassRoom?> GetByIdAsync(Guid id)
    {
        var entity = await _context.ClassRoomMasters
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<ClassRoom>> GetAllAsync()
    {
        var entities = await _context.ClassRoomMasters
            .Where(c => !c.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<ClassRoom> AddAsync(ClassRoom classRoom)
    {
        var entity = MapToInfrastructureEntity(classRoom);
        await _context.ClassRoomMasters.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task<ClassRoom> UpdateAsync(ClassRoom classRoom)
    {
        var entity = MapToInfrastructureEntity(classRoom);
        _context.ClassRoomMasters.Update(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.ClassRoomMasters
            .FirstOrDefaultAsync(c => c.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static ClassRoom? MapToDomainEntity(ClassRoomMaster? entity)
    {
        if (entity == null) return null;
        return new ClassRoom
        {
            Id = entity.Id,
            Name = entity.Name,
            SchoolId = entity.SchoolId,
            CompanyId = entity.CompanyId,
            IsActive = entity.IsActive,
            IsDeleted = entity.IsDeleted,
            CreatedBy = entity.CreatedBy,
            CreatedDate = entity.CreatedDate,
            ModifiedBy = entity.ModifiedBy,
            ModifiedDate = entity.ModifiedDate,
            Status = entity.Status,
            StatusMessage = entity.StatusMessage
        };
    }

    private static ClassRoomMaster MapToInfrastructureEntity(ClassRoom classRoom)
    {
        return new ClassRoomMaster
        {
            Id = classRoom.Id,
            Name = classRoom.Name,
            SchoolId = classRoom.SchoolId,
            CompanyId = classRoom.CompanyId,
            IsActive = classRoom.IsActive,
            IsDeleted = classRoom.IsDeleted,
            CreatedBy = classRoom.CreatedBy,
            CreatedDate = classRoom.CreatedDate,
            ModifiedBy = classRoom.ModifiedBy,
            ModifiedDate = classRoom.ModifiedDate,
            Status = classRoom.Status,
            StatusMessage = classRoom.StatusMessage
        };
    }
}
