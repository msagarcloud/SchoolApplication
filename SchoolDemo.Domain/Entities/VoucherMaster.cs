namespace SchoolDemo.Domain.Entities;

public class VoucherMaster
{
    public Guid Id { get; set; }
    
    public string? VoucherNumber { get; set; }
    
    public string? VoucherName { get; set; }
    
    public string? Description { get; set; }
    
    public DateTime IssueDate { get; set; }
    
    public decimal? Amount { get; set; }
    
    public Guid ExpenseCategoryId { get; set; }
    
    public Guid? CompanyId { get; set; }
    
    public Guid? SchoolId { get; set; }
    
    public bool IsActive { get; set; }
    
    public bool IsDeleted { get; set; }
    
    public Guid CreatedBy { get; set; }
    
    public DateTime CreatedDate { get; set; }
    
    public Guid? ModifiedBy { get; set; }
    
    public DateTime? ModifiedDate { get; set; }
    
    public string? Status { get; set; }
    
    public string? StatusMessage { get; set; }
}
