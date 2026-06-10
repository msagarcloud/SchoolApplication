using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class CountryMaster
{
    public Guid Id { get; set; }

    public string? CountryName { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public virtual ICollection<AuthorMaster> AuthorMasters { get; set; } = new List<AuthorMaster>();

    public virtual ICollection<CompanyMaster> CompanyMasters { get; set; } = new List<CompanyMaster>();

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<DriverMaster> DriverMasters { get; set; } = new List<DriverMaster>();

    public virtual ICollection<EmpLeaveAvailDetail> EmpLeaveAvailDetails { get; set; } = new List<EmpLeaveAvailDetail>();

    public virtual ICollection<EmpMaster> EmpMasterCurrentCountries { get; set; } = new List<EmpMaster>();

    public virtual ICollection<EmpMaster> EmpMasterPermanentCountries { get; set; } = new List<EmpMaster>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<NonTeachingMaster> NonTeachingMasters { get; set; } = new List<NonTeachingMaster>();

    public virtual ICollection<ParentMaster> ParentMasterCountries { get; set; } = new List<ParentMaster>();

    public virtual ICollection<ParentMaster> ParentMasterOfficeCountries { get; set; } = new List<ParentMaster>();

    public virtual ICollection<PublisherMaster> PublisherMasters { get; set; } = new List<PublisherMaster>();

    public virtual ICollection<RegistrationMaster> RegistrationMasters { get; set; } = new List<RegistrationMaster>();

    public virtual ICollection<SchoolContactMaster> SchoolContactMasters { get; set; } = new List<SchoolContactMaster>();

    public virtual ICollection<SchoolMaster> SchoolMasterBankCountries { get; set; } = new List<SchoolMaster>();

    public virtual ICollection<SchoolMaster> SchoolMasterCountries { get; set; } = new List<SchoolMaster>();

    public virtual ICollection<SchoolMaster> SchoolMasterJudistrictionCountries { get; set; } = new List<SchoolMaster>();

    public virtual ICollection<StateMaster> StateMasters { get; set; } = new List<StateMaster>();

    public virtual ICollection<StudentMaster> StudentMasterBirthCountries { get; set; } = new List<StudentMaster>();

    public virtual ICollection<StudentMaster> StudentMasterCountries { get; set; } = new List<StudentMaster>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistoryBirthCountries { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistoryCountries { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistoryNationalityNavigations { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMaster> StudentMasterNationalityNavigations { get; set; } = new List<StudentMaster>();

    public virtual ICollection<SupplierMaster> SupplierMasters { get; set; } = new List<SupplierMaster>();

    public virtual ICollection<TeacherMaster> TeacherMasters { get; set; } = new List<TeacherMaster>();

    public virtual ICollection<VendorMaster> VendorMasters { get; set; } = new List<VendorMaster>();

    public virtual ICollection<VisitorMaster> VisitorMasters { get; set; } = new List<VisitorMaster>();
}
