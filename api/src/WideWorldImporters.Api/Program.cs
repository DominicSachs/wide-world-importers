using HealthChecks.UI.Client;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using WideWorldImporters.Api.Extensions;
using WideWorldImporters.Api.Hosting;
using WideWorldImporters.Application.Extensions;
using WideWorldImporters.Application.Settings;
using WideWorldImporters.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

var appSettings = builder.Configuration.GetSection(nameof(AppSettings)).Get<AppSettings>()!;
var connectionString = builder.Configuration.GetConnectionString("AppDbConnection")!;

builder.Services.AddSingleton(appSettings);
builder.Services.AddContext();
builder.Services.AddHealthChecks().AddSqlServer(connectionString);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(connectionString);

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

app.UseMiddleware<ExceptionMiddleware>();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/health", new HealthCheckOptions { ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse })
   .AddEndpointFilter(new ApiKeyEndpointFilter(builder.Configuration["AppSettings:ApiKeyHealthCheck"]!));

app.Run();
