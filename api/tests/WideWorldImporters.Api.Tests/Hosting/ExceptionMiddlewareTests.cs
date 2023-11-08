using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using WideWorldImporters.Api.Hosting;

namespace WideWorldImporters.Api.Tests.Hosting;

public sealed class ExceptionMiddlewareTests
{
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddlewareTests()
    {
        _logger = Substitute.For<ILogger<ExceptionMiddleware>>();
    }

    [Fact]
    public async Task Returns_Internal_ServerError_And_Log_Exception()
    {
        var middleware = new ExceptionMiddleware(innerHttpContext => throw new Exception(), _logger);
        var context = new DefaultHttpContext { Response = { Body = new MemoryStream() } };

        await middleware.Invoke(context);

        context.Response.Body.Seek(0, SeekOrigin.Begin);

        using (var reader = new StreamReader(context.Response.Body))
        {
            var streamText = await reader.ReadToEndAsync();

            streamText.Should().BeEquivalentTo(string.Empty);
            context.Response.StatusCode.Should().Be((int) HttpStatusCode.InternalServerError);

            _logger.ReceivedWithAnyArgs().Log(default, default, default, default, default!);
        }
    }

    [Fact]
    public async Task Returns_Ok()
    {
        var middleware = new ExceptionMiddleware(innerHttpContext => Task.CompletedTask, _logger);
        var context = new DefaultHttpContext();
        var identity = new ClaimsIdentity(new[] { new Claim(JwtRegisteredClaimNames.Sub, "1") });
        context.User = new ClaimsPrincipal(identity);

        context.Response.Body = new MemoryStream();

        await middleware.Invoke(context);

        context.Response.Body.Seek(0, SeekOrigin.Begin);

        using (var reader = new StreamReader(context.Response.Body))
        {
            var streamText = await reader.ReadToEndAsync();

            streamText.Should().BeEquivalentTo(string.Empty);
            context.Response.StatusCode.Should().Be((int) HttpStatusCode.OK);

            _logger.DidNotReceiveWithAnyArgs().Log(default, default, default, default, default!);
        }
    }
}