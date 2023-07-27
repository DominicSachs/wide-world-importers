using System.Linq.Expressions;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Specifications.CustomerSpecifications;

public class CustomerIdSpecification : Specification<Customer>
{
    private readonly int _id;

    public CustomerIdSpecification(int id)
    {
        _id = id;
    }

    public override Expression<Func<Customer, bool>> ToExpression()
    {
        return c => c.Id == _id;
    }
}