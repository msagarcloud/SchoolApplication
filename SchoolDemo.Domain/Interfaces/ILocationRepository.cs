using SchoolDemo.Domain.Entities;

namespace SchoolDemo.Domain.Interfaces;

public interface ILocationRepository
{
    // Country operations
    Task<IEnumerable<Country>> GetCountriesAsync();
    Task<Country?> GetCountryByIdAsync(Guid id);
    Task<Country> CreateCountryAsync(Country country);
    Task<Country> UpdateCountryAsync(Country country);
    Task<bool> DeleteCountryAsync(Guid id);

    // State operations
    Task<IEnumerable<State>> GetStatesAsync();
    Task<IEnumerable<State>> GetStatesByCountryIdAsync(Guid countryId);
    Task<State?> GetStateByIdAsync(Guid id);
    Task<State> CreateStateAsync(State state);
    Task<State> UpdateStateAsync(State state);
    Task<bool> DeleteStateAsync(Guid id);

    // City operations
    Task<IEnumerable<City>> GetCitiesAsync();
    Task<IEnumerable<City>> GetCitiesByStateIdAsync(Guid stateId);
    Task<City?> GetCityByIdAsync(Guid id);

    /// <summary>Loads countries, states, and cities in parallel (separate DbContext instances per query).</summary>
    Task<(IEnumerable<Country> Countries, IEnumerable<State> States, IEnumerable<City> Cities)> GetCascadedLocationDataAsync();
    Task<City> CreateCityAsync(City city);
    Task<City> UpdateCityAsync(City city);
    Task<bool> DeleteCityAsync(Guid id);
}
