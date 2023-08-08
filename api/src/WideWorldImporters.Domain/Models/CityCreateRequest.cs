namespace WideWorldImporters.Domain.Models;

public record CityCreateRequest(string Name, int StateId, long? Population);
