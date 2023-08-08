using System.Linq.Expressions;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Specifications.CountrySpecifications;

public sealed class CityIdSpecification : Specification<City>
{
    private readonly int _id;

    public CityIdSpecification(int id)
    {
        _id = id;
    }

    public override Expression<Func<City, bool>> ToExpression()
    {
        return c => c.Id == _id;
    }
}