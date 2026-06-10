using SchoolDemo.Domain.DTOs;

namespace SchoolDemo.Domain.Interfaces;

public interface ILocationService
{
    // Country operations
    Task<IEnumerable<CountryResponse>> GetCountriesAsync();
    Task<CountryResponse?> GetCountryByIdAsync(Guid id);
    Task<CountryResponse> CreateCountryAsync(CountryRequest request);
    Task<CountryResponse?> UpdateCountryAsync(Guid id, CountryRequest request);
    Task<bool> DeleteCountryAsync(Guid id);

    // State operations (cascaded by country)
    Task<IEnumerable<StateResponse>> GetStatesAsync();
    Task<IEnumerable<StateResponse>> GetStatesByCountryIdAsync(Guid countryId);
    Task<StateResponse?> GetStateByIdAsync(Guid id);
    Task<StateResponse> CreateStateAsync(StateRequest request);
    Task<StateResponse?> UpdateStateAsync(Guid id, StateRequest request);
    Task<bool> DeleteStateAsync(Guid id);

    // City operations (cascaded by state)
    Task<IEnumerable<CityResponse>> GetCitiesAsync();
    Task<IEnumerable<CityResponse>> GetCitiesByStateIdAsync(Guid stateId);
    Task<CityResponse?> GetCityByIdAsync(Guid id);
    Task<CityResponse> CreateCityAsync(CityRequest request);
    Task<CityResponse?> UpdateCityAsync(Guid id, CityRequest request);
    Task<bool> DeleteCityAsync(Guid id);

    /// <summary>Countries, states, and cities optimized for dropdowns (single service call, parallel DB reads).</summary>
    Task<CascadedLocationResponse> GetCascadedLocationDataAsync();
}

// Response DTOs
public class CountryResponse
{
    public Guid Id { get; set; }
    public string? CountryName { get; set; }
    public bool IsActive { get; set; }
}

public class StateResponse
{
    public Guid Id { get; set; }
    public string? StateName { get; set; }
    public Guid CountryId { get; set; }
    public string? CountryName { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
}

public class CityResponse
{
    public Guid Id { get; set; }
    public string? CityName { get; set; }
    public Guid CityStateId { get; set; }
    public string? StateName { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
}

public class CascadedLocationResponse
{
    public IEnumerable<CountryResponse> Countries { get; set; } = Array.Empty<CountryResponse>();
    public IEnumerable<StateResponse> States { get; set; } = Array.Empty<StateResponse>();
    public IEnumerable<CityResponse> Cities { get; set; } = Array.Empty<CityResponse>();
}
