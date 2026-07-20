using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class DeptRepository : IDeptRepository
{
	private readonly SchoolDbContext _context;

	public DeptRepository(SchoolDbContext context)
	{
		_context = context;
	}

	public async Task<SchoolDemo.Domain.Entities.DeptMaster?> GetByIdAsync(Guid id)
	{
		var entity = await _context.DeptMasters
			.FirstOrDefaultAsync(d => d.Id == id && !d.IsDeleted);
		return MapToDomainEntity(entity);
	}

	public async Task<IEnumerable<SchoolDemo.Domain.Entities.DeptMaster>> GetAllAsync()
	{
		var entities = await _context.DeptMasters
			.Where(d => !d.IsDeleted)
			.ToListAsync();
		return entities.Select(MapToDomainEntity).Where(e => e != null)!;
	}

	public async Task<SchoolDemo.Domain.Entities.DeptMaster> AddAsync(SchoolDemo.Domain.Entities.DeptMaster entity)
	{
		var infraEntity = MapToInfrastructureEntity(entity);
		await _context.DeptMasters.AddAsync(infraEntity);
		await _context.SaveChangesAsync();
		return MapToDomainEntity(infraEntity)!;
	}

    public async Task<SchoolDemo.Domain.Entities.DeptMaster> UpdateAsync(SchoolDemo.Domain.Entities.DeptMaster entity)
    {
        var infraEntity = MapToInfrastructureEntity(entity);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.DeptMasters.Local.FirstOrDefault(e => e.Id == infraEntity.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.DeptMasters.Update(infraEntity);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(infraEntity)!;
    }

	public async Task DeleteAsync(Guid id)
	{
		var entity = await _context.DeptMasters
			.FirstOrDefaultAsync(d => d.Id == id);
		if (entity != null)
		{
			entity.IsDeleted = true;
			entity.ModifiedDate = DateTime.UtcNow;
			await _context.SaveChangesAsync();
		}
	}

	private static SchoolDemo.Domain.Entities.DeptMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.DeptMaster? entity)
	{
		if (entity == null) return null;
		return new SchoolDemo.Domain.Entities.DeptMaster
		{
			Id = entity.Id,
			DeptCode = entity.DeptCode,
			DeptName = entity.DeptName,
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

	private static SchoolDemo.Infrastructure.Data.DeptMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.DeptMaster entity)
	{
		return new SchoolDemo.Infrastructure.Data.DeptMaster
		{
			Id = entity.Id,
			DeptCode = entity.DeptCode,
			DeptName = entity.DeptName,
			CompanyId = entity.CompanyId,
			SchoolId = entity.SchoolId,
			IsActive = entity.IsActive,
			IsDeleted = entity.IsDeleted,
			CreatedBy = entity.CreatedBy,
			CreatedDate = entity.CreatedDate,
			ModifiedBy = entity.ModifiedBy,
			ModifiedDate = entity.ModifiedDate,
			Status = entity.Status!,
			StatusMessage = entity.StatusMessage!
		};
	}
}
