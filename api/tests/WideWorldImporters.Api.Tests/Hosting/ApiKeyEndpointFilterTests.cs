using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using WideWorldImporters.Api.Hosting;

namespace WideWorldImporters.Api.Tests.Hosting;

public sealed class ApiKeyEndpointFilterTests
{
    private readonly ApiKeyEndpointFilter _testObject = new("the-key");

    [Fact]
    public async Task Returns_Unauthorized_If_Header_Can_Not_Be_Extracted()
    {
        var httpContext = new DefaultHttpContext();
        var context = new DefaultEndpointFilterInvocationContext(httpContext);

        var result = await _testObject.InvokeAsync(context, _ => ValueTask.FromResult<object?>(Results.Empty));

        result.Should().BeOfType<UnauthorizedHttpResult>();
    }

    [Fact]
    public async Task Returns_Unauthorized_If_Api_Key_Is_Invalid()
    {
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers.Add("X-WWI-KEY", "the-invalid-key");
        var context = new DefaultEndpointFilterInvocationContext(httpContext);

        var result = await _testObject.InvokeAsync(context, _ => ValueTask.FromResult<object?>(Results.Empty));

        result.Should().BeOfType<UnauthorizedHttpResult>();
    }

    [Fact]
    public async Task Returns_Ok_If_Api_Key_Is_Valid()
    {
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers.Add("X-WWI-KEY", "the-key");
        var context = new DefaultEndpointFilterInvocationContext(httpContext);

        var result = await _testObject.InvokeAsync(context, _ => ValueTask.FromResult<object?>(Results.Ok("Test-Ok")));

        result.Should().BeOfType<Ok<string>>().Which.Value.Should().Be("Test-Ok");
    }
}
