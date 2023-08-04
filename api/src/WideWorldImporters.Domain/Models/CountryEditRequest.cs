namespace WideWorldImporters.Domain.Models;

public record CountryEditRequest(int Id, string Name, string FormalName, string Region, string Subregion, string Continent, List<StateProvinceModel> States, long? Population);
