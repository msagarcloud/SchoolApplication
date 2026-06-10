using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class ParentMaster
{
    public Guid Id { get; set; }

    public Guid StudentGuid { get; set; }

    public string ParentFirstName { get; set; } = null!;

    public string ParentLastName { get; set; } = null!;

    public DateTime? ParentDob { get; set; }

    public Guid QualificationId { get; set; }

    public string? Occupation { get; set; }

    public decimal? AnnualIncome { get; set; }

    public Guid DesignationId { get; set; }

    public string? Phone { get; set; }

    public string? Mobile { get; set; }

    public string? Email { get; set; }

    public string? Address1 { get; set; }

    public string? Address2 { get; set; }

    public Guid CityId { get; set; }

    public Guid StateId { get; set; }

    public Guid CountryId { get; set; }

    public string? ZipCode { get; set; }

    public string? OfficeAddress1 { get; set; }

    public string? OfficeAddress2 { get; set; }

    public Guid OfficeCityId { get; set; }

    public Guid OfficeStateId { get; set; }

    public Guid OfficeCountryId { get; set; }

    public string? OfficeZipCode { get; set; }

    public string? OfficePhone { get; set; }

    public string? Image { get; set; }

    public Guid RelationTypeId { get; set; }

    public Guid SchoolId { get; set; }

    public Guid CompanyId { get; set; }

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

    public virtual DesigMaster Designation { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual CityMaster OfficeCity { get; set; } = null!;

    public virtual CountryMaster OfficeCountry { get; set; } = null!;

    public virtual StateMaster OfficeState { get; set; } = null!;

    public virtual QualificationMaster Qualification { get; set; } = null!;

    public virtual RelationTypeMaster RelationType { get; set; } = null!;

    public virtual ICollection<ScholasticMaster> ScholasticMasters { get; set; } = new List<ScholasticMaster>();

    public virtual SchoolMaster School { get; set; } = null!;

    public virtual ICollection<SmstaskHistory> SmstaskHistoryParents { get; set; } = new List<SmstaskHistory>();

    public virtual ICollection<SmstaskHistory> SmstaskHistoryReceivers { get; set; } = new List<SmstaskHistory>();

    public virtual StateMaster State { get; set; } = null!;
}
