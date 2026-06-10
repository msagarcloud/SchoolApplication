using System;
using System.Collections.Generic;

namespace SchoolDemo.Infrastructure.Data;

public partial class EmpMaster
{
    public Guid Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public DateTime Dob { get; set; }

    public DateTime Doj { get; set; }

    public DateTime? ProbationStartDate { get; set; }

    public int? ProbationPeriod { get; set; }

    public DateTime? ConfirmationDate { get; set; }

    public string? Pannumber { get; set; }

    public string? Esicnumber { get; set; }

    public string? Pfnumeber { get; set; }

    public string? CurrentAddress1 { get; set; }

    public string? CurrentAddress2 { get; set; }

    public Guid? CurrentCityId { get; set; }

    public Guid? CurrentStateId { get; set; }

    public Guid? CurrentCountryId { get; set; }

    public string? CurrentZipCode { get; set; }

    public string? PermanentAddress1 { get; set; }

    public string? PermanentAddress2 { get; set; }

    public Guid? PermanentCityId { get; set; }

    public Guid? PermanentStateId { get; set; }

    public Guid? PermanentCountryId { get; set; }

    public string? PermanentZipCode { get; set; }

    public string? PhoneNumber { get; set; }

    public string? MobileNumber { get; set; }

    public string? EmailId { get; set; }

    public Guid? DepartmentId { get; set; }

    public Guid? DesignationId { get; set; }

    public Guid? PaymentModeId { get; set; }

    public Guid? EmployeeTypeId { get; set; }

    public Guid? CategoryId { get; set; }

    public string? BankAccountNumber { get; set; }

    public string? BankName { get; set; }

    public Guid? GenderId { get; set; }

    public Guid? BloodGroupId { get; set; }

    public Guid? GradeId { get; set; }

    public string? Image { get; set; }

    public Guid? EmployeeOldId { get; set; }

    public string? FathersName { get; set; }

    public string? MothersName { get; set; }

    public string? Description { get; set; }

    public string? LicenceNumber { get; set; }

    public DateTime? LicenceIssueDate { get; set; }

    public DateTime? LicenceValidUpto { get; set; }

    public string? LicenceDescription { get; set; }

    public string? LicenceImage { get; set; }

    public string? LicenceType { get; set; }

    public string? Salutation { get; set; }

    public DateTime? DateOfLeaving { get; set; }

    public string? MaritalStatus { get; set; }

    public string? YearsOfExperience { get; set; }

    public string? PrevioudSchoolCompany { get; set; }

    public string? AadhaarNumber { get; set; }

    public int? MathUpToClass { get; set; }

    public int? EnglishUptoClass { get; set; }

    public int? SstuptoClass { get; set; }

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

    public Guid? EmployeeCategoryId { get; set; }

    public virtual BloodGroupMaster? BloodGroup { get; set; }

    public virtual EmpCategoryMaster? Category { get; set; }

    public virtual CompanyMaster Company { get; set; } = null!;

    public virtual UserDetail CreatedByNavigation { get; set; } = null!;

    public virtual CityMaster? CurrentCity { get; set; }

    public virtual CountryMaster? CurrentCountry { get; set; }

    public virtual StateMaster? CurrentState { get; set; }

    public virtual DeptMaster? Department { get; set; }

    public virtual DesigMaster? Designation { get; set; }

    public virtual ICollection<EmpAttendanceDetail> EmpAttendanceDetails { get; set; } = new List<EmpAttendanceDetail>();

    public virtual ICollection<EmpAttendanceDetailsHistory> EmpAttendanceDetailsHistories { get; set; } = new List<EmpAttendanceDetailsHistory>();

    public virtual ICollection<EmpDocumentDetail> EmpDocumentDetails { get; set; } = new List<EmpDocumentDetail>();

    public virtual ICollection<EmpLeaveAvailDetail> EmpLeaveAvailDetails { get; set; } = new List<EmpLeaveAvailDetail>();

    public virtual ICollection<EmpLeaveDetail> EmpLeaveDetails { get; set; } = new List<EmpLeaveDetail>();

    public virtual ICollection<EmpLeaveDetailsHistory> EmpLeaveDetailsHistories { get; set; } = new List<EmpLeaveDetailsHistory>();

    public virtual ICollection<EmpSalaryDetail> EmpSalaryDetails { get; set; } = new List<EmpSalaryDetail>();

    public virtual ICollection<EmpSalaryDetailsHistory> EmpSalaryDetailsHistories { get; set; } = new List<EmpSalaryDetailsHistory>();

    public virtual ICollection<EmpSalaryMasterHistory> EmpSalaryMasterHistories { get; set; } = new List<EmpSalaryMasterHistory>();

    public virtual ICollection<EmpSalaryMaster> EmpSalaryMasters { get; set; } = new List<EmpSalaryMaster>();

    public virtual ICollection<EmpSalaryStructureDetail> EmpSalaryStructureDetails { get; set; } = new List<EmpSalaryStructureDetail>();

    public virtual ICollection<EmpSalaryStructureDetailsHistory> EmpSalaryStructureDetailsHistories { get; set; } = new List<EmpSalaryStructureDetailsHistory>();

    public virtual EmpCategoryMaster? EmployeeCategory { get; set; }

    public virtual EmpTypeMaster? EmployeeType { get; set; }

    public virtual GenderMaster? Gender { get; set; }

    public virtual GradeMaster? Grade { get; set; }

    public virtual UserDetail? ModifiedByNavigation { get; set; }

    public virtual PaymentTypeMode? PaymentMode { get; set; }

    public virtual CityMaster? PermanentCity { get; set; }

    public virtual CountryMaster? PermanentCountry { get; set; }

    public virtual StateMaster? PermanentState { get; set; }

    public virtual SchoolMaster School { get; set; } = null!;
}
