using SchoolDemo.Domain.DTOs;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;

namespace SchoolDemo.Application.Services;

public class LocationService : ILocationService
{
    private readonly ILocationRepository _locationRepository;

    public LocationService(ILocationRepository locationRepository)
    {
        _locationRepository = locationRepository;
    }

    // Country operations
    public async Task<IEnumerable<CountryResponse>> GetCountriesAsync()
    {
        var countries = await _locationRepository.GetCountriesAsync();
        return countries.Select(MapToCountryResponse);
    }

    public async Task<CountryResponse?> GetCountryByIdAsync(Guid id)
    {
        var country = await _locationRepository.GetCountryByIdAsync(id);
        return country == null ? null : MapToCountryResponse(country);
    }

    public async Task<CountryResponse> CreateCountryAsync(CountryRequest request)
    {
        var country = new Country
        {
            Id = Guid.NewGuid(),
            CountryName = request.CountryName,
            IsActive = request.IsActive
        };
        
        var createdCountry = await _locationRepository.CreateCountryAsync(country);
        return MapToCountryResponse(createdCountry);
    }

    public async Task<CountryResponse?> UpdateCountryAsync(Guid id, CountryRequest request)
    {
        var country = await _locationRepository.GetCountryByIdAsync(id);
        if (country == null) return null;
        
        country.CountryName = request.CountryName;
        country.IsActive = request.IsActive;
        
        var updatedCountry = await _locationRepository.UpdateCountryAsync(country);
        return MapToCountryResponse(updatedCountry);
    }

    public async Task<bool> DeleteCountryAsync(Guid id)
    {
        return await _locationRepository.DeleteCountryAsync(id);
    }

    // State operations
    public async Task<IEnumerable<StateResponse>> GetStatesAsync()
    {
        var states = await _locationRepository.GetStatesAsync();
        return states.Select(MapToStateResponse);
    }

    public async Task<IEnumerable<StateResponse>> GetStatesByCountryIdAsync(Guid countryId)
    {
        var states = await _locationRepository.GetStatesByCountryIdAsync(countryId);
        return states.Select(MapToStateResponse);
    }

    public async Task<StateResponse?> GetStateByIdAsync(Guid id)
    {
        var state = await _locationRepository.GetStateByIdAsync(id);
        return state == null ? null : MapToStateResponse(state);
    }

    public async Task<StateResponse> CreateStateAsync(StateRequest request)
    {
        var state = new State
        {
            Id = Guid.NewGuid(),
            StateName = request.StateName,
            CountryId = request.CountryId,
            IsActive = request.IsActive
        };
        
        var createdState = await _locationRepository.CreateStateAsync(state);
        return MapToStateResponse(createdState);
    }

    public async Task<StateResponse?> UpdateStateAsync(Guid id, StateRequest request)
    {
        var state = await _locationRepository.GetStateByIdAsync(id);
        if (state == null) return null;
        
        state.StateName = request.StateName;
        state.CountryId = request.CountryId;
        state.IsActive = request.IsActive;
        
        var updatedState = await _locationRepository.UpdateStateAsync(state);
        return MapToStateResponse(updatedState);
    }

    public async Task<bool> DeleteStateAsync(Guid id)
    {
        return await _locationRepository.DeleteStateAsync(id);
    }

    // City operations
    public async Task<IEnumerable<CityResponse>> GetCitiesAsync()
    {
        var cities = await _locationRepository.GetCitiesAsync();
        return cities.Select(MapToCityResponse);
    }

    public async Task<IEnumerable<CityResponse>> GetCitiesByStateIdAsync(Guid stateId)
    {
        var cities = await _locationRepository.GetCitiesByStateIdAsync(stateId);
        return cities.Select(MapToCityResponse);
    }

    public async Task<CityResponse?> GetCityByIdAsync(Guid id)
    {
        var city = await _locationRepository.GetCityByIdAsync(id);
        return city == null ? null : MapToCityResponse(city);
    }

    public async Task<CityResponse> CreateCityAsync(CityRequest request)
    {
        var city = new City
        {
            Id = Guid.NewGuid(),
            CityName = request.CityName,
            CityStateId = request.CityStateId,
            IsActive = request.IsActive
        };
        
        var createdCity = await _locationRepository.CreateCityAsync(city);
        return MapToCityResponse(createdCity);
    }

    public async Task<CityResponse?> UpdateCityAsync(Guid id, CityRequest request)
    {
        var city = await _locationRepository.GetCityByIdAsync(id);
        if (city == null) return null;
        
        city.CityName = request.CityName;
        city.CityStateId = request.CityStateId;
        city.IsActive = request.IsActive;
        
        var updatedCity = await _locationRepository.UpdateCityAsync(city);
        return MapToCityResponse(updatedCity);
    }

    public async Task<bool> DeleteCityAsync(Guid id)
    {
        return await _locationRepository.DeleteCityAsync(id);
    }

    public async Task<CascadedLocationResponse> GetCascadedLocationDataAsync()
    {
        var (countries, states, cities) = await _locationRepository.GetCascadedLocationDataAsync();
        return new CascadedLocationResponse
        {
            Countries = countries.Select(MapToCountryResponse),
            States = states.Select(MapToStateResponse),
            Cities = cities.Select(MapToCityResponse)
        };
    }

    // Mapping methods
    private static CountryResponse MapToCountryResponse(Country country)
    {
        return new CountryResponse
        {
            Id = country.Id,
            CountryName = country.CountryName,
            IsActive = country.IsActive
        };
    }

    private static StateResponse MapToStateResponse(State state)
    {
        return new StateResponse
        {
            Id = state.Id,
            StateName = state.StateName,
            CountryId = state.CountryId,
            CountryName = state.Country?.CountryName,
            IsActive = state.IsActive,
            CreatedDate = state.CreatedDate
        };
    }

    private static CityResponse MapToCityResponse(City city)
    {
        return new CityResponse
        {
            Id = city.Id,
            CityName = city.CityName,
            CityStateId = city.CityStateId,
            StateName = city.State?.StateName,
            IsActive = city.IsActive,
            CreatedDate = city.CreatedDate
        };
    }
}
