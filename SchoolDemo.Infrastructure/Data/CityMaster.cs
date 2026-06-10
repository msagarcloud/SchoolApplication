using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class CityMaster
{
    public Guid Id { get; set; }

    public string? CityName { get; set; }

    public Guid CityStateId { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public Guid CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid? ModifiedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public string Status { get; set; } = null!;

    public string? StatusMessage { get; set; }

    public virtual ICollection<AuthorMaster> AuthorMasters { get; set; } = new List<AuthorMaster>();

    public virtual StateMaster CityState { get; set; } = null!;

    public virtual ICollection<CompanyMaster> CompanyMasterCities { get; set; } = new List<CompanyMaster>();

    public virtual ICollection<CompanyMaster> CompanyMasterJudistrictionAreaNavigations { get; set; } = new List<CompanyMaster>();

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<DriverMaster> DriverMasters { get; set; } = new List<DriverMaster>();

    public virtual ICollection<EmpLeaveAvailDetail> EmpLeaveAvailDetails { get; set; } = new List<EmpLeaveAvailDetail>();

    public virtual ICollection<EmpMaster> EmpMasterCurrentCities { get; set; } = new List<EmpMaster>();

    public virtual ICollection<EmpMaster> EmpMasterPermanentCities { get; set; } = new List<EmpMaster>();

    public virtual ICollection<LocationMaster> LocationMasters { get; set; } = new List<LocationMaster>();

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<NonTeachingMaster> NonTeachingMasters { get; set; } = new List<NonTeachingMaster>();

    public virtual ICollection<ParentMaster> ParentMasterCities { get; set; } = new List<ParentMaster>();

    public virtual ICollection<ParentMaster> ParentMasterOfficeCities { get; set; } = new List<ParentMaster>();

    public virtual ICollection<PublisherMaster> PublisherMasters { get; set; } = new List<PublisherMaster>();

    public virtual ICollection<RegistrationMaster> RegistrationMasters { get; set; } = new List<RegistrationMaster>();

    public virtual ICollection<RouteLocationMaster> RouteLocationMasters { get; set; } = new List<RouteLocationMaster>();

    public virtual ICollection<SchoolContactMaster> SchoolContactMasters { get; set; } = new List<SchoolContactMaster>();

    public virtual ICollection<SchoolMaster> SchoolMasterBankCities { get; set; } = new List<SchoolMaster>();

    public virtual ICollection<SchoolMaster> SchoolMasterCities { get; set; } = new List<SchoolMaster>();

    public virtual ICollection<SchoolMaster> SchoolMasterJudistrictionCities { get; set; } = new List<SchoolMaster>();

    public virtual ICollection<StudentMaster> StudentMasterBirthCities { get; set; } = new List<StudentMaster>();

    public virtual ICollection<StudentMaster> StudentMasterCities { get; set; } = new List<StudentMaster>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistoryBirthCities { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<StudentMasterHistory> StudentMasterHistoryCities { get; set; } = new List<StudentMasterHistory>();

    public virtual ICollection<SupplierMaster> SupplierMasters { get; set; } = new List<SupplierMaster>();

    public virtual ICollection<TeacherMaster> TeacherMasters { get; set; } = new List<TeacherMaster>();

    public virtual ICollection<VendorMaster> VendorMasters { get; set; } = new List<VendorMaster>();

    public virtual ICollection<VisitorMaster> VisitorMasters { get; set; } = new List<VisitorMaster>();
}
