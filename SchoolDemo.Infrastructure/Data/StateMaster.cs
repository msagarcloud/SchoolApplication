using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class StateMaster
{
    public Guid Id { get; set; }

    public string? StateName { get; set; }

    public Guid CountryId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string? Status { get; set; }

    public string? StatusMessage { get; set; }

    public virtual ICollection<AuthorMaster> AuthorMasters { get; set; } = new List<AuthorMaster>();

    public virtual ICollection<CityMaster> CityMasters { get; set; } = new List<CityMaster>();

    public virtual ICollection<CompanyMaster> CompanyMasters { get; set; } = new List<CompanyMaster>();

    public virtual CountryMaster Country { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<DriverMaster> DriverMasters { get; set; } = new List<DriverMaster>();

    public virtual ICollection<EmpLeaveAvailDetail> EmpLeaveAvailDetails { get; set; } = new List<EmpLeaveAvailDetail>();

    public virtual ICollection<EmpMaster> EmpMasterCurrentStates { get; set; } = new List<EmpMaster>();

    public virtual ICollection<EmpMaster> EmpMasterPermanentStates { get; set; } = new List<EmpMaster>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<NonTeachingMaster> NonTeachingMasters { get; set; } = new List<NonTeachingMaster>();

    public virtual ICollection<ParentMaster> ParentMasterOfficeStates { get; set; } = new List<ParentMaster>();

    public virtual ICollection<ParentMaster> ParentMasterStates { get; set; } = new List<ParentMaster>();

    public virtual ICollection<PublisherMaster> PublisherMasters { get; set; } = new List<PublisherMaster>();

    public virtual ICollection<RegistrationMaster> RegistrationMasters { get; set; } = new List<RegistrationMaster>();

    public virtual ICollection<SchoolContactMaster> SchoolContactMasters { get; set; } = new List<SchoolContactMaster>();

    public virtual ICollection<SchoolMaster> SchoolMasterBankStates { get; set; } = new List<SchoolMaster>();

    public virtual ICollection<SchoolMaster> SchoolMasterJudistrictionStates { get; set; } = new List<SchoolMaster>();

    public virtual ICollection<SchoolMaster> SchoolMasterStates { get; set; } = new List<SchoolMaster>();

    public virtual ICollection<StudentMaster> StudentMasterBirthStates { get; set; } = new List<StudentMaster>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistoryBirthStates { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistoryStates { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMaster> StudentMasterStates { get; set; } = new List<StudentMaster>();

    public virtual ICollection<TeacherMaster> TeacherMasters { get; set; } = new List<TeacherMaster>();

    public virtual ICollection<VendorMaster> VendorMasters { get; set; } = new List<VendorMaster>();

    public virtual ICollection<VisitorMaster> VisitorMasters { get; set; } = new List<VisitorMaster>();
}
