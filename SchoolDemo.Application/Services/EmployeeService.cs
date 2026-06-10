using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SchoolDemo.Application.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _employeeRepository;
    private readonly IUserRepository _userRepository;
    private readonly IDriverMasterRepository _driverMasterRepository;
    private readonly ICleanerMasterRepository _cleanerMasterRepository;
    private readonly IEmpCategoryRepository _empCategoryRepository;
    private readonly IDesigRepository _desigRepository;

    public EmployeeService(IEmployeeRepository employeeRepository, IUserRepository userRepository, 
        IDriverMasterRepository driverMasterRepository, ICleanerMasterRepository cleanerMasterRepository,
        IEmpCategoryRepository empCategoryRepository, IDesigRepository desigRepository)
    {
        _employeeRepository = employeeRepository;
        _userRepository = userRepository;
        _driverMasterRepository = driverMasterRepository;
        _cleanerMasterRepository = cleanerMasterRepository;
        _empCategoryRepository = empCategoryRepository;
        _desigRepository = desigRepository;
    }

    public async Task<EmployeeResponse?> GetByIdAsync(Guid id)
    {
        var employee = await _employeeRepository.GetByIdAsync(id);
        return employee == null ? null : await MapToResponse(employee);
    }

    public async Task<IEnumerable<EmployeeResponse>> GetAllAsync()
    {
        var employees = await _employeeRepository.GetAllAsync();
        var responseList = new List<EmployeeResponse>();
        foreach (var employee in employees)
        {
            responseList.Add(await MapToResponse(employee));
        }
        return responseList;
    }

    public async Task<EmployeeResponse> CreateAsync(EmployeeRequest request)
    {
        var employee = new Employee
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Dob = request.Dob,
            Doj = request.Doj,
            ProbationStartDate = request.ProbationStartDate,
            ProbationPeriod = request.ProbationPeriod,
            ConfirmationDate = request.ConfirmationDate,
            Pannumber = request.Pannumber,
            Esicnumber = request.Esicnumber,
            Pfnumeber = request.Pfnumeber,
            CurrentAddress1 = request.CurrentAddress1,
            CurrentAddress2 = request.CurrentAddress2,
            CurrentCityId = request.CurrentCityId,
            CurrentStateId = request.CurrentStateId,
            CurrentCountryId = request.CurrentCountryId,
            CurrentZipCode = request.CurrentZipCode,
            PermanentAddress1 = request.PermanentAddress1,
            PermanentAddress2 = request.PermanentAddress2,
            PermanentCityId = request.PermanentCityId,
            PermanentStateId = request.PermanentStateId,
            PermanentCountryId = request.PermanentCountryId,
            PermanentZipCode = request.PermanentZipCode,
            PhoneNumber = request.PhoneNumber,
            MobileNumber = request.MobileNumber,
            EmailId = request.EmailId,
            DepartmentId = request.DepartmentId,
            DesignationId = request.DesignationId,
            PaymentModeId = request.PaymentModeId,
            EmployeeTypeId = request.EmployeeTypeId,
            CategoryId = request.CategoryId,
            BankAccountNumber = request.BankAccountNumber,
            BankName = request.BankName,
            GenderId = request.GenderId,
            BloodGroupId = request.BloodGroupId,
            GradeId = request.GradeId,
            Image = request.Image,
            EmployeeOldId = request.EmployeeOldId,
            EmployeeCode = request.EmployeeCode,
            FathersName = request.FathersName,
            MothersName = request.MothersName,
            Description = request.Description,
            LicenceNumber = request.LicenceNumber,
            LicenceIssueDate = request.LicenceIssueDate,
            LicenceValidUpto = request.LicenceValidUpto,
            LicenceDescription = request.LicenceDescription,
            LicenceImage = request.LicenceImage,
            LicenceType = request.LicenceType,
            Salutation = request.Salutation,
            DateOfLeaving = request.DateOfLeaving,
            MaritalStatus = request.MaritalStatus,
            YearsOfExperience = request.YearsOfExperience,
            PrevioudSchoolCompany = request.PrevioudSchoolCompany,
            AadhaarNumber = request.AadhaarNumber,
            MathUpToClass = request.MathUpToClass,
            EnglishUptoClass = request.EnglishUptoClass,
            SstuptoClass = request.SstuptoClass,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = Guid.NewGuid(), // In real app, get from current user
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Employee created successfully"
        };

        var createdEmployee = await _employeeRepository.AddAsync(employee);

        // Create corresponding User record
        var user = new User
        {
            Id = Guid.NewGuid(),
            UserName = request.EmailId ?? string.Empty, // Use email as username
            UserPassword = "TempPassword123!", // In real app, generate secure password
            FirstName = request.FirstName ?? string.Empty,
            LastName = request.LastName ?? string.Empty,
            EmailAddress = request.EmailId ?? string.Empty,
            DesignationId = request.DesignationId ?? Guid.Empty,
            CompanyId = request.CompanyId,
            SchoolId = request.SchoolId,
            IsActive = true,
            IsDeleted = false,
            CreatedBy = employee.CreatedBy,
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "User created for employee"
        };

        await _userRepository.AddAsync(user);

        // Create DriverMaster or CleanerMaster records based on employee category
        if (request.CategoryId.HasValue)
        {
            await CreateCategorySpecificRecordAsync(request, employee);
        }

        return await MapToResponse(createdEmployee);
    }

    public async Task<EmployeeResponse?> UpdateAsync(Guid id, EmployeeRequest request)
    {
        var existingEmployee = await _employeeRepository.GetByIdAsync(id);
        if (existingEmployee == null || existingEmployee.IsDeleted)
        {
            return null;
        }

        // Update existing employee properties
        existingEmployee.FirstName = request.FirstName ?? existingEmployee.FirstName;
        existingEmployee.LastName = request.LastName ?? existingEmployee.LastName;
        existingEmployee.Dob = request.Dob != default ? request.Dob : existingEmployee.Dob;
        existingEmployee.Doj = request.Doj != default ? request.Doj : existingEmployee.Doj;
        existingEmployee.ProbationStartDate = request.ProbationStartDate ?? existingEmployee.ProbationStartDate;
        existingEmployee.ProbationPeriod = request.ProbationPeriod ?? existingEmployee.ProbationPeriod;
        existingEmployee.ConfirmationDate = request.ConfirmationDate ?? existingEmployee.ConfirmationDate;
        existingEmployee.Pannumber = request.Pannumber ?? existingEmployee.Pannumber;
        existingEmployee.Esicnumber = request.Esicnumber ?? existingEmployee.Esicnumber;
        existingEmployee.Pfnumeber = request.Pfnumeber ?? existingEmployee.Pfnumeber;
        existingEmployee.CurrentAddress1 = request.CurrentAddress1 ?? existingEmployee.CurrentAddress1;
        existingEmployee.CurrentAddress2 = request.CurrentAddress2 ?? existingEmployee.CurrentAddress2;
        existingEmployee.CurrentCityId = request.CurrentCityId ?? existingEmployee.CurrentCityId;
        existingEmployee.CurrentStateId = request.CurrentStateId ?? existingEmployee.CurrentStateId;
        existingEmployee.CurrentCountryId = request.CurrentCountryId ?? existingEmployee.CurrentCountryId;
        existingEmployee.CurrentZipCode = request.CurrentZipCode ?? existingEmployee.CurrentZipCode;
        existingEmployee.PermanentAddress1 = request.PermanentAddress1 ?? existingEmployee.PermanentAddress1;
        existingEmployee.PermanentAddress2 = request.PermanentAddress2 ?? existingEmployee.PermanentAddress2;
        existingEmployee.PermanentCityId = request.PermanentCityId ?? existingEmployee.PermanentCityId;
        existingEmployee.PermanentStateId = request.PermanentStateId ?? existingEmployee.PermanentStateId;
        existingEmployee.PermanentCountryId = request.PermanentCountryId ?? existingEmployee.PermanentCountryId;
        existingEmployee.PermanentZipCode = request.PermanentZipCode ?? existingEmployee.PermanentZipCode;
        existingEmployee.PhoneNumber = request.PhoneNumber ?? existingEmployee.PhoneNumber;
        existingEmployee.MobileNumber = request.MobileNumber ?? existingEmployee.MobileNumber;
        existingEmployee.EmailId = request.EmailId ?? existingEmployee.EmailId;
        existingEmployee.DepartmentId = request.DepartmentId ?? existingEmployee.DepartmentId;
        existingEmployee.DesignationId = request.DesignationId ?? existingEmployee.DesignationId;
        existingEmployee.PaymentModeId = request.PaymentModeId ?? existingEmployee.PaymentModeId;
        existingEmployee.EmployeeTypeId = request.EmployeeTypeId ?? existingEmployee.EmployeeTypeId;
        existingEmployee.CategoryId = request.CategoryId ?? existingEmployee.CategoryId;
        existingEmployee.BankAccountNumber = request.BankAccountNumber ?? existingEmployee.BankAccountNumber;
        existingEmployee.BankName = request.BankName ?? existingEmployee.BankName;
        existingEmployee.GenderId = request.GenderId ?? existingEmployee.GenderId;
        existingEmployee.BloodGroupId = request.BloodGroupId ?? existingEmployee.BloodGroupId;
        existingEmployee.GradeId = request.GradeId ?? existingEmployee.GradeId;
        existingEmployee.Image = request.Image ?? existingEmployee.Image;
        existingEmployee.EmployeeOldId = request.EmployeeOldId ?? existingEmployee.EmployeeOldId;
        existingEmployee.EmployeeCode = request.EmployeeCode ?? existingEmployee.EmployeeCode;
        existingEmployee.FathersName = request.FathersName ?? existingEmployee.FathersName;
        existingEmployee.MothersName = request.MothersName ?? existingEmployee.MothersName;
        existingEmployee.Description = request.Description ?? existingEmployee.Description;
        existingEmployee.LicenceNumber = request.LicenceNumber ?? existingEmployee.LicenceNumber;
        existingEmployee.LicenceIssueDate = request.LicenceIssueDate ?? existingEmployee.LicenceIssueDate;
        existingEmployee.LicenceValidUpto = request.LicenceValidUpto ?? existingEmployee.LicenceValidUpto;
        existingEmployee.LicenceDescription = request.LicenceDescription ?? existingEmployee.LicenceDescription;
        existingEmployee.LicenceImage = request.LicenceImage ?? existingEmployee.LicenceImage;
        existingEmployee.LicenceType = request.LicenceType ?? existingEmployee.LicenceType;
        existingEmployee.Salutation = request.Salutation ?? existingEmployee.Salutation;
        existingEmployee.DateOfLeaving = request.DateOfLeaving ?? existingEmployee.DateOfLeaving;
        existingEmployee.MaritalStatus = request.MaritalStatus ?? existingEmployee.MaritalStatus;
        existingEmployee.YearsOfExperience = request.YearsOfExperience ?? existingEmployee.YearsOfExperience;
        existingEmployee.PrevioudSchoolCompany = request.PrevioudSchoolCompany ?? existingEmployee.PrevioudSchoolCompany;
        existingEmployee.AadhaarNumber = request.AadhaarNumber ?? existingEmployee.AadhaarNumber;
        existingEmployee.MathUpToClass = request.MathUpToClass ?? existingEmployee.MathUpToClass;
        existingEmployee.EnglishUptoClass = request.EnglishUptoClass ?? existingEmployee.EnglishUptoClass;
        existingEmployee.SstuptoClass = request.SstuptoClass ?? existingEmployee.SstuptoClass;
        existingEmployee.CompanyId = request.CompanyId != Guid.Empty ? request.CompanyId : existingEmployee.CompanyId;
        existingEmployee.SchoolId = request.SchoolId != Guid.Empty ? request.SchoolId : existingEmployee.SchoolId;
        existingEmployee.ModifiedBy = Guid.NewGuid(); // In real app, get from current user
        existingEmployee.ModifiedDate = DateTime.UtcNow;
        existingEmployee.Status = "Updated";
        existingEmployee.StatusMessage = "Employee updated successfully";

        try
        {
            var result = await _employeeRepository.UpdateAsync(existingEmployee);
            return await MapToResponse(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating employee: {ex.Message}");
            Console.WriteLine($"Inner exception: {ex.InnerException?.Message}");
            throw;
        }
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var employee = await _employeeRepository.GetByIdAsync(id);
        if (employee == null || employee.IsDeleted)
        {
            return false;
        }

        await _employeeRepository.DeleteAsync(id);
        return true;
    }

    private async Task<EmployeeResponse> MapToResponse(Employee employee)
    {
        try
        {
            var categoryName = "";
            if (employee.CategoryId.HasValue && _empCategoryRepository != null)
            {
                try
                {
                    categoryName = await GetCategoryNameAsync(employee.CategoryId.Value);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error fetching category name for {employee.CategoryId.Value}: {ex.Message}");
                    categoryName = "Unknown";
                }
            }

            var designationName = "";
            if (employee.DesignationId.HasValue && _desigRepository != null)
            {
                try
                {
                    designationName = await GetDesignationNameAsync(employee.DesignationId.Value);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error fetching designation name for {employee.DesignationId.Value}: {ex.Message}");
                    designationName = "Unknown";
                }
            }

            return new EmployeeResponse
            {
                Id = employee.Id,
                FirstName = employee.FirstName ?? string.Empty,
                LastName = employee.LastName ?? string.Empty,
                Dob = employee.Dob,
                Doj = employee.Doj,
                ProbationStartDate = employee.ProbationStartDate,
                ProbationPeriod = employee.ProbationPeriod,
                ConfirmationDate = employee.ConfirmationDate,
                Pannumber = employee.Pannumber ?? string.Empty,
                Esicnumber = employee.Esicnumber ?? string.Empty,
                Pfnumeber = employee.Pfnumeber ?? string.Empty,
                CurrentAddress1 = employee.CurrentAddress1 ?? string.Empty,
                CurrentAddress2 = employee.CurrentAddress2 ?? string.Empty,
                CurrentCityId = employee.CurrentCityId,
                CurrentStateId = employee.CurrentStateId,
                CurrentCountryId = employee.CurrentCountryId,
                CurrentZipCode = employee.CurrentZipCode ?? string.Empty,
                PermanentAddress1 = employee.PermanentAddress1 ?? string.Empty,
                PermanentAddress2 = employee.PermanentAddress2 ?? string.Empty,
                PermanentCityId = employee.PermanentCityId,
                PermanentStateId = employee.PermanentStateId,
                PermanentCountryId = employee.PermanentCountryId,
                PermanentZipCode = employee.PermanentZipCode ?? string.Empty,
                PhoneNumber = employee.PhoneNumber ?? string.Empty,
                MobileNumber = employee.MobileNumber ?? string.Empty,
                EmailId = employee.EmailId ?? string.Empty,
                DepartmentId = employee.DepartmentId,
                DesignationId = employee.DesignationId,
                PaymentModeId = employee.PaymentModeId,
                EmployeeTypeId = employee.EmployeeTypeId,
                CategoryId = employee.CategoryId,
                BankAccountNumber = employee.BankAccountNumber ?? string.Empty,
                BankName = employee.BankName ?? string.Empty,
                GenderId = employee.GenderId,
                BloodGroupId = employee.BloodGroupId,
                GradeId = employee.GradeId,
                Image = employee.Image ?? string.Empty,
                EmployeeOldId = employee.EmployeeOldId,
                EmployeeCode = employee.EmployeeCode ?? string.Empty,
                FathersName = employee.FathersName ?? string.Empty,
                MothersName = employee.MothersName ?? string.Empty,
                Description = employee.Description ?? string.Empty,
                LicenceNumber = employee.LicenceNumber ?? string.Empty,
                LicenceIssueDate = employee.LicenceIssueDate,
                LicenceValidUpto = employee.LicenceValidUpto,
                LicenceDescription = employee.LicenceDescription ?? string.Empty,
                LicenceImage = employee.LicenceImage ?? string.Empty,
                LicenceType = employee.LicenceType ?? string.Empty,
                Salutation = employee.Salutation ?? string.Empty,
                DateOfLeaving = employee.DateOfLeaving,
                MaritalStatus = employee.MaritalStatus ?? string.Empty,
                YearsOfExperience = employee.YearsOfExperience ?? string.Empty,
                PrevioudSchoolCompany = employee.PrevioudSchoolCompany ?? string.Empty,
                AadhaarNumber = employee.AadhaarNumber ?? string.Empty,
                MathUpToClass = employee.MathUpToClass,
                EnglishUptoClass = employee.EnglishUptoClass,
                SstuptoClass = employee.SstuptoClass,
                CompanyId = employee.CompanyId,
                SchoolId = employee.SchoolId,
                IsActive = employee.IsActive,
                CreatedDate = employee.CreatedDate,
                ModifiedDate = employee.ModifiedDate,
                Status = employee.Status ?? string.Empty,
                StatusMessage = employee.StatusMessage ?? string.Empty,
                CategoryName = categoryName ?? string.Empty,
                DesignationName = designationName ?? string.Empty
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in MapToResponse: {ex.Message}");
            throw;
        }
    }

    private async Task CreateCategorySpecificRecordAsync(EmployeeRequest request, Employee employee)
    {
        // Note: In a real implementation, you would fetch the category name from the database
        // using the CategoryId to determine if it's "Driver" or "Cleaner"
        // For now, we'll assume we have a way to identify the category type
        
        // This is a placeholder implementation - you would need to implement
        // a proper category lookup mechanism
        var categoryName = await GetCategoryNameAsync(request.CategoryId!.Value);
        
        if (categoryName.Equals("Driver", StringComparison.OrdinalIgnoreCase))
        {
            var driverMaster = new SchoolDemo.Domain.Entities.DriverMaster
            {
                Id = Guid.NewGuid(),
                FirstName = request.FirstName ?? string.Empty,
                LastName = request.LastName,
                DateOfBirth = request.Dob,
                FathersName = request.FathersName ?? string.Empty,
                MothersName = request.MothersName ?? string.Empty,
                Address1 = request.CurrentAddress1,
                Address2 = request.CurrentAddress2,
                CityId = request.CurrentCityId ?? Guid.Empty,
                StateId = request.CurrentStateId ?? Guid.Empty,
                CountryId = request.CurrentCountryId ?? Guid.Empty,
                ZipCode = request.CurrentZipCode,
                MobileNumber = request.MobileNumber,
                PhoneNumber = request.PhoneNumber,
                DriverImage = request.Image,
                LicenceNumber = request.LicenceNumber,
                LicenceIssueDate = request.LicenceIssueDate,
                LicenceValidUptoDate = request.LicenceValidUpto,
                LicenceDescription = request.LicenceDescription,
                LicenceImage = request.LicenceImage,
                LicenceType = request.LicenceType,
                CompanyId = request.CompanyId,
                SchoolId = request.SchoolId,
                IsActive = true,
                IsDeleted = false,
                CreatedBy = employee.CreatedBy,
                CreatedDate = DateTime.UtcNow,
                Status = "Active",
                StatusMessage = "Driver created from employee"
            };

            await _driverMasterRepository.AddAsync(driverMaster);
        }
        else if (categoryName.Equals("Cleaner", StringComparison.OrdinalIgnoreCase))
        {
            var cleanerMaster = new SchoolDemo.Domain.Entities.CleanerMaster
            {
                Id = Guid.NewGuid(),
                Name = $"{request.FirstName} {request.LastName}",
                Image = request.Image,
                FatherName = request.FathersName,
                Description = request.Description,
                CompanyId = request.CompanyId,
                SchoolId = request.SchoolId,
                IsActive = true,
                IsDeleted = false,
                CreatedBy = employee.CreatedBy,
                CreatedDate = DateTime.UtcNow,
                Status = "Active",
                StatusMessage = "Cleaner created from employee"
            };

            await _cleanerMasterRepository.AddAsync(cleanerMaster);
        }
    }

    private async Task<string> GetCategoryNameAsync(Guid categoryId)
    {
        try
        {
            if (_empCategoryRepository == null)
            {
                Console.WriteLine("Category repository is null");
                return "Unknown";
            }
            
            var category = await _empCategoryRepository.GetByIdAsync(categoryId);
            return category?.CategoryName ?? "Unknown";
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetCategoryNameAsync for {categoryId}: {ex.Message}");
            return "Unknown";
        }
    }

    private async Task<string> GetDesignationNameAsync(Guid designationId)
    {
        try
        {
            if (_desigRepository == null)
            {
                Console.WriteLine("Designation repository is null");
                return "Unknown";
            }
            
            var designation = await _desigRepository.GetByIdAsync(designationId);
            return designation?.Name ?? "Unknown";
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetDesignationNameAsync for {designationId}: {ex.Message}");
            return "Unknown";
        }
    }
}
