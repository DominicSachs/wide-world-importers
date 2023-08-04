using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Commands.Countries;

public sealed class UpdateCountryCommand : Command
{
    public UpdateCountryCommand(Context context, CountryEditRequest request) : base(context)
    {
        Request = request;
    }

    public CountryEditRequest Request { get; }
}