namespace WideWorldImporters.Domain.Entities;

public sealed class User : BaseEntity
{
    public string LogonName { get; set; } = default!;
    public string FullName { get; set; } = default!;
    public string EmailAddress { get; set; } = default!;
    public bool IsPermittedToLogon { get; set; }
}
