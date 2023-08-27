using System.Linq.Expressions;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Specifications.CountrySpecifications;

public sealed class CitySearchSpecification : Specification<City>
{
    private readonly string _searchTerm;

    public CitySearchSpecification(string searchTerm)
    {
        _searchTerm = searchTerm;
    }

    public override Expression<Func<City, bool>> ToExpression()
    {
        return c => string.IsNullOrEmpty(_searchTerm) || c.Name.Contains(_searchTerm);
    }
}