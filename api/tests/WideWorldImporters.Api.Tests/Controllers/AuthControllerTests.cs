using Microsoft.AspNetCore.Mvc;
using WideWorldImporters.Api.Controllers;
using WideWorldImporters.Application.Abstractions;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Api.Tests.Controllers;

public sealed class AuthControllerTests
{
    private readonly IAuthService _authService;
    private readonly AuthController _sut;

    public AuthControllerTests()
    {
        _authService = Substitute.For<IAuthService>();

        _sut = new(_authService);
    }

    [Fact]
    public async Task LoginAsync_Returns_The_Access_Token()
    {
        var request = new LoginRequest("test@example.com");

        _authService.LoginAsync(request, CancellationToken.None).Returns("token");

        var result = await _sut.Login(request, CancellationToken.None);

        var expected = new { AccessToken = "token" };

        result.Should().BeOfType<OkObjectResult>()
            .Which.Value
            .Should().BeEquivalentTo(expected);
    }

    [Fact]
    public async Task LoginAsync_Returns_Unauthorized()
    {
        var request = new LoginRequest("test@example.com");

        _authService.LoginAsync(request, CancellationToken.None).Returns((string) null!);

        var result = await _sut.Login(request, CancellationToken.None);

        result.Should().BeOfType<UnauthorizedResult>();
    }
}