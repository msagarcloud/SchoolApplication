using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class SystemParameterRepository : ISystemParameterRepository
{
	private readonly SchoolDbContext _context;

	public SystemParameterRepository(SchoolDbContext context)
	{
		_context = context;
	}

	public async Task<SchoolDemo.Domain.Entities.SystemParameter?> GetByIdAsync(Guid id)
	{
		var entity = await _context.SystemParameters.FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);
		return MapToDomain(entity);
	}

	public async Task<IEnumerable<SchoolDemo.Domain.Entities.SystemParameter>> GetAllAsync()
	{
		var entities = await _context.SystemParameters.Where(s => !s.IsDeleted).ToListAsync();
		return entities.Select(MapToDomain).Where(e => e != null).Select(e => e!);
	}

	public async Task<SchoolDemo.Domain.Entities.SystemParameter> AddAsync(SchoolDemo.Domain.Entities.SystemParameter parameter)
	{
		var entity = MapToInfrastructure(parameter);
		await _context.SystemParameters.AddAsync(entity);
		await _context.SaveChangesAsync();
		return MapToDomain(entity)!;
	}

	public async Task<SchoolDemo.Domain.Entities.SystemParameter> UpdateAsync(SchoolDemo.Domain.Entities.SystemParameter parameter)
	{
		var entity = MapToInfrastructure(parameter);
		_context.SystemParameters.Update(entity);
		await _context.SaveChangesAsync();
		return MapToDomain(entity)!;
	}

	public async Task DeleteAsync(Guid id)
	{
		var entity = await _context.SystemParameters.FirstOrDefaultAsync(s => s.Id == id);
		if (entity != null)
		{
			entity.IsDeleted = true;
			entity.ModifiedDate = DateTime.UtcNow;
			await _context.SaveChangesAsync();
		}
	}

	private static SchoolDemo.Domain.Entities.SystemParameter? MapToDomain(SchoolDemo.Infrastructure.Data.SystemParameter? e)
	{
		if (e == null) return null;
		return new SchoolDemo.Domain.Entities.SystemParameter
		{
			Id = e.Id,
			ParameterName = e.ParameterName,
			ParameterValue = e.ParameterValue,
			Description = e.Description,
			CompanyId = e.CompanyId,
			SchoolId = e.SchoolId,
			IsActive = e.IsActive,
			IsDeleted = e.IsDeleted,
			CreatedBy = e.CreatedBy,
			CreatedDate = e.CreatedDate,
			ModifiedBy = e.ModifiedBy,
			ModifiedDate = e.ModifiedDate,
			Status = e.Status,
			StatusMessage = e.StatusMessage
		};
	}

	private static SchoolDemo.Infrastructure.Data.SystemParameter MapToInfrastructure(SchoolDemo.Domain.Entities.SystemParameter d)
	{
		return new SchoolDemo.Infrastructure.Data.SystemParameter
		{
			Id = d.Id,
			ParameterName = d.ParameterName ?? string.Empty,
			ParameterValue = d.ParameterValue,
			Description = d.Description,
			CompanyId = d.CompanyId,
			SchoolId = d.SchoolId,
			IsActive = d.IsActive,
			IsDeleted = d.IsDeleted,
			CreatedBy = d.CreatedBy,
			CreatedDate = d.CreatedDate,
			ModifiedBy = d.ModifiedBy,
			ModifiedDate = d.ModifiedDate,
			Status = d.Status,
			StatusMessage = d.StatusMessage
		};
	}
}
