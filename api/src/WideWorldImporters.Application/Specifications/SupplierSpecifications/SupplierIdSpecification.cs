using System.Linq.Expressions;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Specifications.SupplierSpecifications;

public sealed class SupplierIdSpecification : Specification<Supplier>
{
    private readonly int _id;

    public SupplierIdSpecification(int id)
    {
        _id = id;
    }

    public override Expression<Func<Supplier, bool>> ToExpression()
    {
        return c => c.Id == _id;
    }
}