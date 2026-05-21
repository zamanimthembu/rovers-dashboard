using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Rovers.API.Data;
using Rovers.API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(o =>
        o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddOpenApi();

builder.Services.AddDbContext<RoversDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Legacy in-memory service (kept for backward compatibility)
builder.Services.AddSingleton<PlayerService>();

// DB-backed services
builder.Services.AddScoped<MatchEventService>();
builder.Services.AddScoped<SeasonService>();
builder.Services.AddScoped<MatchService>();
builder.Services.AddScoped<PlayerProfileService>();
builder.Services.AddScoped<EventTypeService>();
builder.Services.AddScoped<AnalyticsService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevClient", policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

// Seed initial data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<RoversDbContext>();
    db.Database.Migrate();
    DbSeeder.Seed(db);
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Rovers API v1");
    });
}

app.UseCors("DevClient");
app.MapControllers();
app.Run();
