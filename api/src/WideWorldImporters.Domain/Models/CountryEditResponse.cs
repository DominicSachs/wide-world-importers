namespace WideWorldImporters.Domain.Models;

public record CountryEditResponse(int Id, string Name, string FormalName, string Region, string Subregion, string Continent, List<StateProvinceModel> States, long? Population);
