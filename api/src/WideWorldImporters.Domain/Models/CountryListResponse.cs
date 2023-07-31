namespace WideWorldImporters.Domain.Models;

public record CountryListResponse(int Id, string Name, string FormalName, string Region, string Subregion, string Continent, long? Population);
