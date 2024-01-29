using WideWorldImporters.Domain.Models;

namespace WideWorldImporters.Application.Abstractions;

public interface IAuthService
{
    Task<string?> LoginAsync(LoginRequest request, CancellationToken cancellationToken);
}
