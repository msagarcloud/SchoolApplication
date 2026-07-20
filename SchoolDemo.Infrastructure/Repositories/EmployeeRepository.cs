using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using UserDetail = SchoolDemo.Infrastructure.Data.UserDetail;

namespace SchoolDemo.Infrastructure.Repositories;

public class EmployeeRepository : IEmployeeRepository
{
	private readonly SchoolDbContext _context;

	public EmployeeRepository(SchoolDbContext context)
	{
		_context = context;
	}

	public async Task<Employee?> GetByIdAsync(Guid id)
	{
		var empDetail = await _context.EmpMasters
			.FirstOrDefaultAsync(e => e.Id == id && !e.IsDeleted);
		
		return MapToDomainEntity(empDetail);
	}

	public async Task<IEnumerable<Employee>> GetAllAsync()
	{
		var empDetails = await _context.EmpMasters
			.Where(e => !e.IsDeleted)
			.ToListAsync();
		
		return empDetails.Select(MapToDomainEntity).Where(e => e != null)!;
	}

	public async Task<Employee> AddAsync(Employee employee)
	{
		var empDetail = MapToInfrastructureEntity(employee);
		await _context.EmpMasters.AddAsync(empDetail);
		await _context.SaveChangesAsync();
		return MapToDomainEntity(empDetail)!;
	}

    public async Task<Employee> UpdateAsync(Employee employee)
    {
        var empDetail = MapToInfrastructureEntity(employee);

        // Detach any existing tracked entity with the same key to avoid EF Core tracking conflict
        var tracked = _context.EmpMasters.Local.FirstOrDefault(e => e.Id == empDetail.Id);
        if (tracked != null)
        {
            _context.Entry(tracked).State = EntityState.Detached;
        }

        _context.EmpMasters.Update(empDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(empDetail)!;
    }

	public async Task DeleteAsync(Guid id)
	{
		var empDetail = await _context.EmpMasters
			.FirstOrDefaultAsync(e => e.Id == id);
		
		if (empDetail != null)
		{
			empDetail.IsDeleted = true;
			empDetail.ModifiedDate = DateTime.UtcNow;
			await _context.SaveChangesAsync();
		}
	}

	public Microsoft.EntityFrameworkCore.DbContext GetContext()
	{
		return _context;
	}

	private static Employee? MapToDomainEntity(EmpMaster? empDetail)
	{
		if (empDetail == null) return null;

		return new Employee
		{
			Id = empDetail.Id,
			FirstName = empDetail.FirstName,
			LastName = empDetail.LastName,
			Dob = empDetail.Dob,
			Doj = empDetail.Doj,
			ProbationStartDate = empDetail.ProbationStartDate,
			ProbationPeriod = empDetail.ProbationPeriod,
			ConfirmationDate = empDetail.ConfirmationDate,
			Pannumber = empDetail.Pannumber,
			Esicnumber = empDetail.Esicnumber,
			Pfnumeber = empDetail.Pfnumeber,
			CurrentAddress1 = empDetail.CurrentAddress1,
			CurrentAddress2 = empDetail.CurrentAddress2,
			CurrentCityId = empDetail.CurrentCityId,
			CurrentStateId = empDetail.CurrentStateId,
			CurrentCountryId = empDetail.CurrentCountryId,
			CurrentZipCode = empDetail.CurrentZipCode,
			PermanentAddress1 = empDetail.PermanentAddress1,
			PermanentAddress2 = empDetail.PermanentAddress2,
			PermanentCityId = empDetail.PermanentCityId,
			PermanentStateId = empDetail.PermanentStateId,
			PermanentCountryId = empDetail.PermanentCountryId,
			PermanentZipCode = empDetail.PermanentZipCode,
			PhoneNumber = empDetail.PhoneNumber,
			MobileNumber = empDetail.MobileNumber,
			EmailId = empDetail.EmailId,
			DepartmentId = empDetail.DepartmentId,
			DesignationId = empDetail.DesignationId,
			PaymentModeId = empDetail.PaymentModeId,
			EmployeeTypeId = empDetail.EmployeeTypeId,
			CategoryId = empDetail.CategoryId,
			BankAccountNumber = empDetail.BankAccountNumber,
			BankName = empDetail.BankName,
			GenderId = empDetail.GenderId,
			BloodGroupId = empDetail.BloodGroupId,
			GradeId = empDetail.GradeId,
			Image = empDetail.Image,
			EmployeeOldId = empDetail.EmployeeOldId,
			FathersName = empDetail.FathersName,
			MothersName = empDetail.MothersName,
			Description = empDetail.Description,
			LicenceNumber = empDetail.LicenceNumber,
			LicenceIssueDate = empDetail.LicenceIssueDate,
			LicenceValidUpto = empDetail.LicenceValidUpto,
			LicenceDescription = empDetail.LicenceDescription,
			LicenceImage = empDetail.LicenceImage,
			LicenceType = empDetail.LicenceType,
			Salutation = empDetail.Salutation,
			DateOfLeaving = empDetail.DateOfLeaving,
			MaritalStatus = empDetail.MaritalStatus,
			YearsOfExperience = empDetail.YearsOfExperience,
			PrevioudSchoolCompany = empDetail.PrevioudSchoolCompany,
			AadhaarNumber = empDetail.AadhaarNumber,
			MathUpToClass = empDetail.MathUpToClass,
			EnglishUptoClass = empDetail.EnglishUptoClass,
			SstuptoClass = empDetail.SstuptoClass,
			CompanyId = empDetail.CompanyId,
			SchoolId = empDetail.SchoolId,
			IsActive = empDetail.IsActive,
			IsDeleted = empDetail.IsDeleted,
			CreatedBy = empDetail.CreatedBy,
			CreatedDate = empDetail.CreatedDate,
			ModifiedBy = empDetail.ModifiedBy,
			ModifiedDate = empDetail.ModifiedDate,
			Status = empDetail.Status,
			StatusMessage = empDetail.StatusMessage
		};
	}

	private static EmpMaster MapToInfrastructureEntity(Employee employee)
	{
		return new EmpMaster
		{
			Id = employee.Id,
			FirstName = employee.FirstName,
			LastName = employee.LastName,
			Dob = employee.Dob,
			Doj = employee.Doj,
			ProbationStartDate = employee.ProbationStartDate,
			ProbationPeriod = employee.ProbationPeriod,
			ConfirmationDate = employee.ConfirmationDate,
			Pannumber = employee.Pannumber,
			Esicnumber = employee.Esicnumber,
			Pfnumeber = employee.Pfnumeber,
			CurrentAddress1 = employee.CurrentAddress1,
			CurrentAddress2 = employee.CurrentAddress2,
			CurrentCityId = employee.CurrentCityId,
			CurrentStateId = employee.CurrentStateId,
			CurrentCountryId = employee.CurrentCountryId,
			CurrentZipCode = employee.CurrentZipCode,
			PermanentAddress1 = employee.PermanentAddress1,
			PermanentAddress2 = employee.PermanentAddress2,
			PermanentCityId = employee.PermanentCityId,
			PermanentStateId = employee.PermanentStateId,
			PermanentCountryId = employee.PermanentCountryId,
			PermanentZipCode = employee.PermanentZipCode,
			PhoneNumber = employee.PhoneNumber,
			MobileNumber = employee.MobileNumber,
			EmailId = employee.EmailId,
			DepartmentId = employee.DepartmentId,
			DesignationId = employee.DesignationId,
			PaymentModeId = employee.PaymentModeId,
			EmployeeTypeId = employee.EmployeeTypeId,
			CategoryId = employee.CategoryId,
			BankAccountNumber = employee.BankAccountNumber,
			BankName = employee.BankName,
			GenderId = employee.GenderId,
			BloodGroupId = employee.BloodGroupId,
			GradeId = employee.GradeId,
			Image = employee.Image,
			EmployeeOldId = employee.EmployeeOldId,
			FathersName = employee.FathersName,
			MothersName = employee.MothersName,
			Description = employee.Description,
			LicenceNumber = employee.LicenceNumber,
			LicenceIssueDate = employee.LicenceIssueDate,
			LicenceValidUpto = employee.LicenceValidUpto,
			LicenceDescription = employee.LicenceDescription,
			LicenceImage = employee.LicenceImage,
			LicenceType = employee.LicenceType,
			Salutation = employee.Salutation,
			DateOfLeaving = employee.DateOfLeaving,
			MaritalStatus = employee.MaritalStatus,
			YearsOfExperience = employee.YearsOfExperience,
			PrevioudSchoolCompany = employee.PrevioudSchoolCompany,
			AadhaarNumber = employee.AadhaarNumber,
			MathUpToClass = employee.MathUpToClass,
			EnglishUptoClass = employee.EnglishUptoClass,
			SstuptoClass = employee.SstuptoClass,
			CompanyId = employee.CompanyId,
			SchoolId = employee.SchoolId,
			IsActive = employee.IsActive,
			IsDeleted = employee.IsDeleted,
			CreatedBy = employee.CreatedBy,
			CreatedDate = employee.CreatedDate,
			ModifiedBy = employee.ModifiedBy,
			ModifiedDate = employee.ModifiedDate,
			Status = employee.Status,
			StatusMessage = employee.StatusMessage
		};
	}
}
