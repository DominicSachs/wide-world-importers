using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Entities;

namespace WideWorldImporters.Application.Commands.Cities;

internal sealed class CreateCityCommandHandler : ICommandHandlerAsync<CreateCityCommand>
{
    private readonly IAppDbContext _context;

    public CreateCityCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task HandleAsync(CreateCityCommand command, CancellationToken token)
    {
        var city = new City
        {
            Name = command.Request.Name,
            LatestRecordedPopulation = command.Request.Population,
            StateProvinceId = command.Request.StateId,
            LastEditedById = command.Context.UserId
        };

        _context.Cities.Add(city);

        await _context.SaveChangesAsync(token);
    }
}