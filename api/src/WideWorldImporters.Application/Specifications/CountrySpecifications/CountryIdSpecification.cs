using System.Linq.Expressions;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Specifications.CountrySpecifications;

public sealed class CountryIdSpecification : Specification<Country>
{
    private readonly int _id;

    public CountryIdSpecification(int id)
    {
        _id = id;
    }

    public override Expression<Func<Country, bool>> ToExpression()
    {
        return c => c.Id == _id;
    }
}