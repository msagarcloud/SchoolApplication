using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class EmpLeaveAvailDetail
{
    public Guid Id { get; set; }

    public Guid EmployeeId { get; set; }

    public Guid LeaveTypeId { get; set; }

    public DateTime ApplyDate { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public decimal? TotalDays { get; set; }

    public bool IsHalfDay { get; set; }

    public string? LeaveReason { get; set; }

    public string? Address1 { get; set; }

    public string? Address2 { get; set; }

    public Guid CityId { get; set; }

    public Guid StateId { get; set; }

    public Guid CountryId { get; set; }

    public string? ZipCode { get; set; }

    public string? ContactNumber { get; set; }

    public Guid StatusId { get; set; }

    public Guid Session { get; set; }

    public Guid CompanyId { get; set; }

    public Guid SchoolId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual CityMaster City { get; set; } = null!;

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual CountryMaster Country { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual EmpMaster Employee { get; set; } = null!;

    public virtual LeaveTypeMaster LeaveType { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual SessionMaster SessionNavigation { get; set; } = null!;

    public virtual StateMaster State { get; set; } = null!;
}
