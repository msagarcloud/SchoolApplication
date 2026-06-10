using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ITransportHelpService
{
    Task<IEnumerable<TransportHelp>> GetAllAsync();
    Task<TransportHelp?> GetByIdAsync(Guid id);
    Task<TransportHelp> CreateAsync(TransportHelpRequest request);
    Task<TransportHelp?> UpdateAsync(Guid id, TransportHelpRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class TransportHelpRequest
{
    public string HelpTitle { get; set; } = string.Empty;
    public string HelpDescription { get; set; } = string.Empty;
    public string? HelpCategory { get; set; }
    public string? HelpSolution { get; set; }
    public int? Priority { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CreatedBy { get; set; }
}
