using System.Net;

namespace WideWorldImporters.Api.Hosting;

public sealed class ExceptionMiddleware
{
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleUnhandledError(context, ex);
        }
    }

    private Task HandleUnhandledError(HttpContext context, Exception exception)
    {
        _logger.LogError(exception, "Unhandled Error");

        context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

        return context.Response.WriteAsync(string.Empty);
    }
}
