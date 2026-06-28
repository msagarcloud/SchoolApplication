using System;
using System.Collections.Generic;
using System.Text;

namespace SchoolDemo.Domain.Interfaces
{
    public interface IInventoryMasterService
    {
        Task<InventoryMasterResponse?> GetByIdAsync(Guid id);
        Task<IEnumerable<InventoryMasterResponse>> GetAllAsync();
        Task<InventoryMasterResponse> CreateAsync(InventoryMasterRequest request);
        Task<InventoryMasterResponse?> UpdateAsync(Guid id, InventoryMasterRequest request);
        Task<bool> DeleteAsync(Guid id);
    }

    public class InventoryMasterRequest
    {
        public string? Name { get; set; }
        public Guid ItemId { get; set; }
        public Guid LocationId { get; set; }
        public int Quantity { get; set; }
        public decimal CostPerItem { get; set; }
        public bool? IsActive { get; set; }
        public Guid CompanyId { get; set; }
        public Guid SchoolId { get; set; }
    }

    public class InventoryMasterResponse
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public Guid ItemId { get; set; }
        public Guid LocationId { get; set; }
        public int Quantity { get; set; }
        public decimal CostPerItem { get; set; }
        public bool? IsActive { get; set; }
        public Guid CompanyId { get; set; }
        public Guid SchoolId { get; set; }
        public Guid CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public bool? IsDeleted { get; set; }
        public string? Status { get; set; }
        public string? StatusMessage { get; set; }
    }

}
