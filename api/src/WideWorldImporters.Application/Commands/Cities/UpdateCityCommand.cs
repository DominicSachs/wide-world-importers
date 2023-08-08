using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Commands.Cities;

public sealed class UpdateCityCommand : Command
{
    public UpdateCityCommand(Context context, CityEditRequest request) : base(context)
    {
        Request = request;
    }

    public CityEditRequest Request { get; }
}