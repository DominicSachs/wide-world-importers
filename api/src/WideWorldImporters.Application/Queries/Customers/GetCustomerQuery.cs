using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Queries.Customers;

public sealed class GetCustomerQuery : Query<CustomerEditResponse>
{
    public GetCustomerQuery(Context context, int id) : base(context)
    {
        Id = id;
    }

    public int Id { get; }
}