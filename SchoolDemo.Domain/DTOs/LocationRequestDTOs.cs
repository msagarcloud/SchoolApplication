namespace SchoolDemo.Domain.DTOs;

public class CountryRequest
{
    public string? CountryName { get; set; }
    public bool IsActive { get; set; } = true;
}

public class StateRequest
{
    public string? StateName { get; set; }
    public Guid CountryId { get; set; }
    public bool IsActive { get; set; } = true;
}

public class CityRequest
{
    public string? CityName { get; set; }
    public Guid CityStateId { get; set; }
    public bool IsActive { get; set; } = true;
}
