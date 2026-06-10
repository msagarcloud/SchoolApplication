using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class VehicleMaster
{
    public Guid Id { get; set; }

    public string? VehicleNumber { get; set; }

    public string? VehicleModel { get; set; }

    public string? VehicleMake { get; set; }

    public Guid VehicleTypeId { get; set; }

    public string? RegistrationNumber { get; set; }

    public string? InsuranceCompany { get; set; }

    public decimal? InsurancePremium { get; set; }

    public int? SeatingCapacity { get; set; }

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

    public virtual ICollection<BillMaster> BillMasters { get; set; } = new List<BillMaster>();

    public virtual CompanyMaster? Company { get; set; }

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual ICollection<RouteDetail> RouteDetails { get; set; } = new List<RouteDetail>();

    public virtual SchoolMaster? School { get; set; }

    public virtual ICollection<VehicleExpenseDetail> VehicleExpenseDetails { get; set; } = new List<VehicleExpenseDetail>();

    public virtual VehicleTypeMaster VehicleType { get; set; } = null!;
}
