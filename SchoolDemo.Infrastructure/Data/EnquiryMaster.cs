using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class EnquiryMaster
{
    public Guid Id { get; set; }

    public string? EnquirerName { get; set; }

    public string? ContactNumber { get; set; }

    public string? EmailAddress { get; set; }

    public string? EnquiryType { get; set; }

    public string? Subject { get; set; }

    public string? Message { get; set; }

    public string Priority { get; set; } = null!;

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public DateTime EnquiryDate { get; set; }

    public string? ResponseMessage { get; set; }

    public string? ResponseType { get; set; }

    public DateTime? ResponseDate { get; set; }

    public Guid? CompanyId { get; set; }

    public Guid? SchoolId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public virtual CompanyMaster? Company { get; set; }

    public virtual SchoolMaster? School { get; set; }
}
