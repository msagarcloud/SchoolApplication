using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class SectionRepository : ISectionRepository
{
    private readonly SchoolDbContext _context;

    public SectionRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<Section?> GetByIdAsync(Guid id)
    {
        var entity = await _context.SectionMasters
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);
        return MapToDomainEntity(entity);
    }

    public async Task<IEnumerable<Section>> GetAllAsync()
    {
        var entities = await _context.SectionMasters
            .Where(s => !s.IsDeleted)
            .ToListAsync();
        return entities.Select(MapToDomainEntity).Where(e => e != null)!;
    }

    public async Task<Section> AddAsync(Section section)
    {
        var entity = MapToInfrastructureEntity(section);
        await _context.SectionMasters.AddAsync(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task<Section> UpdateAsync(Section section)
    {
        var entity = MapToInfrastructureEntity(section);
        _context.SectionMasters.Update(entity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(entity)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await _context.SectionMasters
            .FirstOrDefaultAsync(s => s.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
            entity.ModifiedDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    private static Section? MapToDomainEntity(SectionMaster? entity)
    {
        if (entity == null) return null;
        return new Section
        {
            Id = entity.Id,
            Name = entity.Name,
            CompanyId = entity.CompanyId,
            SchoolId = entity.SchoolId,
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

    private static SectionMaster MapToInfrastructureEntity(Section section)
    {
        return new SectionMaster
        {
            Id = section.Id,
            Name = section.Name,
            CompanyId = section.CompanyId,
            SchoolId = section.SchoolId,
            IsActive = section.IsActive,
            IsDeleted = section.IsDeleted,
            CreatedBy = section.CreatedBy,
            CreatedDate = section.CreatedDate,
            ModifiedBy = section.ModifiedBy,
            ModifiedDate = section.ModifiedDate,
            Status = section.Status,
            StatusMessage = section.StatusMessage
        };
    }
}
