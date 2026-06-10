namespace SchoolDemo.Domain.DTOs;

public class RouteMasterRequest
{
    public string RouteName { get; set; } = string.Empty;
    public string? RouteDescription { get; set; }
    public string StartPoint { get; set; } = string.Empty;
    public string EndPoint { get; set; } = string.Empty;
    public string? IntermediateStops { get; set; }
    public decimal? Distance { get; set; }
    public string? EstimatedTime { get; set; }
    public decimal? Fare { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CreatedBy { get; set; }
    public bool IsActive { get; set; } = true;
}
