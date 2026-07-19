using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using System;
using System.Threading.Tasks;

namespace SchoolDemo.Infrastructure.Repositories;

public class HolidayRepository : IHolidayRepository
{
	private readonly SchoolDbContext _context;

	public HolidayRepository(SchoolDbContext context)
	{
		_context = context;
	}

	public async Task<SchoolDemo.Domain.Entities.HolidayMaster?> GetByIdAsync(Guid id)
	{
		var entity = await _context.HolidayMasters
			.FirstOrDefaultAsync(h => h.Id == id && !h.IsDeleted);
		return MapToDomainEntity(entity);
	}

	public async Task<IEnumerable<SchoolDemo.Domain.Entities.HolidayMaster>> GetAllAsync()
	{
		var entities = await _context.HolidayMasters
			.Where(h => !h.IsDeleted)
			.ToListAsync();
		return entities.Select(MapToDomainEntity).Where(e => e != null)!;
	}

	public async Task<SchoolDemo.Domain.Entities.HolidayMaster> AddAsync(SchoolDemo.Domain.Entities.HolidayMaster entity)
	{
		var infraEntity = MapToInfrastructureEntity(entity);
		await _context.HolidayMasters.AddAsync(infraEntity);
		await _context.SaveChangesAsync();
		return MapToDomainEntity(infraEntity)!;
	}

	public async Task<SchoolDemo.Domain.Entities.HolidayMaster> UpdateAsync(SchoolDemo.Domain.Entities.HolidayMaster entity)
	{
		// Try to get the existing infrastructure entity tracked by the context
		var existing = await _context.HolidayMasters.FirstOrDefaultAsync(h => h.Id == entity.Id);
		if (existing == null)
		{
			// Not found in DB/context - map and add as new
			var infraEntity = MapToInfrastructureEntity(entity);
			_context.HolidayMasters.Add(infraEntity);
			await _context.SaveChangesAsync();
			return MapToDomainEntity(infraEntity)!;
		}

		// Update only scalar properties on the tracked entity to avoid duplicate-tracking issues
		existing.Name = entity.Name;
		existing.Description = entity.Description;
		existing.TypeId = entity.TypeId;
		existing.FromDate = entity.FromDate;
		existing.ToDate = entity.ToDate;
		existing.Year = entity.Year;
		existing.CompanyId = entity.CompanyId;
		existing.SchoolId = entity.SchoolId;
		existing.IsStaffApplicable = entity.IsStaffApplicable;
		existing.SessionId = entity.SessionId;
		existing.ModifiedBy = entity.ModifiedBy;
		existing.ModifiedDate = entity.ModifiedDate;
		existing.Status = entity.Status;
		existing.StatusMessage = entity.StatusMessage;

		await _context.SaveChangesAsync();
		return MapToDomainEntity(existing)!;
	}

	public async Task DeleteAsync(Guid id)
	{
		var entity = await _context.HolidayMasters
			.FirstOrDefaultAsync(h => h.Id == id);
		if (entity != null)
		{
			entity.IsDeleted = true;
			entity.ModifiedDate = DateTime.UtcNow;
			await _context.SaveChangesAsync();
		}
	}

	private static SchoolDemo.Domain.Entities.HolidayMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.HolidayMaster? entity)
	{
		if (entity == null) return null;
		return new SchoolDemo.Domain.Entities.HolidayMaster
		{
			Id = entity.Id,
			Name = entity.Name,
			Description = entity.Description,
			TypeId = entity.TypeId,
			FromDate = entity.FromDate,
			ToDate = entity.ToDate,
			Year = entity.Year,
			CompanyId = entity.CompanyId,
			SchoolId = entity.SchoolId,
			IsStaffApplicable = entity.IsStaffApplicable,
			SessionId = entity.SessionId,
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

	private static SchoolDemo.Infrastructure.Data.HolidayMaster MapToInfrastructureEntity(SchoolDemo.Domain.Entities.HolidayMaster src)
	{
		return new SchoolDemo.Infrastructure.Data.HolidayMaster
		{
			Id = src.Id,
			Name = src.Name,
			Description = src.Description,
			TypeId = src.TypeId,
			FromDate = src.FromDate,
			ToDate = src.ToDate,
			Year = src.Year,
			CompanyId = src.CompanyId,
			SchoolId = src.SchoolId,
			IsStaffApplicable = src.IsStaffApplicable,
			SessionId = src.SessionId,
			ModifiedBy = src.ModifiedBy, // only FK scalar
			ModifiedDate = src.ModifiedDate,
			Status = src.Status,
			StatusMessage = src.StatusMessage
			// Do NOT set navigation properties (e.g. UserDetails) here
		};
	}
}
