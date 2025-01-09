using System.Linq.Expressions;

namespace WideWorldImporters.Application.Specifications;

public sealed class EmptySpecification<T> : Specification<T>
{
    public override Expression<Func<T, bool>> ToExpression()
    {
        return _ => true;
    }
}
