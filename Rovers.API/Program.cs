using Rovers.API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSingleton<PlayerService>();
builder.Services.AddSingleton<MatchEventService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DevClient", policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

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
