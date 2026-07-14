using Microsoft.EntityFrameworkCore;
using DomainEntity = SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using System;

namespace SchoolDemo.Infrastructure.Repositories;

public class TimeTablePeriodRepository : ITimeTablePeriodRepository
{
	private readonly SchoolDbContext _context;

	public TimeTablePeriodRepository(SchoolDbContext context)
	{
		_context = context;
	}

	public async Task<DomainEntity.TimeTablePeriodMaster?> GetByIdAsync(Guid id)
	{
		var entity = await _context.TimeTablePeriodMasters
			.Include(t => t.Session)
			.Include(t => t.Company)
			.Include(t => t.School)
			.FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);
		return MapToDomainEntity(entity);
	}

	public async Task<IEnumerable<DomainEntity.TimeTablePeriodMaster>> GetAllAsync()
	{
		var entities = await _context.TimeTablePeriodMasters
			.Include(t => t.Session)
			.Include(t => t.Company)
			.Include(t => t.School)
			.Where(t => !t.IsDeleted)
			.ToListAsync();
		return entities.Select(MapToDomainEntity).Where(e => e != null)!;
	}

	public async Task<DomainEntity.TimeTablePeriodMaster> AddAsync(DomainEntity.TimeTablePeriodMaster entity)
	{
		var infraEntity = MapToInfrastructureEntity(entity);
		infraEntity.CreatedDate = DateTime.UtcNow;
		infraEntity.IsActive = true;
		infraEntity.IsDeleted = false;
		await _context.TimeTablePeriodMasters.AddAsync(infraEntity);
		await _context.SaveChangesAsync();
		return MapToDomainEntity(infraEntity)!;
	}

	public async Task<DomainEntity.TimeTablePeriodMaster> UpdateAsync(DomainEntity.TimeTablePeriodMaster entity)
	{
		var existingEntity = await _context.TimeTablePeriodMasters
			.FirstOrDefaultAsync(t => t.Id == entity.Id && !t.IsDeleted);
		
		if (existingEntity == null)
		{
			throw new Exception($"TimeTablePeriod with ID {entity.Id} not found.");
		}

		// Update properties
		existingEntity.Description = entity.Description;
		existingEntity.StartTime = entity.StartTime;
		existingEntity.EndTime = entity.EndTime;
		existingEntity.SessionId = entity.SessionId;
		existingEntity.PeriodNumber = entity.PeriodNumber;
		existingEntity.IsActive = entity.IsActive;
		existingEntity.ModifiedBy = entity.ModifiedBy;
		existingEntity.ModifiedDate = DateTime.UtcNow;
		existingEntity.Status = entity.Status;
		existingEntity.StatusMessage = entity.StatusMessage;

		await _context.SaveChangesAsync();
		return MapToDomainEntity(existingEntity)!;
	}

	public async Task DeleteAsync(Guid id)
	{
		var entity = await _context.TimeTablePeriodMasters
			.FirstOrDefaultAsync(t => t.Id == id && !t.IsDeleted);
		
		if (entity == null)
		{
			throw new Exception($"TimeTablePeriod with ID {id} not found.");
		}

		entity.IsDeleted = true;
		entity.ModifiedDate = DateTime.UtcNow;
		entity.Status = "Deleted";
		entity.StatusMessage = "TimeTablePeriod deleted successfully";

		await _context.SaveChangesAsync();
	}

	private static DomainEntity.TimeTablePeriodMaster? MapToDomainEntity(SchoolDemo.Infrastructure.Data.TimeTablePeriodMaster? infraEntity)
	{
		if (infraEntity == null) return null;

		return new DomainEntity.TimeTablePeriodMaster
		{
			Id = infraEntity.Id,
			Description = infraEntity.Description,
			StartTime = infraEntity.StartTime,
			EndTime = infraEntity.EndTime,
			SessionId = infraEntity.SessionId,
			CompanyId = infraEntity.CompanyId,
			SchoolId = infraEntity.SchoolId,
			IsActive = infraEntity.IsActive,
			IsDeleted = infraEntity.IsDeleted,
			CreatedBy = infraEntity.CreatedBy,
			CreatedDate = infraEntity.CreatedDate,
			ModifiedBy = infraEntity.ModifiedBy,
			ModifiedDate = infraEntity.ModifiedDate,
			Status = infraEntity.Status,
			StatusMessage = infraEntity.StatusMessage,
			PeriodNumber = infraEntity.PeriodNumber
		};
	}

	private static SchoolDemo.Infrastructure.Data.TimeTablePeriodMaster MapToInfrastructureEntity(DomainEntity.TimeTablePeriodMaster domainEntity)
	{
		return new SchoolDemo.Infrastructure.Data.TimeTablePeriodMaster
		{
			Id = domainEntity.Id,
			Description = domainEntity.Description,
			StartTime = domainEntity.StartTime,
			EndTime = domainEntity.EndTime,
			SessionId = domainEntity.SessionId,
			CompanyId = domainEntity.CompanyId,
			SchoolId = domainEntity.SchoolId,
			IsActive = domainEntity.IsActive,
			IsDeleted = domainEntity.IsDeleted,
			CreatedBy = domainEntity.CreatedBy,
			CreatedDate = domainEntity.CreatedDate,
			ModifiedBy = domainEntity.ModifiedBy,
			ModifiedDate = domainEntity.ModifiedDate,
			Status = domainEntity.Status,
			StatusMessage = domainEntity.StatusMessage,
			PeriodNumber = domainEntity.PeriodNumber
		};
	}
}
