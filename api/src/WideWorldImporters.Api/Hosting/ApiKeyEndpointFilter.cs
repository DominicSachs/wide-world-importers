namespace WideWorldImporters.Api.Hosting;

public sealed class ApiKeyEndpointFilter : IEndpointFilter
{
    private readonly string _apiKey;

    public ApiKeyEndpointFilter(string apiKey)
    {
        _apiKey = apiKey;
    }

    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        if (!context.HttpContext.Request.Headers.TryGetValue("X-WWI-KEY", out var extractedKey))
        {
            return TypedResults.Unauthorized();
        }

        if (extractedKey != _apiKey)
        {
            return TypedResults.Unauthorized();
        }


        return await next(context);
    }
}