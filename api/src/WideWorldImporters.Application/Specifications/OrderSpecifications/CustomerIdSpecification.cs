using System.Linq.Expressions;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Specifications.OrderSpecifications;

public sealed class CustomerIdSpecification : Specification<Order>
{
    private readonly int _id;

    public CustomerIdSpecification(int id)
    {
        _id = id;
    }

    public override Expression<Func<Order, bool>> ToExpression()
    {
        return c => c.CustomerId == _id;
    }
}