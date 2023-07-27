using System.Linq.Expressions;

namespace WideWorldImporters.Application.Specifications;

public abstract class Specification<T>
{
    public abstract Expression<Func<T, bool>> ToExpression();

    public bool IsSatisfiedBy(T entity)
    {
        var predicate = ToExpression().Compile();

        return predicate(entity);
    }

    public Specification<T> And(Specification<T> specification)
    {
        return new AndSpecification<T>(this, specification);
    }

    public Specification<T> Or(Specification<T> specification)
    {
        return new OrSpecification<T>(this, specification);
    }

    public Specification<T> Negate()
    {
        return new NotSpecification<T>(this);
    }

    public static Specification<T> operator !(Specification<T> specification)
    {
        return specification.Negate();
    }
}