using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class InventoryMasterService : IInventoryMasterService
{
	private readonly IInventoryMasterRepository _repository;

	public InventoryMasterService(IInventoryMasterRepository repository)
	{
		_repository = repository;
	}

	public async Task<InventoryMasterResponse?> GetByIdAsync(Guid id)
	{
		var entity = await _repository.GetByIdAsync(id);
		return entity == null ? null : MapToResponse(entity);
	}

	public async Task<IEnumerable<InventoryMasterResponse>> GetAllAsync()
	{
		var entities = await _repository.GetAllAsync();
		return entities.Select(MapToResponse);
	}

	public async Task<InventoryMasterResponse> CreateAsync(InventoryMasterRequest request)
	{
		var entity = new SchoolDemo.Domain.Entities.InventoryMaster
		{
			Id = Guid.NewGuid(),
			Name = request.Name,
			ItemId = request.ItemId,
			LocationId = request.LocationId,
			Quantity = request.Quantity,
			CostPerItem = request.CostPerItem,
			CompanyId = request.CompanyId,
			SchoolId = request.SchoolId,
			IsActive = true,
			IsDeleted = false,
			CreatedBy = Guid.NewGuid(),
			CreatedDate = DateTime.UtcNow,
			Status = "Active",
			StatusMessage = "Inventory master created successfully"
		};

		var createdEntity = await _repository.AddAsync(entity);
		return MapToResponse(createdEntity);
	}

	public async Task<InventoryMasterResponse?> UpdateAsync(Guid id, InventoryMasterRequest request)
	{
		var existingEntity = await _repository.GetByIdAsync(id);

		// Fix: coalesce nullable bool to false
		if (existingEntity == null || (existingEntity.IsDeleted ?? false))
		{
			return null;
		}

		existingEntity.Name = request.Name ?? existingEntity.Name;
		existingEntity.ItemId = request.ItemId;
		existingEntity.LocationId = request.LocationId;
		existingEntity.Quantity = request.Quantity;
		existingEntity.CostPerItem = request.CostPerItem;
		existingEntity.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEntity.CompanyId;
		existingEntity.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEntity.SchoolId;
		existingEntity.ModifiedBy = Guid.NewGuid();
		existingEntity.ModifiedDate = DateTime.UtcNow;
		existingEntity.Status = "Updated";
		existingEntity.StatusMessage = "Inventory master updated successfully";

		var updatedEntity = await _repository.UpdateAsync(existingEntity);
		return MapToResponse(updatedEntity);
	}


	public async Task<bool> DeleteAsync(Guid id)
	{
		var entity = await _repository.GetByIdAsync(id);

		// Fix: coalesce nullable bool to false
		if (entity == null || (entity.IsDeleted ?? false))
		{
			return false;
		}

		await _repository.DeleteAsync(id);
		return true;
	}


	private static InventoryMasterResponse MapToResponse(SchoolDemo.Domain.Entities.InventoryMaster entity)
	{
		return new InventoryMasterResponse
		{
			Id = entity.Id,
			Name = entity.Name,
			ItemId = entity.ItemId,
			LocationId = entity.LocationId,
			Quantity = entity.Quantity,
			CostPerItem = entity.CostPerItem,
			CompanyId = entity.CompanyId,
			SchoolId = entity.SchoolId,
			IsActive = entity.IsActive,
			CreatedDate = entity.CreatedDate,
			ModifiedDate = (DateTime)entity.ModifiedDate,
			Status = entity.Status,
			StatusMessage = entity.StatusMessage
		};
	}
}
