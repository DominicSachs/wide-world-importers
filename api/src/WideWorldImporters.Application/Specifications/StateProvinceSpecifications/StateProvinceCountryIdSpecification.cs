using System.Linq.Expressions;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Specifications.CustomerSpecifications;

public sealed class StateProvinceCountryIdSpecification : Specification<StateProvince>
{
    private readonly int _countryId;

    public StateProvinceCountryIdSpecification(int countryId)
    {
        _countryId = countryId;
    }

    public override Expression<Func<StateProvince, bool>> ToExpression()
    {
        return c => c.CountryId == _countryId;
    }
}