using Microsoft.EntityFrameworkCore;
using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Abstractions;

internal class AuthService : IAuthService
{
    private readonly IAppDbContext _context;
    private readonly ITokenService _tokenService;

    public AuthService(IAppDbContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<string?> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
    {
        var result = await _context.Users
            .Where(u => u.IsPermittedToLogon && u.LogonName.ToLower() == request.Email.ToLower())
            .Select(u => new { u.Id, u.EmailAddress })
            .SingleOrDefaultAsync(cancellationToken);

        return result == null ? null : _tokenService.GetToken(result.Id, result.EmailAddress);
    }
}
