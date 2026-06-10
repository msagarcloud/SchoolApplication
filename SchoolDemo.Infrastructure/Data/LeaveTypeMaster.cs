using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class LeaveTypeMaster
{
    public Guid Id { get; set; }

    public string? Code { get; set; }

    public string? Description { get; set; }

    public Guid? ApplicableGender { get; set; }

    public bool IsSpecialLeave { get; set; }

    public bool IsEncashable { get; set; }

    public bool IsCarryForward { get; set; }

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

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<EmpAttendanceDetail> EmpAttendanceDetails { get; set; } = new List<EmpAttendanceDetail>();

    public virtual ICollection<EmpAttendanceDetailsHistory> EmpAttendanceDetailsHistories { get; set; } = new List<EmpAttendanceDetailsHistory>();

    public virtual ICollection<EmpCatLeaveDetail> EmpCatLeaveDetailEmpCatLeaveCategories { get; set; } = new List<EmpCatLeaveDetail>();

    public virtual ICollection<EmpCatLeaveDetail> EmpCatLeaveDetailLeaveTypes { get; set; } = new List<EmpCatLeaveDetail>();

    public virtual ICollection<EmpCatLeaveDetailsHistory> EmpCatLeaveDetailsHistoryEmpCatLeaveCategories { get; set; } = new List<EmpCatLeaveDetailsHistory>();

    public virtual ICollection<EmpCatLeaveDetailsHistory> EmpCatLeaveDetailsHistoryLeaveTypes { get; set; } = new List<EmpCatLeaveDetailsHistory>();

    public virtual ICollection<EmpLeaveAvailDetail> EmpLeaveAvailDetails { get; set; } = new List<EmpLeaveAvailDetail>();

    public virtual ICollection<EmpLeaveDetail> EmpLeaveDetails { get; set; } = new List<EmpLeaveDetail>();

    public virtual ICollection<EmpLeaveDetailsHistory> EmpLeaveDetailsHistories { get; set; } = new List<EmpLeaveDetailsHistory>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;
}
