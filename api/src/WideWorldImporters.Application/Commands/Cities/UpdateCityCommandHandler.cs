using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Commands.Cities;
using WideWorldImporters.Application.Specifications.CountrySpecifications;

namespace WideWorldImporters.Application.Commands.Customers;

internal sealed class UpdateCityCommandHandler : ICommandHandlerAsync<UpdateCityCommand>
{
    private readonly IAppDbContext _context;

    public UpdateCityCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task HandleAsync(UpdateCityCommand command, CancellationToken token)
    {
        var expression = new CityIdSpecification(command.Request.Id).ToExpression();
        var city = await _context.Cities.SingleAsync(expression, token);

        city.Name = command.Request.Name;
        city.StateProvinceId = command.Request.StateId;
        city.LatestRecordedPopulation = command.Request.Population;

        await _context.SaveChangesAsync(token);
    }
}