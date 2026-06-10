using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class EmpAttendanceDetailsHistory
{
    public Guid Id { get; set; }

    public Guid EmployeeId { get; set; }

    public int? AttendenceMonth { get; set; }

    public int? AttendenceYear { get; set; }

    public DateTime AttendenceDate { get; set; }

    public bool AttendenceMarked { get; set; }

    public Guid AttendenceLeaveTypeId { get; set; }

    public string? AttendenceTime { get; set; }

    public bool? IsHalfDay { get; set; }

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

    public virtual LeaveTypeMaster AttendenceLeaveType { get; set; } = null!;

    public virtual EmpAttendanceDetailsHistory Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual EmpMaster Employee { get; set; } = null!;

    public virtual ICollection<EmpAttendanceDetailsHistory> InverseCompany { get; set; } = new List<EmpAttendanceDetailsHistory>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;
}
