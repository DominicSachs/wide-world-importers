namespace WideWorldImporters.Application.Abstractions;

public interface ITokenService
{
    string GetToken(int userId, string emailAddress);
}
