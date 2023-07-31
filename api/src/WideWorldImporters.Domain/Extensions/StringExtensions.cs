namespace WideWorldImporters.Domain.Extensions;

internal static class StringExtensions
{
    public static string? FirstCharToUpper(this string? input)
    {
        return input switch
        {
            null => null,
            "" => input,
            _ => input.First().ToString().ToUpper() + input[1..]
        };
    }

}
