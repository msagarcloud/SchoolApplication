using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly SchoolDbContext _context;

    public UserRepository(SchoolDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByUserNameAsync(string userName)
    {
        var userDetail = await _context.UserDetails
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.UserName == userName);
        
        return MapToDomainEntity(userDetail);
    }

    public async Task<User?> GetByUserNameWithRelatedDataAsync(string userName)
    {
        // Single optimized query with selective includes
        var userDetail = await _context.UserDetails
            .AsNoTracking()
            .Where(u => u.UserName == userName && u.IsActive && !u.IsDeleted)
            .Select(u => new
            {
                // Basic user fields for authentication
                u.Id,
                u.UserName,
                u.UserPassword,
                u.FirstName,
                u.LastName,
                u.EmailAddress,
                u.IsActive,
                u.IsDeleted,
                u.DesignationId,
                u.UserRoleId,
                u.CompanyId,
                u.SchoolId,
                u.IsSuperUser,
                
                // Only include essential related data
                DesignationName = u.Designation != null ? u.Designation.Name : null,
                UserRoleName = u.UserRole != null ? u.UserRole.Name : null,
                CompanyName = u.Company != null ? u.Company.CompanyName : null,
                SchoolName = u.School != null ? u.School.Name : null,
                
                // Only include privilege names (not full objects)
                PrivilegeNames = u.UserRole != null ? 
                    u.UserRole.RolePrivileges.Select(rp => rp.Privilege != null ? rp.Privilege.PrivilegeName : null).ToList() 
                    : new List<string?>()
            })
            .FirstOrDefaultAsync();
        
        if (userDetail == null)
            return null;
        
        return new User
        {
            Id = userDetail.Id,
            UserName = userDetail.UserName,
            FirstName = userDetail.FirstName,
            LastName = userDetail.LastName,
            EmailAddress = userDetail.EmailAddress,
            IsActive = userDetail.IsActive,
            IsDeleted = userDetail.IsDeleted,
            DesignationId = userDetail.DesignationId,
            UserRoleId = userDetail.UserRoleId,
            CompanyId = userDetail.CompanyId,
            SchoolId = userDetail.SchoolId,
            IsSuperUser = userDetail.IsSuperUser,
            Designation = userDetail.DesignationName != null ? new Designation { Name = userDetail.DesignationName } : null,
            UserRole = userDetail.UserRoleName != null ? new Role { Name = userDetail.UserRoleName, Privileges = userDetail.PrivilegeNames.Where(p => p != null).Select(p => p!).ToList() } : null,
            Company = userDetail.CompanyName != null ? new Company { CompanyName = userDetail.CompanyName } : null,
            School = userDetail.SchoolName != null ? new School { Name = userDetail.SchoolName } : null
        };
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        var userDetail = await _context.UserDetails
            .FirstOrDefaultAsync(u => u.Id == id);
        
        return MapToDomainEntity(userDetail);
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        var userDetails = await _context.UserDetails
            .Where(u => !u.IsDeleted)
            .ToListAsync();
        
        return userDetails.Select(MapToDomainEntity).Where(u => u != null)!;
    }

    public async Task<User> AddAsync(User user)
    {
        var userDetail = MapToInfrastructureEntity(user);
        await _context.UserDetails.AddAsync(userDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(userDetail)!;
    }

    public async Task<User> UpdateAsync(User user)
    {
        var userDetail = MapToInfrastructureEntity(user);
        _context.UserDetails.Update(userDetail);
        await _context.SaveChangesAsync();
        return MapToDomainEntity(userDetail)!;
    }

    public async Task DeleteAsync(Guid id)
    {
        var userDetail = await _context.UserDetails
            .FirstOrDefaultAsync(u => u.Id == id);
        
        if (userDetail != null)
        {
            userDetail.IsDeleted = true;
            await UpdateAsync(MapToDomainEntity(userDetail)!);
        }
    }

    private static User? MapToDomainEntity(UserDetail? userDetail)
    {
        if (userDetail == null) return null;

        return new User
        {
            Id = userDetail.Id,
            UserName = userDetail.UserName,
            UserPassword = userDetail.UserPassword,
            FirstName = userDetail.FirstName,
            LastName = userDetail.LastName,
            EmailAddress = userDetail.EmailAddress,
            DesignationId = userDetail.DesignationId,
            UserRoleId = userDetail.UserRoleId,
            IsSuperUser = userDetail.IsSuperUser,
            CompanyId = userDetail.CompanyId,
            SchoolId = userDetail.SchoolId,
            IsActive = userDetail.IsActive,
            IsDeleted = userDetail.IsDeleted,
            CreatedBy = userDetail.CreatedBy,
            CreatedDate = userDetail.CreatedDate,
            ModifiedBy = userDetail.ModifiedBy,
            ModifiedDate = userDetail.ModifiedDate,
            Status = userDetail.Status,
            StatusMessage = userDetail.StatusMessage
        };
    }

    private static UserDetail MapToInfrastructureEntity(User user)
    {
        return new UserDetail
        {
            Id = user.Id,
            UserName = user.UserName,
            UserPassword = user.UserPassword,
            FirstName = user.FirstName,
            LastName = user.LastName,
            EmailAddress = user.EmailAddress,
            DesignationId = user.DesignationId,
            UserRoleId = user.UserRoleId,
            IsSuperUser = user.IsSuperUser,
            CompanyId = user.CompanyId,
            SchoolId = user.SchoolId,
            IsActive = user.IsActive,
            IsDeleted = user.IsDeleted,
            CreatedBy = user.CreatedBy,
            CreatedDate = user.CreatedDate,
            ModifiedBy = user.ModifiedBy,
            ModifiedDate = user.ModifiedDate,
            Status = user.Status,
            StatusMessage = user.StatusMessage
        };
    }

    private static User? MapToDomainEntityWithRelatedData(UserDetail? userDetail)
    {
        if (userDetail == null) return null;

        var user = MapToDomainEntity(userDetail);
        if (user == null) return null;

        // Map related entities
        if (userDetail.Designation != null)
        {
            user.Designation = new Designation
            {
                Id = userDetail.Designation.Id,
                Code = userDetail.Designation.Code,
                Name = userDetail.Designation.Name,
                CompanyId = userDetail.Designation.CompanyId,
                SchoolId = userDetail.Designation.SchoolId,
                IsActive = userDetail.Designation.IsActive,
                IsDeleted = userDetail.Designation.IsDeleted,
                CreatedBy = userDetail.Designation.CreatedBy,
                CreatedDate = userDetail.Designation.CreatedDate,
                ModifiedBy = userDetail.Designation.ModifiedBy,
                ModifiedDate = userDetail.Designation.ModifiedDate,
                Status = userDetail.Designation.Status,
                StatusMessage = userDetail.Designation.StatusMessage
            };
        }

        if (userDetail.UserRole != null)
        {
            user.UserRole = new Role
            {
                Id = userDetail.UserRole.Id,
                Name = userDetail.UserRole.Name,
                Description = userDetail.UserRole.Description,
                CompanyId = userDetail.UserRole.CompanyId,
                SchoolId = userDetail.UserRole.SchoolId,
                IsActive = userDetail.UserRole.IsActive,
                IsDeleted = userDetail.UserRole.IsDeleted,
                CreatedBy = userDetail.UserRole.CreatedBy,
                CreatedDate = userDetail.UserRole.CreatedDate,
                ModifiedBy = userDetail.UserRole.ModifiedBy,
                ModifiedDate = userDetail.UserRole.ModifiedDate,
                Status = userDetail.UserRole.Status,
                StatusMessage = userDetail.UserRole.StatusMessage,
                Privileges = userDetail.UserRole.RolePrivileges
                    .Where(rp => rp.Privilege != null && rp.Privilege.PrivilegeName != null)
                    .Select(rp => rp.Privilege!.PrivilegeName!)
                    .ToList()
            };
        }

        if (userDetail.Company != null)
        {
            user.Company = new Company
            {
                Id = userDetail.Company.Id,
                CompanyName = userDetail.Company.CompanyName,
                Description = userDetail.Company.Description,
                Address = userDetail.Company.Address,
                CityId = userDetail.Company.CityId,
                StateId = userDetail.Company.StateId,
                CountryId = userDetail.Company.CountryId,
                ZipCode = userDetail.Company.ZipCode,
                Email = userDetail.Company.Email,
                IsActive = userDetail.Company.IsActive,
                IsDeleted = userDetail.Company.IsDeleted,
                CreatedBy = userDetail.Company.CreatedBy,
                CreatedDate = userDetail.Company.CreatedDate,
                ModifiedBy = userDetail.Company.ModifiedBy,
                ModifiedDate = userDetail.Company.ModifiedDate,
                Status = userDetail.Company.Status,
                StatusMessage = userDetail.Company.StatusMessage
            };
        }

        if (userDetail.School != null)
        {
            user.School = new School
            {
                Id = userDetail.School.Id,
                Name = userDetail.School.Name,
                Description = userDetail.School.Description,
                Email = userDetail.School.Email,
                Address1 = userDetail.School.Address1,
                Address2 = userDetail.School.Address2,
                CityId = userDetail.School.CityId,
                StateId = userDetail.School.StateId,
                CountryId = userDetail.School.CountryId,
                ZipCode = userDetail.School.ZipCode,
                Phone = userDetail.School.Phone,
                EstablishmentYear = userDetail.School.EstablishmentYear,
                IsActive = userDetail.School.IsActive,
                IsDeleted = userDetail.School.IsDeleted,
                CreatedBy = userDetail.School.CreatedBy,
                CreatedDate = userDetail.School.CreatedDate,
                ModifiedBy = userDetail.School.ModifiedBy,
                ModifiedDate = userDetail.School.ModifiedDate,
                Status = userDetail.School.Status,
                StatusMessage = userDetail.School.StatusMessage
            };
        }

        return user;
    }
}
