using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class TransportHelpService : ITransportHelpService
{
    private readonly ITransportHelpRepository _repository;

    public TransportHelpService(ITransportHelpRepository repository)
    {
        _repository = repository;
    }

    public async Task<TransportHelp?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<TransportHelp>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<TransportHelp> CreateAsync(TransportHelpRequest request)
    {
        var entity = new TransportHelp
        {
            Id = Guid.NewGuid(),
            HelpTitle = request.HelpTitle,
            HelpDescription = request.HelpDescription,
            HelpCategory = request.HelpCategory,
            HelpSolution = request.HelpSolution,
            Priority = request.Priority,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            CreatedBy = request.CreatedBy,
            CreatedDate = DateTime.UtcNow,
            IsActive = true,
            IsDeleted = false
        };

        return await _repository.AddAsync(entity);
    }

    public async Task<TransportHelp?> UpdateAsync(Guid id, TransportHelpRequest request)
    {
        var existingEntity = await _repository.GetByIdAsync(id);
        if (existingEntity == null)
            return null;

        existingEntity.HelpTitle = request.HelpTitle;
        existingEntity.HelpDescription = request.HelpDescription;
        existingEntity.HelpCategory = request.HelpCategory;
        existingEntity.HelpSolution = request.HelpSolution;
        existingEntity.Priority = request.Priority;
        existingEntity.ModifiedDate = DateTime.UtcNow;

        return await _repository.UpdateAsync(existingEntity);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _repository.DeleteAsync(id);
    }
}
