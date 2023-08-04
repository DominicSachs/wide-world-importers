namespace WideWorldImporters.Application.Abstractions;

public sealed class Context
{
    public Context(int userId, string email, string[] roles)
    {
        UserId = userId;
        Email = email;
        Roles = roles;
    }

    public int UserId { get; }
    public string Email { get; }
    public string[] Roles { get; }
}