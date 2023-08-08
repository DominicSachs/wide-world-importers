namespace WideWorldImporters.Domain.Models;

public record CityEditResponse(int Id, string Name, int CountryId, int StateId, long? Population);
