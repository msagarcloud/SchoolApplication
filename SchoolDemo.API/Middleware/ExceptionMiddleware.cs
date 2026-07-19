using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using SchoolDemo.Application.Exceptions;
using SchoolDemo.API.Models;

namespace SchoolDemo.API.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IWebHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IWebHostEnvironment env)
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            // Log full exception
            _logger.LogError(ex, "Unhandled exception while processing request {Method} {Path}", context.Request.Method, context.Request.Path);

            if (!context.Response.HasStarted)
            {
                context.Response.Clear();
                context.Response.ContentType = "application/json";

                // Handle validation/argument errors
                if (ex is ValidationException valEx)
                {
                    var error = new ErrorResponse { Code = "ValidationError", Message = valEx.Message, Details = _env.IsDevelopment() ? valEx.Message : null };
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    var json = JsonSerializer.Serialize(error);
                    await context.Response.WriteAsync(json);
                    return;
                }

                // Handle EF Core database update exceptions with mapping to friendly messages
                if (ex is DbUpdateException dbEx)
                {
                    var inner = dbEx.InnerException;
                    string friendlyMessage = "A database error occurred.";
                    string code = "DbUpdateError";

                    if (inner is SqlException sqlEx)
                    {
                        switch (sqlEx.Number)
                        {
                            case 547: // FK violation
                                friendlyMessage = "Operation failed due to related data (foreign key constraint). Ensure referenced records exist.";
                                code = "ForeignKeyViolation";
                                break;
                            case 2627: // Unique constraint
                            case 2601:
                                friendlyMessage = "Operation failed because a record with the same key already exists (unique constraint).";
                                code = "UniqueConstraintViolation";
                                break;
                            default:
                                friendlyMessage = "A database constraint was violated.";
                                code = "ConstraintViolation";
                                break;
                        }
                    }

                    var error = new ErrorResponse { Code = code, Message = friendlyMessage, Details = _env.IsDevelopment() ? inner?.Message : null };
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    var json = JsonSerializer.Serialize(error);
                    await context.Response.WriteAsync(json);
                    return;
                }

                // Generic unexpected errors
                var generic = new ErrorResponse { Code = "ServerError", Message = "An unexpected error occurred.", Details = _env.IsDevelopment() ? ex.Message : null };
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                var genericJson = JsonSerializer.Serialize(generic);
                await context.Response.WriteAsync(genericJson);
            }
        }
    }
}

public static class ExceptionMiddlewareExtensions
{
    public static IApplicationBuilder UseGlobalExceptionMiddleware(this IApplicationBuilder app)
    {
        return app.UseMiddleware<ExceptionMiddleware>();
    }
}
