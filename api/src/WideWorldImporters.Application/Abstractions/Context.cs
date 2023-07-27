namespace WideWorldImporters.Application.Abstractions;

public sealed class Context
{
    public Context(Guid userId, string email, string[] roles)
    {
        UserId = userId;
        Email = email;
        Roles = roles;
    }

    public Guid UserId { get; }
    public string Email { get; }
    public string[] Roles { get; }
}