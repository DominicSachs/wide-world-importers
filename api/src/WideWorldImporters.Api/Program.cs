using WideWorldImporters.Api.Extensions;
using WideWorldImporters.Application.Extensions;
using WideWorldImporters.Application.Settings;
using WideWorldImporters.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

var appSettings = builder.Configuration.GetSection(nameof(AppSettings)).Get<AppSettings>()!;

builder.Services.AddSingleton(appSettings);
builder.Services.AddContext();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration.GetConnectionString("AppDbConnection")!);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (!string.IsNullOrEmpty(appSettings.AllowedOrigins))
{
    var origins = appSettings.AllowedOrigins.Split(";");
    app.UseCors(x => x.WithOrigins(origins).AllowAnyMethod().AllowCredentials().AllowAnyHeader());
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
