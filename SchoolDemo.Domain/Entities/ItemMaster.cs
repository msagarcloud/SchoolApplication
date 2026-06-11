namespace SchoolDemo.Domain.Entities;

public class ItemMaster
{
    public Guid Id { get; set; }
    public string? ItemName { get; set; }
    public string? Description { get; set; }
    public Guid ItemTypeMasterId { get; set; }
    public bool? IsActive { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public Guid? ModifiedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public bool? IsDeleted { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}
