using SchoolDemo.Domain.Entities;
using TeacherMaster = SchoolDemo.Domain.Entities.TeacherMaster;
using TeacherSubjectDetail = SchoolDemo.Domain.Entities.TeacherSubjectDetail;

namespace SchoolDemo.Domain.Interfaces;

// Class Service
public interface IClassService
{
    Task<ClassResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<ClassResponse>> GetAllAsync();
    Task<IEnumerable<ClassResponse>> GetBySchoolIdAsync(Guid schoolId);
    Task<ClassResponse> CreateAsync(ClassRequest request);
    Task<ClassResponse?> UpdateAsync(Guid id, ClassRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Section Service
public interface ISectionService
{
    Task<SectionResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<SectionResponse>> GetAllAsync();
    Task<SectionResponse> CreateAsync(SectionRequest request);
    Task<SectionResponse?> UpdateAsync(Guid id, SectionRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Class Room Service
public interface IClassRoomService
{
    Task<ClassRoomResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<ClassRoomResponse>> GetAllAsync();
    Task<ClassRoomResponse> CreateAsync(ClassRoomRequest request);
    Task<ClassRoomResponse?> UpdateAsync(Guid id, ClassRoomRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Class Section Detail Service
public interface IClassSectionDetailService
{
    Task<ClassSectionDetailResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<ClassSectionDetailResponse>> GetAllAsync();
    Task<IEnumerable<ClassSectionDetailResponse>> GetBySchoolIdAsync(Guid schoolId);
    Task<ClassSectionDetailResponse> CreateAsync(ClassSectionDetailRequest request);
    Task<ClassSectionDetailResponse?> UpdateAsync(Guid id, ClassSectionDetailRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Subject Service
public interface ISubjectService
{
    Task<SubjectResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<SubjectResponse>> GetAllAsync();
    Task<SubjectResponse> CreateAsync(SubjectRequest request);
    Task<SubjectResponse?> UpdateAsync(Guid id, SubjectRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Teacher Master Service
public interface ITeacherMasterService
{
    Task<TeacherMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<TeacherMaster>> GetAllAsync();
    Task<TeacherMaster> CreateAsync(TeacherMaster entity);
    Task<TeacherMaster?> UpdateAsync(TeacherMaster entity);
    Task<bool> DeleteAsync(Guid id);
}

// Class Subject Detail Service
public interface IClassSubjectDetailService
{
    Task<ClassSubjectDetailResponse?> GetByIdAsync(Guid id, Guid schoolId);
    Task<IEnumerable<ClassSubjectDetailResponse>> GetAllAsync(Guid schoolId);
    Task<ClassSubjectDetailResponse> CreateAsync(ClassSubjectDetailRequest request);
    Task<ClassSubjectDetailResponse?> UpdateAsync(Guid id, ClassSubjectDetailRequest request, Guid schoolId);
    Task<bool> DeleteAsync(Guid id, Guid schoolId);
}

// Teacher Subject Detail Service
public interface ITeacherSubjectDetailService
{
    Task<TeacherSubjectDetail?> GetByIdAsync(Guid id);
    Task<IEnumerable<TeacherSubjectDetail>> GetAllAsync();
    Task<IEnumerable<TeacherSubjectDetail>> GetBySchoolIdAsync(Guid schoolId);
    Task<TeacherSubjectDetail> CreateAsync(TeacherSubjectDetail entity);
    Task<TeacherSubjectDetail?> UpdateAsync(TeacherSubjectDetail entity);
    Task<bool> DeleteAsync(Guid id);
}

// Request DTOs
public class ClassRequest
{
    public string? Name { get; set; }
    public string? ExamAssessment { get; set; }
    public bool? IsGradePointApplicable { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class SectionRequest
{
    public string? Name { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class ClassRoomRequest
{
    public string? Name { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CompanyId { get; set; }
}

public class ClassSectionDetailRequest
{
    public Guid ClassMasterId { get; set; }
    public Guid SectionMasterId { get; set; }
    public Guid LocationId { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class SubjectRequest
{
    public string? SubjectName { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool? IsScholastic { get; set; }
    public int? PeriodsPerWeek { get; set; }
}

public class ClassSubjectDetailRequest
{
    public Guid ClassMasterId { get; set; }
    public Guid SubjectId { get; set; }
    public int? PeriodsPerWeek { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public Guid? CreatedBy { get; set; }
    public Guid? ModifiedBy { get; set; }
}

// Teacher Section Detail Service
public interface ITeacherSectionDetailService
{
    Task<TeacherSectionDetailResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<TeacherSectionDetailResponse>> GetAllAsync();
    Task<TeacherSectionDetailResponse> CreateAsync(TeacherSectionDetailRequest request);
    Task<TeacherSectionDetailResponse?> UpdateAsync(Guid id, TeacherSectionDetailRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class TeacherSectionDetailRequest
{
    public Guid TeacherId { get; set; }
    public Guid ClassId { get; set; }
    public Guid SectionId { get; set; }
    public Guid SubjectId { get; set; }
    public bool IsClassTeacher { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CompanyId { get; set; }
    public Guid? CreatedBy { get; set; }
    public Guid? ModifiedBy { get; set; }
}

// Response DTOs
public class ClassResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? ExamAssessment { get; set; }
    public bool? IsGradePointApplicable { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class SectionResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class ClassRoomResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CompanyId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class ClassSectionDetailResponse
{
    public Guid Id { get; set; }
    public Guid ClassMasterId { get; set; }
    public Guid SectionMasterId { get; set; }
    public Guid LocationId { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class SubjectResponse
{
    public Guid Id { get; set; }
    public string? SubjectName { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool? IsScholastic { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
    public int? PeriodsPerWeek { get; set; }
}

public class ClassSubjectDetailResponse
{
    public Guid Id { get; set; }
    public Guid ClassMasterId { get; set; }
    public Guid SubjectId { get; set; }
    public int? PeriodsPerWeek { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class TeacherSectionDetailResponse
{
    public Guid Id { get; set; }
    public Guid TeacherId { get; set; }
    public Guid ClassId { get; set; }
    public Guid SectionId { get; set; }
    public Guid SubjectId { get; set; }
    public bool IsClassTeacher { get; set; }
    public Guid SchoolId { get; set; }
    public Guid CompanyId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
    
    // Name properties for display
    public string? TeacherName { get; set; }
    public string? ClassName { get; set; }
    public string? SectionName { get; set; }
    public string? SubjectName { get; set; }
}

// Department Service
public interface IDeptService
{
    Task<DeptResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<DeptResponse>> GetAllAsync();
    Task<DeptResponse> CreateAsync(DeptRequest request);
    Task<DeptResponse?> UpdateAsync(Guid id, DeptRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Designation Service
public interface IDesigService
{
    Task<DesigResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<DesigResponse>> GetAllAsync();
    Task<IEnumerable<DesigResponse>> GetByDepartmentIdAsync(Guid departmentId);
    Task<DesigResponse> CreateAsync(DesigRequest request);
    Task<DesigResponse?> UpdateAsync(Guid id, DesigRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Employee Category Service
public interface IEmpCategoryService
{
    Task<EmpCategoryResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmpCategoryResponse>> GetAllAsync();
    Task<EmpCategoryResponse> CreateAsync(EmpCategoryRequest request);
    Task<EmpCategoryResponse?> UpdateAsync(Guid id, EmpCategoryRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Employee Type Service
public interface IEmpTypeService
{
    Task<EmpTypeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<EmpTypeResponse>> GetAllAsync();
    Task<EmpTypeResponse> CreateAsync(EmpTypeRequest request);
    Task<EmpTypeResponse?> UpdateAsync(Guid id, EmpTypeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Request DTOs for Master Entities
public class DeptRequest
{
    public string? DeptCode { get; set; }
    public string? DeptName { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class DesigRequest
{
    public string? Code { get; set; }
    public string? Name { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class EmpCategoryRequest
{
    public string? CategoryName { get; set; }
    public string? CategoryDescription { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class EmpTypeRequest
{
    public string? TypeName { get; set; }
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

// Response DTOs for Master Entities
public class DeptResponse
{
    public Guid Id { get; set; }
    public string? DeptCode { get; set; }
    public string? DeptName { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class DesigResponse
{
    public Guid Id { get; set; }
    public string? Code { get; set; }
    public string? Name { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class EmpCategoryResponse
{
    public Guid Id { get; set; }
    public string? CategoryName { get; set; }
    public string? CategoryDescription { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class EmpTypeResponse
{
    public Guid Id { get; set; }
    public string? TypeName { get; set; }
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

// BloodGroup Service
public interface IBloodGroupService
{
    Task<BloodGroupResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<BloodGroupResponse>> GetAllAsync();
    Task<BloodGroupResponse> CreateAsync(BloodGroupRequest request);
    Task<BloodGroupResponse?> UpdateAsync(Guid id, BloodGroupRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Category Service
public interface ICategoryService
{
    Task<CategoryResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<CategoryResponse>> GetAllAsync();
    Task<CategoryResponse> CreateAsync(CategoryRequest request);
    Task<CategoryResponse?> UpdateAsync(Guid id, CategoryRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// FeesCategory Service
public interface IFeesCategoryService
{
    Task<FeesCategoryResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<FeesCategoryResponse>> GetAllAsync();
    Task<FeesCategoryResponse> CreateAsync(FeesCategoryRequest request);
    Task<FeesCategoryResponse?> UpdateAsync(Guid id, FeesCategoryRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// FeesDiscountCategory Service
public interface IFeesDiscountCategoryService
{
    Task<FeesDiscountCategoryResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<FeesDiscountCategoryResponse>> GetAllAsync();
    Task<FeesDiscountCategoryResponse> CreateAsync(FeesDiscountCategoryRequest request);
    Task<FeesDiscountCategoryResponse?> UpdateAsync(Guid id, FeesDiscountCategoryRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Gender Service
public interface IGenderService
{
    Task<GenderResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<GenderResponse>> GetAllAsync();
    Task<GenderResponse> CreateAsync(GenderRequest request);
    Task<GenderResponse?> UpdateAsync(Guid id, GenderRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Grade Service
public interface IGradeService
{
    Task<GradeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<GradeResponse>> GetAllAsync();
    Task<GradeResponse> CreateAsync(GradeRequest request);
    Task<GradeResponse?> UpdateAsync(Guid id, GradeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Request DTOs for Master Entities
public class BloodGroupRequest
{
    public string Name { get; set; } = null!;
}

public class CategoryRequest
{
    public string? Name { get; set; }
}

public class FeesCategoryRequest
{
    public string? FeesCatgoryName { get; set; }
    public string? Description { get; set; }
}

public class FeesDiscountCategoryRequest
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public Guid FeeCategoryId { get; set; }
    public bool? IsPercentAge { get; set; }
    public decimal? Amount { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class GenderRequest
{
    public string? Gender { get; set; }
}

public class GradeRequest
{
    public string? GradeName { get; set; }
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

// Response DTOs for Master Entities
public class BloodGroupResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class CategoryResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class FeesCategoryResponse
{
    public Guid Id { get; set; }
    public string? FeesCatgoryName { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string Status { get; set; } = null!;
    public string? StatusMessage { get; set; }
}

public class FeesDiscountCategoryResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public Guid FeeCategoryId { get; set; }
    public bool? IsPercentAge { get; set; }
    public decimal? Amount { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string Status { get; set; } = null!;
    public string? StatusMessage { get; set; }
}

public class GenderResponse
{
    public Guid Id { get; set; }
    public string? Gender { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class GradeResponse
{
    public Guid Id { get; set; }
    public string? GradeName { get; set; }
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

// Holiday Service
public interface IHolidayService
{
    Task<HolidayResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<HolidayResponse>> GetAllAsync();
    Task<HolidayResponse> CreateAsync(HolidayRequest request);
    Task<HolidayResponse?> UpdateAsync(Guid id, HolidayRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// HolidayType Service
public interface IHolidayTypeService
{
    Task<HolidayTypeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<HolidayTypeResponse>> GetAllAsync();
    Task<HolidayTypeResponse> CreateAsync(HolidayTypeRequest request);
    Task<HolidayTypeResponse?> UpdateAsync(Guid id, HolidayTypeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// House Service
public interface IHouseService
{
    Task<HouseResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<HouseResponse>> GetAllAsync();
    Task<HouseResponse> CreateAsync(HouseRequest request);
    Task<HouseResponse?> UpdateAsync(Guid id, HouseRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// LeaveType Service
public interface ILeaveTypeService
{
    Task<LeaveTypeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<LeaveTypeResponse>> GetAllAsync();
    Task<LeaveTypeResponse> CreateAsync(LeaveTypeRequest request);
    Task<LeaveTypeResponse?> UpdateAsync(Guid id, LeaveTypeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// PaymentMode Service
public interface IPaymentModeService
{
    Task<PaymentModeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<PaymentModeResponse>> GetAllAsync();
    Task<PaymentModeResponse> CreateAsync(PaymentModeRequest request);
    Task<PaymentModeResponse?> UpdateAsync(Guid id, PaymentModeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Qualification Service
public interface IQualificationService
{
    Task<QualificationResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<QualificationResponse>> GetAllAsync();
    Task<QualificationResponse> CreateAsync(QualificationRequest request);
    Task<QualificationResponse?> UpdateAsync(Guid id, QualificationRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Profession Service
public interface IProfessionService
{
    Task<ProfessionResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<ProfessionResponse>> GetAllAsync();
    Task<ProfessionResponse> CreateAsync(ProfessionRequest request);
    Task<ProfessionResponse?> UpdateAsync(Guid id, ProfessionRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Request DTOs for Master Entities
public class HolidayRequest
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public Guid TypeId { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public Guid Year { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool? IsStaffApplicable { get; set; }
    public Guid SessionId { get; set; }
}

public class HolidayTypeRequest
{
    public string? HolidayTypeName { get; set; }
    public string? HolidayTypeDescription { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class HouseRequest
{
    public string? House { get; set; }
    public Guid? SchoolId { get; set; }
    public Guid? CompanyId { get; set; }
}

public class LeaveTypeRequest
{
    public string? Code { get; set; }
    public string? Description { get; set; }
    public Guid? ApplicableGender { get; set; }
    public bool IsSpecialLeave { get; set; }
    public bool IsEncashable { get; set; }
    public bool IsCarryForward { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class PaymentModeRequest
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class QualificationRequest
{
    public string? QualificationName { get; set; }
    public bool IsTeachingQualification { get; set; }
}

public class ProfessionRequest
{
    public string? Name { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

// Response DTOs for Master Entities
public class HolidayResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public Guid TypeId { get; set; }
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public Guid Year { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool? IsStaffApplicable { get; set; }
    public Guid SessionId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class HolidayTypeResponse
{
    public Guid Id { get; set; }
    public string? HolidayTypeName { get; set; }
    public string? HolidayTypeDescription { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class HouseResponse
{
    public Guid Id { get; set; }
    public string? House { get; set; }
    public bool? IsActive { get; set; }
    public DateTime? CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public Guid? SchoolId { get; set; }
    public Guid? CompanyId { get; set; }
    public string Status { get; set; } = null!;
    public string? StatusMessage { get; set; }
}

public class LeaveTypeResponse
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
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class PaymentModeResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class QualificationResponse
{
    public Guid Id { get; set; }
    public string? QualificationName { get; set; }
    public bool IsTeachingQualification { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class ProfessionResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

// RelationType Service
public interface IRelationTypeService
{
    Task<RelationTypeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<RelationTypeResponse>> GetAllAsync();
    Task<RelationTypeResponse> CreateAsync(RelationTypeRequest request);
    Task<RelationTypeResponse?> UpdateAsync(Guid id, RelationTypeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Religion Service
public interface IReligionService
{
    Task<ReligionResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<ReligionResponse>> GetAllAsync();
    Task<ReligionResponse> CreateAsync(ReligionRequest request);
    Task<ReligionResponse?> UpdateAsync(Guid id, ReligionRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Role Service
public interface IRoleService
{
    Task<RoleResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<RoleResponse>> GetAllAsync();
    Task<IEnumerable<RoleResponse>> GetByCompanyAndSchoolAsync(Guid companyId, Guid schoolId);
    Task<RoleResponse> CreateAsync(RoleRequest request);
    Task<RoleResponse?> UpdateAsync(Guid id, RoleRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// SalaryHead Service
public interface ISalaryHeadService
{
    Task<SalaryHeadResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<SalaryHeadResponse>> GetAllAsync();
    Task<SalaryHeadResponse> CreateAsync(SalaryHeadRequest request);
    Task<SalaryHeadResponse?> UpdateAsync(Guid id, SalaryHeadRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// SalaryType Service
public interface ISalaryTypeService
{
    Task<SalaryTypeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<SalaryTypeResponse>> GetAllAsync();
    Task<SalaryTypeResponse> CreateAsync(SalaryTypeRequest request);
    Task<SalaryTypeResponse?> UpdateAsync(Guid id, SalaryTypeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Session Service
public interface ISessionService
{
    Task<SessionResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<SessionResponse>> GetAllAsync();
    Task<SessionResponse> CreateAsync(SessionRequest request);
    Task<SessionResponse?> UpdateAsync(Guid id, SessionRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Vehicle Service
public interface IVehicleService
{
    Task<VehicleResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<VehicleResponse>> GetAllAsync();
    Task<VehicleResponse> CreateAsync(VehicleRequest request);
    Task<VehicleResponse?> UpdateAsync(Guid id, VehicleRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// VehicleType Service
public interface IVehicleTypeService
{
    Task<VehicleTypeResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<VehicleTypeResponse>> GetAllAsync();
    Task<VehicleTypeResponse> CreateAsync(VehicleTypeRequest request);
    Task<VehicleTypeResponse?> UpdateAsync(Guid id, VehicleTypeRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Visitor Service
public interface IVisitorService
{
    Task<VisitorResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<VisitorResponse>> GetAllAsync();
    Task<VisitorResponse> CreateAsync(VisitorRequest request);
    Task<VisitorResponse?> UpdateAsync(Guid id, VisitorRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// Request DTOs for Master Entities
public class RelationTypeRequest
{
    public string? Name { get; set; }
}

public class ReligionRequest
{
    public string? ReligionName { get; set; }
}

public class RoleRequest
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public Guid? CreatedBy { get; set; }
    public Guid? ModifiedBy { get; set; }
}

public class SalaryHeadRequest
{
    public string? Code { get; set; }
    public string? Description { get; set; }
    public bool? IsReadOnly { get; set; }
    public Guid SalaryTypeId { get; set; }
    public bool IsDeduction { get; set; }
    public Guid? SchoolId { get; set; }
    public Guid? CompanyId { get; set; }
}

public class SalaryTypeRequest
{
    public string? Name { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class SessionRequest
{
    public string? Value { get; set; }
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class VehicleRequest
{
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
}

public class VehicleTypeRequest
{
    public string VehicleType { get; set; } = null!;
    public Guid? CompanyId { get; set; }
    public Guid? SchoolId { get; set; }
}

public class VisitorRequest
{
    public string? VehicleNumber { get; set; }
    public string? VehicleName { get; set; }
    public DateTime DateOfEntry { get; set; }
    public TimeOnly ArrivalTime { get; set; }
    public TimeOnly ExitTime { get; set; }
    public string? Purpose { get; set; }
    public string? ContactPerson { get; set; }
    public string? Address1 { get; set; }
    public string? Address2 { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public Guid? CompanyId { get; set; }
    public Guid? SchoolId { get; set; }
}

// Response DTOs for Master Entities
public class RelationTypeResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class ReligionResponse
{
    public Guid Id { get; set; }
    public string? ReligionName { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class RoleResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class SalaryHeadResponse
{
    public Guid Id { get; set; }
    public string? Code { get; set; }
    public string? Description { get; set; }
    public bool? IsReadOnly { get; set; }
    public Guid SalaryTypeId { get; set; }
    public bool IsDeduction { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string Status { get; set; } = null!;
    public string? StatusMessage { get; set; }
    public Guid? SchoolId { get; set; }
    public Guid? CompanyId { get; set; }
}

public class SalaryTypeResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class SessionResponse
{
    public Guid Id { get; set; }
    public string? Value { get; set; }
    public string? Description { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class VehicleResponse
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
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class VehicleTypeResponse
{
    public Guid Id { get; set; }
    public string VehicleType { get; set; } = null!;
    public Guid? CompanyId { get; set; }
    public Guid? SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class VisitorResponse
{
    public Guid Id { get; set; }
    public string? VehicleNumber { get; set; }
    public string? VehicleName { get; set; }
    public DateTime DateOfEntry { get; set; }
    public TimeOnly ArrivalTime { get; set; }
    public TimeOnly ExitTime { get; set; }
    public string? Purpose { get; set; }
    public string? ContactPerson { get; set; }
    public string? Address1 { get; set; }
    public string? Address2 { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public Guid? CompanyId { get; set; }
    public Guid? SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

// Enquiry Service
public interface IEnquiryService
{
    Task<EnquiryResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<EnquiryResponse>> GetAllAsync();
    Task<EnquiryResponse> CreateAsync(EnquiryRequest request);
    Task<EnquiryResponse?> UpdateAsync(Guid id, EnquiryRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class EnquiryRequest
{
    public string? EnquirerName { get; set; }
    public string? ContactNumber { get; set; }
    public string? EmailAddress { get; set; }
    public string? EnquiryType { get; set; }
    public string? Subject { get; set; }
    public string? Message { get; set; }
    public string Priority { get; set; } = "Medium";
    public Guid? CompanyId { get; set; }
    public Guid? SchoolId { get; set; }
}

public class EnquiryResponse
{
    public Guid Id { get; set; }
    public string? EnquirerName { get; set; }
    public string? ContactNumber { get; set; }
    public string? EmailAddress { get; set; }
    public string? EnquiryType { get; set; }
    public string? Subject { get; set; }
    public string? Message { get; set; }
    public string Priority { get; set; } = "Medium";
    public string Status { get; set; } = "Pending";
    public string? StatusMessage { get; set; }
    public DateTime EnquiryDate { get; set; }
    public string? ResponseMessage { get; set; }
    public string? ResponseType { get; set; }
    public DateTime? ResponseDate { get; set; }
    public Guid? CompanyId { get; set; }
    public Guid? SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
}

// Student Service
public interface IStudentService
{
    Task<StudentResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<StudentResponse>> GetAllAsync();
    Task<IEnumerable<StudentResponse>> GetMinimalAsync();
    Task<PagedResponse<StudentResponse>> GetPagedAsync(int page, int pageSize);
    Task<PagedResponse<StudentResponse>> SearchAsync(string query, int page, int pageSize);
    Task<StudentResponse> CreateAsync(StudentRequest request);
    Task<StudentResponse?> UpdateAsync(Guid id, StudentRequest request);
    Task<bool> DeleteAsync(Guid id);
}

// ============================================================
// AssesmentMaster
// ============================================================

public interface IAssesmentMasterRepository
{
    Task<SchoolDemo.Domain.Entities.AssesmentMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.AssesmentMaster>> GetAllAsync();
    Task<SchoolDemo.Domain.Entities.AssesmentMaster> AddAsync(SchoolDemo.Domain.Entities.AssesmentMaster entity);
    Task<SchoolDemo.Domain.Entities.AssesmentMaster> UpdateAsync(SchoolDemo.Domain.Entities.AssesmentMaster entity);
    Task DeleteAsync(Guid id);
}

public interface IAssesmentMasterService
{
    Task<AssesmentMasterResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<AssesmentMasterResponse>> GetAllAsync();
    Task<AssesmentMasterResponse> CreateAsync(AssesmentMasterRequest request);
    Task<AssesmentMasterResponse?> UpdateAsync(Guid id, AssesmentMasterRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class AssesmentMasterRequest
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public decimal? PercentageWeightage { get; set; }
    public DateTime? FromPeriod { get; set; }
    public DateTime? ToPeriod { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
}

public class AssesmentMasterResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public decimal? PercentageWeightage { get; set; }
    public DateTime? FromPeriod { get; set; }
    public DateTime? ToPeriod { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}

public class StudentRequest
{
    public Guid RollNumber { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Address { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public string? ContactNumber { get; set; }
    public string? EmergencyContactNumber { get; set; }
    public DateTime Dob { get; set; }
    public DateTime Doj { get; set; }
    public string RegistrationNumber { get; set; } = string.Empty;
    public Guid ClassId { get; set; }
    public Guid SectionId { get; set; }
    public bool? AvailTransport { get; set; }
    public string? Image { get; set; }
    public string? Email { get; set; }
    public Guid CategoryId { get; set; }
    public bool? SiblingsIfAny { get; set; }
    public Guid? SiblingClassId { get; set; }
    public Guid? Gender { get; set; }
    public string? DisabilityAny { get; set; }
    public string? MedicalAlleryAny { get; set; }
    public Guid BirthCityId { get; set; }
    public Guid BirthStateId { get; set; }
    public Guid BirthCountryId { get; set; }
    public string? PreviousSchoolAttended { get; set; }
    public Guid? PreviousSchoolClassId { get; set; }
    public decimal? PreviousSchoolPercentage { get; set; }
    public string? PreviousSchoolRank { get; set; }
    public Guid PreviousSchoolBoardId { get; set; }
    public DateTime? PreviousSchoolFromDate { get; set; }
    public DateTime? PreviousSchoolToDate { get; set; }
    public DateTime? WithdrawnDate { get; set; }
    public string? WithdrawnReason { get; set; }
    public Guid BloodGroupId { get; set; }
    public Guid Nationality { get; set; }
    public string? Hobbies { get; set; }
    public Guid ReligionId { get; set; }
    public string? Phone { get; set; }
    public Guid? RouteId { get; set; }
    public Guid? RouteStopDetailsId { get; set; }
    public Guid? ClassTeacherId { get; set; }
    public bool? RoutePickAndDrop { get; set; }
    public Guid? FeesDiscountCategoryMasterId { get; set; }
    public string? FathersName { get; set; }
    public decimal? TutionFees { get; set; }
    public decimal? AnnualFees { get; set; }
    public decimal? TransportFees { get; set; }
    public bool? UseTransportFees { get; set; }
    public Guid? SessionId { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public Guid? HouseAllotted { get; set; }
    public string? AdditionalNotes { get; set; }
}

public class StudentResponse
{
    public Guid Id { get; set; }
    public Guid RollNumber { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Address { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public string? ContactNumber { get; set; }
    public string? EmergencyContactNumber { get; set; }
    public DateTime Dob { get; set; }
    public DateTime Doj { get; set; }
    public string RegistrationNumber { get; set; } = string.Empty;
    public Guid ClassId { get; set; }
    public Guid SectionId { get; set; }
    public bool? AvailTransport { get; set; }
    public string? Image { get; set; }
    public string? Email { get; set; }
    public Guid CategoryId { get; set; }
    public bool? SiblingsIfAny { get; set; }
    public Guid? SiblingClassId { get; set; }
    public Guid? Gender { get; set; }
    public string? DisabilityAny { get; set; }
    public string? MedicalAlleryAny { get; set; }
    public Guid BirthCityId { get; set; }
    public Guid BirthStateId { get; set; }
    public Guid BirthCountryId { get; set; }
    public string? PreviousSchoolAttended { get; set; }
    public Guid? PreviousSchoolClassId { get; set; }
    public decimal? PreviousSchoolPercentage { get; set; }
    public string? PreviousSchoolRank { get; set; }
    public Guid PreviousSchoolBoardId { get; set; }
    public DateTime? PreviousSchoolFromDate { get; set; }
    public DateTime? PreviousSchoolToDate { get; set; }
    public DateTime? WithdrawnDate { get; set; }
    public string? WithdrawnReason { get; set; }
    public Guid BloodGroupId { get; set; }
    public Guid Nationality { get; set; }
    public string? Hobbies { get; set; }
    public Guid ReligionId { get; set; }
    public string? Phone { get; set; }
    public Guid? RouteId { get; set; }
    public Guid? RouteStopDetailsId { get; set; }
    public Guid? ClassTeacherId { get; set; }
    public bool? RoutePickAndDrop { get; set; }
    public Guid? FeesDiscountCategoryMasterId { get; set; }
    public decimal? TutionFees { get; set; }
    public decimal? AnnualFees { get; set; }
    public decimal? TransportFees { get; set; }
    public bool? UseTransportFees { get; set; }
    public Guid? SessionId { get; set; }
    public Guid CompanyId { get; set; }
    public Guid SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
    public Guid? HouseAllotted { get; set; }
    public string? AdditionalNotes { get; set; }
    public string? FathersName { get; set; }
}

// Vendor Service
public interface IVendorService
{
    Task<VendorResponse?> GetByIdAsync(Guid id);
    Task<IEnumerable<VendorResponse>> GetAllAsync();
    Task<VendorResponse> CreateAsync(VendorRequest request);
    Task<VendorResponse?> UpdateAsync(Guid id, VendorRequest request);
    Task<bool> DeleteAsync(Guid id);
}

public class VendorRequest
{
    public string? VendorName { get; set; }
    public string? Description { get; set; }
    public string? Address1 { get; set; }
    public string? Address2 { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public string? ContactNumber { get; set; }
    public string? MobileNumber { get; set; }
    public string? EmailId { get; set; }
    public Guid? CompanyId { get; set; }
    public Guid? SchoolId { get; set; }
    public Guid? CreatedBy { get; set; }
    public Guid? ModifiedBy { get; set; }
}

public class VendorResponse
{
    public Guid Id { get; set; }
    public string? VendorName { get; set; }
    public string? Description { get; set; }
    public string? Address1 { get; set; }
    public string? Address2 { get; set; }
    public Guid CityId { get; set; }
    public Guid StateId { get; set; }
    public Guid CountryId { get; set; }
    public string? ZipCode { get; set; }
    public string? ContactNumber { get; set; }
    public string? MobileNumber { get; set; }
    public string? EmailId { get; set; }
    public Guid? CompanyId { get; set; }
    public Guid? SchoolId { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? Status { get; set; }
    public string? StatusMessage { get; set; }
}
