using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Commands.Cities;

public sealed class CreateCityCommand : Command
{
    public CreateCityCommand(Context context, CityCreateRequest request) : base(context)
    {
        Request = request;
    }

    public CityCreateRequest Request { get; }
}