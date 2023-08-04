using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Specifications.CustomerSpecifications;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Commands.Customers;

internal sealed class UpdateCustomerCommandHandler : ICommandHandlerAsync<UpdateCustomerCommand>
{
    private readonly IAppDbContext _context;

    public UpdateCustomerCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task HandleAsync(UpdateCustomerCommand command, CancellationToken token)
    {
        var expression = new CustomerIdSpecification(command.Request.Id).ToExpression();

        var model = await _context.Customers
            .Include(c => c.PostalAddress)
            .Include(c => c.DeliveryAddress)
            .Include(c => c.PostalCity)
            .Include(c => c.DeliveryCity)
            .SingleAsync(expression, token);

        model.Name = command.Request.Name;
        model.PhoneNumber = command.Request.Phone;
        model.FaxNumber = command.Request.Fax;
        SyncAddress(model.PostalAddress, command.Request.PostalAddress);
        SyncAddress(model.DeliveryAddress, command.Request.DeliveryAddress);
        model.PostalCity.Name = command.Request.PostalAddress.City;
        model.DeliveryCity.Name = command.Request.DeliveryAddress.City;

        await _context.SaveChangesAsync(token);
    }

    private void SyncAddress(Address address, AddressModel addressModel)
    {
        address.AddressLine1 = addressModel.AddressLine1;
        address.AddressLine2 = addressModel.AddressLine2;
        address.PostalCode = addressModel.PostalCode;
    }
}