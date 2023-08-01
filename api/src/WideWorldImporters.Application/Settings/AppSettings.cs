using System.Diagnostics.CodeAnalysis;

namespace WideWorldImporters.Application.Settings;

[ExcludeFromCodeCoverage]
public sealed class AppSettings
{
    public string AllowedOrigins { get; set; } = default!;
}
