namespace SchoolDemo.Domain.Interfaces;

public interface IStudentRepository
{
    Task<SchoolDemo.Domain.Entities.StudentMaster?> GetByIdAsync(Guid id);
    Task<IEnumerable<SchoolDemo.Domain.Entities.StudentMaster>> GetAllAsync();
    Task<IEnumerable<SchoolDemo.Domain.Entities.StudentMaster>> GetMinimalAsync();
    Task<PagedResponse<SchoolDemo.Domain.Entities.StudentMaster>> GetPagedAsync(int page, int pageSize);
    Task<PagedResponse<SchoolDemo.Domain.Entities.StudentMaster>> SearchAsync(string query, int page, int pageSize);
    Task<SchoolDemo.Domain.Entities.StudentMaster> AddAsync(SchoolDemo.Domain.Entities.StudentMaster entity);
    Task<SchoolDemo.Domain.Entities.StudentMaster> UpdateAsync(SchoolDemo.Domain.Entities.StudentMaster entity);
    Task DeleteAsync(Guid id);
}

public class PagedResponse<T>
{
    public IEnumerable<T> Data { get; set; } = [];
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}
