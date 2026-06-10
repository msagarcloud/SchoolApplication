using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class BookMaster
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Image { get; set; }

    public Guid TypeId { get; set; }

    public Guid CategoryId { get; set; }

    public Guid AuthorId { get; set; }

    public Guid PublisherId { get; set; }

    public Guid? SupplierId { get; set; }

    public string? Edition { get; set; }

    public int? NoOfCopies { get; set; }

    public int? StockInHand { get; set; }

    public DateTime? PublishingDate { get; set; }

    public string? Isbnnumber { get; set; }

    public decimal? Price { get; set; }

    public int? TotalPages { get; set; }

    public bool IsIssuable { get; set; }

    public string? CallNumber { get; set; }

    public string? AccessionNumber { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual AuthorMaster Author { get; set; } = null!;

    public virtual ICollection<BookTransactionDetail> BookTransactionDetails { get; set; } = new List<BookTransactionDetail>();

    public virtual BookCategoryMaster Category { get; set; } = null!;

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual PublisherMaster Publisher { get; set; } = null!;

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual SupplierMaster? Supplier { get; set; }

    public virtual BookTypeMaster Type { get; set; } = null!;
}
