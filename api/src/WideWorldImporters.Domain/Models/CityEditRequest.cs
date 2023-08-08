namespace WideWorldImporters.Domain.Models;

public record CityEditRequest(int Id, string Name, int StateId, long? Population);
