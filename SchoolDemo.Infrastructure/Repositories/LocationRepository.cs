using Microsoft.EntityFrameworkCore;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;

namespace SchoolDemo.Infrastructure.Repositories;

public class LocationRepository : ILocationRepository
{
    private readonly SchoolDbContext _context;
    private readonly IDbContextFactory<SchoolDbContext> _contextFactory;

    public LocationRepository(SchoolDbContext context, IDbContextFactory<SchoolDbContext> contextFactory)
    {
        _context = context;
        _contextFactory = contextFactory;
    }

    // Country operations
    public async Task<IEnumerable<Country>> GetCountriesAsync()
    {
        var countryDetails = await _context.CountryMasters
            .AsNoTracking()
            .Where(c => !c.IsDeleted && c.IsActive)
            .ToListAsync();
        
        return countryDetails.Select(MapToCountryEntity);
    }

    public async Task<Country?> GetCountryByIdAsync(Guid id)
    {
        var countryDetail = await _context.CountryMasters
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted && c.IsActive);
        
        return MapToCountryEntity(countryDetail);
    }

    public async Task<Country> CreateCountryAsync(Country country)
    {
        var countryDetail = new CountryMaster
        {
            Id = country.Id,
            CountryName = country.CountryName,
            IsActive = country.IsActive,
            IsDeleted = country.IsDeleted,
            CreatedBy = country.CreatedBy,
            CreatedDate = country.CreatedDate,
            ModifiedBy = country.ModifiedBy,
            ModifiedDate = country.ModifiedDate,
            Status = country.Status!,
            StatusMessage = country.StatusMessage!
        };

        _context.CountryMasters.Add(countryDetail);
        await _context.SaveChangesAsync();
        
        return MapToCountryEntity(countryDetail);
    }

    public async Task<Country> UpdateCountryAsync(Country country)
    {
        var countryDetail = await _context.CountryMasters
            .FirstOrDefaultAsync(c => c.Id == country.Id && !c.IsDeleted);
        
        if (countryDetail == null)
            throw new InvalidOperationException($"Country with ID {country.Id} not found.");

        countryDetail.CountryName = country.CountryName;
        countryDetail.IsActive = country.IsActive;
        countryDetail.ModifiedBy = country.ModifiedBy;
        countryDetail.ModifiedDate = country.ModifiedDate;
        countryDetail.Status = country.Status!;
        countryDetail.StatusMessage = country.StatusMessage!;

        await _context.SaveChangesAsync();
        
        return MapToCountryEntity(countryDetail);
    }

    public async Task<bool> DeleteCountryAsync(Guid id)
    {
        var countryDetail = await _context.CountryMasters
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
        
        if (countryDetail == null) return false;

        countryDetail.IsDeleted = true;
        countryDetail.ModifiedDate = DateTime.UtcNow;
        
        await _context.SaveChangesAsync();
        return true;
    }

    // State operations
    public async Task<IEnumerable<State>> GetStatesAsync()
    {
        var stateDetails = await _context.StateMasters
            .AsNoTracking()
            .Include(s => s.Country)
            .Where(s => !s.IsDeleted && s.IsActive)
            .ToListAsync();
        
        return stateDetails.Select(MapToStateEntity);
    }

    public async Task<IEnumerable<State>> GetStatesByCountryIdAsync(Guid countryId)
    {
        var stateDetails = await _context.StateMasters
            .AsNoTracking()
            .Include(s => s.Country)
            .Where(s => s.CountryId == countryId && !s.IsDeleted && s.IsActive)
            .ToListAsync();
        
        return stateDetails.Select(MapToStateEntity);
    }

    public async Task<State?> GetStateByIdAsync(Guid id)
    {
        var stateDetail = await _context.StateMasters
            .AsNoTracking()
            .Include(s => s.Country)
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted && s.IsActive);
        
        return MapToStateEntity(stateDetail);
    }

    public async Task<State> CreateStateAsync(State state)
    {
        var stateDetail = new StateMaster
        {
            Id = state.Id,
            StateName = state.StateName,
            CountryId = state.CountryId,
            IsActive = state.IsActive,
            IsDeleted = state.IsDeleted,
            CreatedBy = state.CreatedBy,
            CreatedDate = state.CreatedDate,
            ModifiedBy = state.ModifiedBy,
            ModifiedDate = state.ModifiedDate,
            Status = state.Status,
            StatusMessage = state.StatusMessage
        };

        _context.StateMasters.Add(stateDetail);
        await _context.SaveChangesAsync();
        
        return MapToStateEntity(stateDetail);
    }

    public async Task<State> UpdateStateAsync(State state)
    {
        var stateDetail = await _context.StateMasters
            .Include(s => s.Country)
            .FirstOrDefaultAsync(s => s.Id == state.Id && !s.IsDeleted);
        
        if (stateDetail == null)
            throw new InvalidOperationException($"State with ID {state.Id} not found.");

        stateDetail.StateName = state.StateName;
        stateDetail.CountryId = state.CountryId;
        stateDetail.IsActive = state.IsActive;
        stateDetail.ModifiedBy = state.ModifiedBy;
        stateDetail.ModifiedDate = state.ModifiedDate;
        stateDetail.Status = state.Status;
        stateDetail.StatusMessage = state.StatusMessage;

        await _context.SaveChangesAsync();
        
        return MapToStateEntity(stateDetail);
    }

    public async Task<bool> DeleteStateAsync(Guid id)
    {
        var stateDetail = await _context.StateMasters
            .FirstOrDefaultAsync(s => s.Id == id && !s.IsDeleted);
        
        if (stateDetail == null) return false;

        stateDetail.IsDeleted = true;
        stateDetail.ModifiedDate = DateTime.UtcNow;
        
        await _context.SaveChangesAsync();
        return true;
    }

    // City operations
    public async Task<IEnumerable<City>> GetCitiesAsync()
    {
        var cityDetails = await _context.CityMasters
            .AsNoTracking()
            .Include(c => c.CityState)
            .Where(c => !c.IsDeleted && c.IsActive)
            .ToListAsync();
        
        return cityDetails.Select(MapToCityEntity);
    }

    public async Task<IEnumerable<City>> GetCitiesByStateIdAsync(Guid stateId)
    {
        var cityDetails = await _context.CityMasters
            .AsNoTracking()
            .Include(c => c.CityState)
            .Where(c => c.CityStateId == stateId && !c.IsDeleted && c.IsActive)
            .ToListAsync();
        
        return cityDetails.Select(MapToCityEntity);
    }

    public async Task<City?> GetCityByIdAsync(Guid id)
    {
        var cityDetail = await _context.CityMasters
            .AsNoTracking()
            .Include(c => c.CityState)
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted && c.IsActive);
        
        return MapToCityEntity(cityDetail);
    }

    public async Task<(IEnumerable<Country> Countries, IEnumerable<State> States, IEnumerable<City> Cities)> GetCascadedLocationDataAsync()
    {
        await using var ctxCountries = await _contextFactory.CreateDbContextAsync();
        await using var ctxStates = await _contextFactory.CreateDbContextAsync();
        await using var ctxCities = await _contextFactory.CreateDbContextAsync();

        var countriesTask = ctxCountries.CountryMasters
            .AsNoTracking()
            .Where(c => !c.IsDeleted && c.IsActive)
            .ToListAsync();

        var statesTask = ctxStates.StateMasters
            .AsNoTracking()
            .Include(s => s.Country)
            .Where(s => !s.IsDeleted && s.IsActive)
            .ToListAsync();

        var citiesTask = ctxCities.CityMasters
            .AsNoTracking()
            .Include(c => c.CityState)
            .Where(c => !c.IsDeleted && c.IsActive)
            .ToListAsync();

        await Task.WhenAll(countriesTask, statesTask, citiesTask);

        var countries = (await countriesTask).Select(MapToCountryEntity);
        var states = (await statesTask).Select(MapToStateEntity);
        var cities = (await citiesTask).Select(MapToCityEntity);

        return (countries, states, cities);
    }

    public async Task<City> CreateCityAsync(City city)
    {
        var cityDetail = new CityMaster
        {
            Id = city.Id,
            CityName = city.CityName,
            CityStateId = city.CityStateId,
            IsActive = city.IsActive,
            IsDeleted = city.IsDeleted,
            CreatedBy = city.CreatedBy,
            CreatedDate = city.CreatedDate,
            ModifiedBy = city.ModifiedBy,
            ModifiedDate = city.ModifiedDate,
            Status = city.Status!,
            StatusMessage = city.StatusMessage!
        };

        _context.CityMasters.Add(cityDetail);
        await _context.SaveChangesAsync();
        
        return MapToCityEntity(cityDetail);
    }

    public async Task<City> UpdateCityAsync(City city)
    {
        var cityDetail = await _context.CityMasters
            .Include(c => c.CityState)
            .FirstOrDefaultAsync(c => c.Id == city.Id && !c.IsDeleted);
        
        if (cityDetail == null)
            throw new InvalidOperationException($"City with ID {city.Id} not found.");

        cityDetail.CityName = city.CityName;
        cityDetail.CityStateId = city.CityStateId;
        cityDetail.IsActive = city.IsActive;
        cityDetail.ModifiedBy = city.ModifiedBy;
        cityDetail.ModifiedDate = city.ModifiedDate;
        cityDetail.Status = city.Status!;
        cityDetail.StatusMessage = city.StatusMessage!;

        await _context.SaveChangesAsync();
        
        return MapToCityEntity(cityDetail);
    }

    public async Task<bool> DeleteCityAsync(Guid id)
    {
        var cityDetail = await _context.CityMasters
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
        
        if (cityDetail == null) return false;

        cityDetail.IsDeleted = true;
        cityDetail.ModifiedDate = DateTime.UtcNow;
        
        await _context.SaveChangesAsync();
        return true;
    }

    // Mapping methods
    private static Country MapToCountryEntity(CountryMaster? countryDetail)
    {
        if (countryDetail == null) return new Country();

        return new Country
        {
            Id = countryDetail.Id,
            CountryName = countryDetail.CountryName,
            IsActive = countryDetail.IsActive,
            IsDeleted = countryDetail.IsDeleted,
            CreatedBy = countryDetail.CreatedBy,
            CreatedDate = countryDetail.CreatedDate,
            ModifiedBy = countryDetail.ModifiedBy,
            ModifiedDate = countryDetail.ModifiedDate,
            Status = countryDetail.Status,
            StatusMessage = countryDetail.StatusMessage
        };
    }

    private static State MapToStateEntity(StateMaster? stateDetail)
    {
        if (stateDetail == null) return new State();

        return new State
        {
            Id = stateDetail.Id,
            StateName = stateDetail.StateName,
            CountryId = stateDetail.CountryId,
            IsActive = stateDetail.IsActive,
            IsDeleted = stateDetail.IsDeleted,
            CreatedBy = stateDetail.CreatedBy,
            CreatedDate = stateDetail.CreatedDate,
            ModifiedBy = stateDetail.ModifiedBy,
            ModifiedDate = stateDetail.ModifiedDate,
            Status = stateDetail.Status,
            StatusMessage = stateDetail.StatusMessage,
            Country = MapToCountryEntity(stateDetail.Country)
        };
    }

    private static City MapToCityEntity(CityMaster? cityDetail)
    {
        if (cityDetail == null) return new City();

        return new City
        {
            Id = cityDetail.Id,
            CityName = cityDetail.CityName,
            CityStateId = cityDetail.CityStateId,
            IsActive = cityDetail.IsActive,
            IsDeleted = cityDetail.IsDeleted,
            CreatedBy = cityDetail.CreatedBy,
            CreatedDate = cityDetail.CreatedDate,
            ModifiedBy = cityDetail.ModifiedBy,
            ModifiedDate = cityDetail.ModifiedDate,
            Status = cityDetail.Status,
            StatusMessage = cityDetail.StatusMessage,
            State = MapToStateEntity(cityDetail.CityState)
        };
    }
}
