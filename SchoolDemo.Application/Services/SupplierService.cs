using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Application.Services;

public class SupplierService : ISupplierService
{
    private readonly ISupplierRepository _supplierRepository;

    public SupplierService(ISupplierRepository supplierRepository)
    {
        _supplierRepository = supplierRepository;
    }

    public async Task<SupplierResponse?> GetByIdAsync(Guid id)
    {
        var supplier = await _supplierRepository.GetByIdAsync(id);

        if (supplier == null) return null;

        return MapToResponse(supplier);
    }

    public async Task<IEnumerable<SupplierResponse>> GetAllAsync()
    {
        var suppliers = await _supplierRepository.GetAllAsync();

        return suppliers.Select(MapToResponse);
    }

    public async Task<(bool Success, SupplierResponse? Response, string Message)> CreateAsync(SupplierRequest request)
    {
        // Provide default GUID values if not provided (for session-based values)
        var supplier = new Supplier
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            Address1 = request.Address1,
            Address2 = request.Address2,
            CityId = request.CityId ?? Guid.Empty,
            StateId = request.StateId ?? Guid.Empty,  
            CountryId = request.CountryId ?? Guid.Empty,
            ZipCode = request.ZipCode,
            PhoneNumber = request.PhoneNumber,
            MobileNumber = request.MobileNumber,
            EmailId = request.EmailId,
            CompanyId = ParseGuidOrDefault(request.CompanyId, Guid.Empty),
            SchoolId = ParseGuidOrDefault(request.SchoolId, Guid.Empty),
            IsActive = true,
            IsDeleted = false,
            CreatedDate = DateTime.UtcNow,
            Status = "Active",
            StatusMessage = "Supplier created successfully"
        };

        try
        {
            var createdSupplier = await _supplierRepository.AddAsync(supplier);
            return (true, MapToResponse(createdSupplier), "Supplier created successfully");
        }
        catch (Exception ex)
        {
            return (false, null, ex.Message);
        }
    }

    public async Task<(bool Success, SupplierResponse? Response, string Message)> UpdateAsync(Guid id, SupplierRequest request)
    {
        var existingSupplier = await _supplierRepository.GetByIdAsync(id);

        if (existingSupplier == null) return (false, null, "Supplier not found");

        existingSupplier.Name = request.Name;
        existingSupplier.Description = request.Description;
        existingSupplier.Address1 = request.Address1;
        existingSupplier.Address2 = request.Address2;
        existingSupplier.CityId = request.CityId ?? Guid.Empty;
        existingSupplier.StateId = request.StateId ?? Guid.Empty;
        existingSupplier.CountryId = request.CountryId ?? Guid.Empty;
        existingSupplier.ZipCode = request.ZipCode;
        existingSupplier.PhoneNumber = request.PhoneNumber;
        existingSupplier.MobileNumber = request.MobileNumber;
        existingSupplier.EmailId = request.EmailId;
        existingSupplier.CompanyId = string.IsNullOrWhiteSpace(request.CompanyId) ? existingSupplier.CompanyId : ParseGuidOrDefault(request.CompanyId, existingSupplier.CompanyId);
        existingSupplier.SchoolId = string.IsNullOrWhiteSpace(request.SchoolId) ? existingSupplier.SchoolId : ParseGuidOrDefault(request.SchoolId, existingSupplier.SchoolId);
        existingSupplier.ModifiedDate = DateTime.UtcNow;
        existingSupplier.Status = "Updated";
        existingSupplier.StatusMessage = "Supplier updated successfully";

        try
        {
            var updatedSupplier = await _supplierRepository.UpdateAsync(existingSupplier);
            return (true, MapToResponse(updatedSupplier), "Supplier updated successfully");
        }
        catch (Exception ex)
        {
            return (false, null, ex.Message);
        }
    }

    private static Guid ParseGuidOrDefault(string? value, Guid defaultValue = default)
    {
        if (string.IsNullOrWhiteSpace(value)) return defaultValue;
        return Guid.TryParse(value, out var g) ? g : defaultValue;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        try
        {
            await _supplierRepository.DeleteAsync(id);
            return true;
        }
        catch
        {
            return false;
        }
    }

    private static SupplierResponse MapToResponse(Supplier supplier)
    {
        return new SupplierResponse
        {
            Id = supplier.Id,
            Name = supplier.Name,
            Description = supplier.Description,
            Address1 = supplier.Address1,
            Address2 = supplier.Address2,
            CityId = supplier.CityId,
            StateId = supplier.StateId,
            CountryId = supplier.CountryId,
            ZipCode = supplier.ZipCode,
            PhoneNumber = supplier.PhoneNumber,
            MobileNumber = supplier.MobileNumber,
            EmailId = supplier.EmailId,
            CompanyId = supplier.CompanyId,
            SchoolId = supplier.SchoolId,
            IsActive = supplier.IsActive,
            IsDeleted = supplier.IsDeleted,
            CreatedDate = supplier.CreatedDate,
            ModifiedDate = supplier.ModifiedDate,
            Status = supplier.Status,
            StatusMessage = supplier.StatusMessage
        };
    }
}
