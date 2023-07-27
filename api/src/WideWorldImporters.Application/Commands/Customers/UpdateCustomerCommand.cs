using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Commands.Customers;

public class UpdateCustomerCommand : Command
{
    public UpdateCustomerCommand(Context context, CustomerEditRequest request) : base(context)
    {
        Request = request;
    }

    public CustomerEditRequest Request { get; }
}