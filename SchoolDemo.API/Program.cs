using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SchoolDemo.Application.Services;
using SchoolDemo.Domain.Entities;
using SchoolDemo.Domain.Interfaces;
using SchoolDemo.Infrastructure.Data;
using SchoolDemo.Infrastructure.Data.SeedData;
using SchoolDemo.Infrastructure.Repositories;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

string BuildConnectionString()
{
    static string EnsureConnectTimeout(string connectionString, int seconds)
    {
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            return connectionString;
        }

        var timeoutToken = "Connect Timeout=";
        if (connectionString.Contains(timeoutToken, StringComparison.OrdinalIgnoreCase) ||
            connectionString.Contains("Connection Timeout=", StringComparison.OrdinalIgnoreCase))
        {
            return connectionString;
        }

        return connectionString.TrimEnd(';') + $";Connect Timeout={seconds};";
    }

    static string ReplaceServer(string connectionString, string serverName)
    {
        var builder = new SqlConnectionStringBuilder(connectionString)
        {
            DataSource = serverName
        };

        return builder.ConnectionString;
    }

    static bool CanOpen(string connectionString)
    {
        try
        {
            using var connection = new SqlConnection(connectionString);
            connection.Open();
            return true;
        }
        catch
        {
            return false;
        }
    }

    // Highest priority: explicit value from configuration/environment.
    var configuredConnection = builder.Configuration.GetConnectionString("DefaultConnection");
    if (!string.IsNullOrWhiteSpace(configuredConnection) &&
        !configuredConnection.Contains("Auto-detected", StringComparison.OrdinalIgnoreCase))
    {
        var safeConfiguredConnection = EnsureConnectTimeout(configuredConnection, 5);
        if (CanOpen(safeConfiguredConnection))
        {
            return safeConfiguredConnection;
        }

        // Configured SQL host may be machine-specific from another checkout; avoid dead-ending on it.
        var sqlExpressFallback = EnsureConnectTimeout(ReplaceServer(safeConfiguredConnection, @".\SQLEXPRESS"), 5);
        if (CanOpen(sqlExpressFallback))
            return sqlExpressFallback;

        var localDbFallback = EnsureConnectTimeout(ReplaceServer(safeConfiguredConnection, @"(localdb)\MSSQLLocalDB"), 5);
        if (CanOpen(localDbFallback))
            return localDbFallback;

        Console.WriteLine("Warning: DefaultConnection failed to open or fall back locally; continuing with automatic server detection.");

        // Do not return `safeConfiguredConnection` here — EF would stall every request behind long SQL timeouts / retries.
    }

    // Optional override via env var when running on new machines.
    var envConnection = Environment.GetEnvironmentVariable("SCHOOLDEMO_DB_CONNECTION");
    if (!string.IsNullOrWhiteSpace(envConnection))
    {
        return EnsureConnectTimeout(envConnection, 5);
    }

    string machineName = Environment.MachineName.ToUpper();
    string serverName;
    string databaseName = builder.Configuration["SqlServerSettings:DatabaseName"] ?? "SchoolWebPortal";
    bool useTrustedConnection = bool.Parse(builder.Configuration["SqlServerSettings:UseTrustedConnection"] ?? "true");
    bool trustServerCertificate = bool.Parse(builder.Configuration["SqlServerSettings:TrustServerCertificate"] ?? "true");

    //DESKTOP-NSCVSLM
    // Map machine names to SQL server instances
    if (machineName.Contains("SAGAR"))
    {
        serverName = "SAGAR";
    }
    else if (machineName.Contains("DESKTOP-NSCVSLM"))
    {
        serverName = "DESKTOP-NSCVSLM";
    }
    else
    {
        // Use local default SQL instance for non-listed machines.
        serverName = ".\\SQLEXPRESS";
    }

    string connectionString = $"Server={serverName};Database={databaseName};Trusted_Connection={useTrustedConnection};TrustServerCertificate={trustServerCertificate};Connect Timeout=5;";

    // Log the connection details (remove sensitive info in production)
    Console.WriteLine($"Machine Name: {machineName}");
    Console.WriteLine($"SQL Server: {serverName}");
    Console.WriteLine($"Database: {databaseName}");

    return connectionString;
}

// Configure logging
builder.Logging.SetMinimumLevel(LogLevel.Warning);
builder.Logging.ClearProviders();

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

builder.Services.AddHttpContextAccessor();
builder.Services.AddMemoryCache();
builder.Services.AddOutputCache(options =>
{
    options.AddPolicy("DefaultPolicy", builder => builder.Expire(TimeSpan.FromSeconds(60)));
    options.AddPolicy("LongCachePolicy", builder => builder.Expire(TimeSpan.FromMinutes(5)));
});
builder.Services.AddEndpointsApiExplorer();
// Swagger configuration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() 
    { 
        Title = "School Demo API", 
        Version = "v1",
        Description = "API documentation for School Demo application"
    });

    // JWT Swagger configuration will be added later
    // TODO: Add JWT Authentication to Swagger when correct package is available
});

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000", 
                          "http://localhost:5173", "https://localhost:5173",
                          "http://127.0.0.1:3000", "https://127.0.0.1:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
              .SetIsOriginAllowedToAllowWildcardSubdomains();
    });
});

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? "YourSuperSecretKeyHere123456789012345678901234567890";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "SchoolPortalAPI";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "SchoolPortalUsers";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ClockSkew = TimeSpan.Zero
    };
});

// Database context (factory enables parallel read-only queries, e.g. cascaded location data)
var connectionString = BuildConnectionString();
builder.Services.AddDbContextPool<SchoolDbContext>(
    options => options.UseSqlServer(connectionString, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 3,
            maxRetryDelay: TimeSpan.FromSeconds(2),
            errorNumbersToAdd: null);
        sqlOptions.CommandTimeout(30);
    }),
    poolSize: 128);

builder.Services.AddPooledDbContextFactory<SchoolDbContext>(
    options => options.UseSqlServer(connectionString, sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 3,
            maxRetryDelay: TimeSpan.FromSeconds(2),
            errorNumbersToAdd: null);
        sqlOptions.CommandTimeout(30);
    }),
    poolSize: 64);

// Repository registrations
builder.Services.AddScoped<IUserRepository, UserRepositoryOptimized>();
builder.Services.AddScoped<IStudentRepository, StudentRepositoryOptimized>();
builder.Services.AddScoped<ICompanyRepository, CompanyRepository>();
builder.Services.AddScoped<ILocationRepository, LocationRepository>();
builder.Services.AddScoped<ISchoolRepository, SchoolRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IEmployeeDocumentRepository, EmployeeDocumentRepository>();
builder.Services.AddScoped<IEmployeeLeaveRepository, EmployeeLeaveRepository>();
builder.Services.AddScoped<IEmployeeProfessionalQualificationRepository, EmployeeProfessionalQualificationRepository>();
builder.Services.AddScoped<IEmployeeSalaryMasterRepository, EmployeeSalaryMasterRepository>();
builder.Services.AddScoped<IEmployeeSalaryDetailRepository, EmployeeSalaryDetailRepository>();
builder.Services.AddScoped<IClassRepository, ClassRepository>();
builder.Services.AddScoped<ISectionRepository, SectionRepository>();
builder.Services.AddScoped<IClassRoomRepository, ClassRoomRepository>();
builder.Services.AddScoped<IClassSectionDetailRepository, ClassSectionDetailRepository>();
builder.Services.AddScoped<ISubjectRepository, SubjectRepository>();
builder.Services.AddScoped<IClassSubjectDetailRepository, ClassSubjectDetailRepository>();
builder.Services.AddScoped<ITeacherSectionDetailRepository, TeacherSectionDetailRepository>();
builder.Services.AddScoped<ITeacherSubjectDetailRepository, TeacherSubjectDetailRepository>();
builder.Services.AddScoped<ITeacherMasterRepository, TeacherMasterRepository>();
builder.Services.AddScoped<IDriverMasterRepository, DriverMasterRepository>();
builder.Services.AddScoped<ICleanerMasterRepository, CleanerMasterRepository>();
builder.Services.AddScoped<IEmpCategoryRepository, EmpCategoryRepository>();
builder.Services.AddScoped<IDesigRepository, DesigRepository>();
builder.Services.AddScoped<IDeptRepository, DeptRepository>();
builder.Services.AddScoped<IEmpTypeRepository, EmpTypeRepository>();

// Master entity repositories
builder.Services.AddScoped<IBloodGroupRepository, BloodGroupRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IFeesCategoryRepository, FeesCategoryRepository>();
builder.Services.AddScoped<IFeesDiscountCategoryRepository, FeesDiscountCategoryRepository>();
builder.Services.AddScoped<IEnquiryRepository, EnquiryRepository>();
builder.Services.AddScoped<IParentRepository, ParentRepository>();
builder.Services.AddScoped<ITimeTablePeriodRepository, TimeTablePeriodRepository>();
builder.Services.AddScoped<IGenderRepository, GenderRepository>();
builder.Services.AddScoped<IGradeRepository, GradeRepository>();
builder.Services.AddScoped<IHolidayRepository, HolidayRepository>();
builder.Services.AddScoped<IHolidayTypeRepository, HolidayTypeRepository>();
builder.Services.AddScoped<IHouseRepository, HouseRepository>();
builder.Services.AddScoped<ILeaveTypeRepository, LeaveTypeRepository>();
builder.Services.AddScoped<IPaymentModeRepository, PaymentModeRepository>();
builder.Services.AddScoped<IQualificationRepository, QualificationRepository>();
builder.Services.AddScoped<IProfessionRepository, ProfessionRepository>();
builder.Services.AddScoped<IRelationTypeRepository, RelationTypeRepository>();
builder.Services.AddScoped<IReligionRepository, ReligionRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IMenuMasterRepository, MenuMasterRepository>();
builder.Services.AddScoped<ISalaryHeadRepository, SalaryHeadRepository>();
builder.Services.AddScoped<ISalaryTypeRepository, SalaryTypeRepository>();
builder.Services.AddScoped<ISessionRepository, SessionRepository>();
builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
builder.Services.AddScoped<IVehicleTypeRepository, VehicleTypeRepository>();
builder.Services.AddScoped<IVisitorRepository, VisitorRepository>();
builder.Services.AddScoped<IPrivilegeRepository, PrivilegeRepository>();
builder.Services.AddScoped<IRolePrivilegeRepository, RolePrivilegeRepository>();
builder.Services.AddScoped<IVoucherRepository, VoucherRepository>();
builder.Services.AddScoped<IVendorRepository, VendorRepository>();
builder.Services.AddScoped<ISupplierRepository, SupplierRepository>();
builder.Services.AddScoped<ISystemParameterRepository, SystemParameterRepository>();
builder.Services.AddScoped<IAssesmentMasterRepository, AssesmentMasterRepository>();

// Transport entity repositories
builder.Services.AddScoped<IRouteMasterRepository, RouteMasterRepository>();
builder.Services.AddScoped<ITransportAssignmentRepository, TransportAssignmentRepository>();
builder.Services.AddScoped<ITransportSettingRepository, TransportSettingRepository>();
builder.Services.AddScoped<ITransportHelpRepository, TransportHelpRepository>();

// Service registrations
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<ISchoolService, SchoolService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IEmployeeDocumentService, EmployeeDocumentService>();
builder.Services.AddScoped<IEmployeeLeaveService, EmployeeLeaveService>();
builder.Services.AddScoped<IEmployeeProfessionalQualificationService, EmployeeProfessionalQualificationService>();
builder.Services.AddScoped<IEmployeeSalaryMasterService, EmployeeSalaryMasterService>();
builder.Services.AddScoped<IEmployeeSalaryDetailService, EmployeeSalaryDetailService>();
builder.Services.AddScoped<IEmployeeSalaryStructureDetailService, EmployeeSalaryStructureDetailService>();
builder.Services.AddScoped<IEmployeeSalaryStructureDetailRepository, EmployeeSalaryStructureDetailRepository>();
builder.Services.AddScoped<IClassService, ClassService>();
builder.Services.AddScoped<ISectionService, SectionService>();
builder.Services.AddScoped<IClassRoomService, ClassRoomService>();
builder.Services.AddScoped<IClassSectionDetailService, ClassSectionDetailService>();
builder.Services.AddScoped<ISubjectService, SubjectService>();
builder.Services.AddScoped<IClassSubjectDetailService, ClassSubjectDetailService>();
builder.Services.AddScoped<ITeacherSectionDetailService, TeacherSectionDetailService>();
builder.Services.AddScoped<ITeacherSubjectDetailService, TeacherSubjectDetailService>();
builder.Services.AddScoped<ITeacherMasterService, TeacherMasterService>();
builder.Services.AddScoped<IDriverMasterService, DriverMasterService>();

// Master entity services
builder.Services.AddScoped<IBloodGroupService, BloodGroupService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IFeesCategoryService, FeesCategoryService>();
builder.Services.AddScoped<IFeesDiscountCategoryService, FeesDiscountCategoryService>();
builder.Services.AddScoped<IEnquiryService, EnquiryService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<IParentService, ParentService>();
builder.Services.AddScoped<ITimeTablePeriodService, TimeTablePeriodService>();
builder.Services.AddScoped<IGenderService, GenderService>();
builder.Services.AddScoped<IGradeService, GradeService>();
builder.Services.AddScoped<IHolidayService, HolidayService>();
builder.Services.AddScoped<IHolidayTypeService, HolidayTypeService>();
builder.Services.AddScoped<IHouseService, HouseService>();
builder.Services.AddScoped<ILeaveTypeService, LeaveTypeService>();
builder.Services.AddScoped<IPaymentModeService, PaymentModeService>();
builder.Services.AddScoped<IQualificationService, QualificationService>();
builder.Services.AddScoped<IProfessionService, ProfessionService>();
builder.Services.AddScoped<IRelationTypeService, RelationTypeService>();
builder.Services.AddScoped<IReligionService, ReligionService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<ISalaryHeadService, SalaryHeadService>();
builder.Services.AddScoped<ISalaryTypeService, SalaryTypeService>();
builder.Services.AddScoped<ISessionService, SessionService>();
builder.Services.AddScoped<IVehicleService, VehicleService>();
builder.Services.AddScoped<IVehicleTypeService, VehicleTypeService>();
builder.Services.AddScoped<IVisitorService, VisitorService>();
builder.Services.AddScoped<IDeptService, DeptService>();
builder.Services.AddScoped<IDesigService, DesigService>();
builder.Services.AddScoped<IEmpTypeService, EmpTypeService>();
builder.Services.AddScoped<IPrivilegeService, PrivilegeService>();
builder.Services.AddScoped<IRolePrivilegeService, RolePrivilegeService>();
builder.Services.AddScoped<IVoucherService, VoucherService>();

// Transport entity services
builder.Services.AddScoped<IRouteMasterService, RouteMasterService>();
builder.Services.AddScoped<ITransportAssignmentService, TransportAssignmentService>();
builder.Services.AddScoped<ITransportSettingService, TransportSettingService>();
builder.Services.AddScoped<ITransportHelpService, TransportHelpService>();

// Additional services
builder.Services.AddScoped<IVendorService, VendorService>();
builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddScoped<ISystemParameterService, SystemParameterService>();
builder.Services.AddScoped<IAssesmentMasterService, AssesmentMasterService>();

var app = builder.Build();

// Register global exception middleware early in the pipeline
app.UseMiddleware<SchoolDemo.API.Middleware.ExceptionMiddleware>();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "School Demo API V1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("AllowReactApp");
app.UseOutputCache();
//app.UseHttpsRedirection(); // Commented out to allow HTTP requests from React app
app.UseAuthentication();
app.UseAuthorization();

// Seed menu data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<SchoolDbContext>();
    try
    {
        await MenuMasterSeed.SeedMenuDataAsync(context);
        Console.WriteLine("Menu data seeded successfully.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error seeding menu data: {ex.Message}");
    }
}

app.MapControllers();

app.MapGet("/api/health", () =>
    Results.Json(new { status = "healthy", utc = DateTime.UtcNow }))
    .WithTags("Diagnostics");

await app.RunAsync();
