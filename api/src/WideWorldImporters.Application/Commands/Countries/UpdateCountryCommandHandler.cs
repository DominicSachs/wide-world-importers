using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Application.Commands.Countries;
using WideWorldImporters.Application.Specifications.CountrySpecifications;
using WideWorldImporters.Domain.Entities;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Commands.Customers;

internal sealed class UpdateCountryCommandHandler : ICommandHandlerAsync<UpdateCountryCommand>
{
    private readonly IAppDbContext _context;

    public UpdateCountryCommandHandler(IAppDbContext context)
    {
        _context = context;
    }

    public async Task HandleAsync(UpdateCountryCommand command, CancellationToken token)
    {
        var expression = new CountryIdSpecification(command.Request.Id).ToExpression();
        var country = await _context.Countries.Include(c => c.StateProvinces).SingleAsync(expression, token);

        country.Name = command.Request.Name;
        country.FormalName = command.Request.FormalName;
        country.Subregion = command.Request.Subregion;
        country.Region = command.Request.Region;
        country.Continent = command.Request.Continent;
        country.LatestRecordedPopulation = command.Request.Population;

        SyncStates(command.Context, country, command.Request.States);

        await _context.SaveChangesAsync(token);
    }

    private void SyncStates(Context context, Country country, List<StateProvinceModel> statesToUpdate)
    {
        var newStates = statesToUpdate
            .Where(s => s.Id == 0)
            .Select(s => new StateProvince
            {
                Code = s.Code,
                Name = s.Name,
                SalesTerritory = s.SalesTerritory,
                Population = s.Population,
                LastEditedById = context.UserId
            });

        var grouped = statesToUpdate.GroupBy(s => s.Id == 0);

        for (int i = country.StateProvinces.Count - 1; i >= 0; i--)
        {
            var state = country.StateProvinces[i];
            if (!statesToUpdate.Any(s => s.Id == state.Id))
            {
                country.StateProvinces.Remove(state);
            }
        }

        foreach (var state in statesToUpdate)
        {
            var stateToUpdate = country.StateProvinces.SingleOrDefault(e => e.Id == state.Id);

            if (stateToUpdate != null)
            {
                stateToUpdate.Name = state.Name;
                stateToUpdate.Code = state.Code;
                stateToUpdate.SalesTerritory = state.SalesTerritory;
                stateToUpdate.Population = state.Population;
                stateToUpdate.LastEditedById = context.UserId;
            }
        }

        country.StateProvinces.AddRange(newStates);
    }
}