using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Domain.DTOs;
using DomainRouteMaster = SchoolDemo.Domain.Entities.RouteMaster;

namespace SchoolDemo.Application.Services;

public class RouteMasterService : IRouteMasterService
{
    private readonly IRouteMasterRepository _repository;

    public RouteMasterService(IRouteMasterRepository repository)
    {
        _repository = repository;
    }

    public async Task<DomainRouteMaster?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<DomainRouteMaster>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<DomainRouteMaster> CreateAsync(RouteMasterRequest request)
    {
        var entity = new DomainRouteMaster
        {
            Id = Guid.NewGuid(),
            RouteName = request.RouteName,
            RouteDescription = request.RouteDescription,
            StartPoint = request.StartPoint,
            EndPoint = request.EndPoint,
            IntermediateStops = request.IntermediateStops,
            Distance = request.Distance,
            EstimatedTime = request.EstimatedTime,
            Fare = request.Fare,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            CreatedBy = request.CreatedBy,
            CreatedDate = DateTime.UtcNow,
            IsActive = request.IsActive,
            IsDeleted = false
        };

        return await _repository.AddAsync(entity);
    }

    public async Task<DomainRouteMaster?> UpdateAsync(Guid id, RouteMasterRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null)
            return null;

        existingEntity.RouteName = request.RouteName;
        existingEntity.RouteDescription = request.RouteDescription;
        existingEntity.StartPoint = request.StartPoint;
        existingEntity.EndPoint = request.EndPoint;
        existingEntity.IntermediateStops = request.IntermediateStops;
        existingEntity.Distance = request.Distance;
        existingEntity.EstimatedTime = request.EstimatedTime;
        existingEntity.Fare = request.Fare;
        existingEntity.IsActive = request.IsActive;
        existingEntity.ModifiedBy = request.CreatedBy;
        existingEntity.ModifiedDate = DateTime.UtcNow;

        return await _repository.UpdateAsync(existingEntity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }
}
