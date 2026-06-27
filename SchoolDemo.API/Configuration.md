# Configuration Files

This project uses environment-specific configuration files for different deployment environments.

## Configuration Files

### appsettings.json
- **Purpose**: Base configuration file with common settings
- **Used by**: All environments
- **Contains**: Logging levels, allowed hosts, and other common settings

### appsettings.Development.json
- **Purpose**: Development environment specific settings
- **Used by**: Development environment (ASPNETCORE_ENVIRONMENT=Development)
- **Contains**: Development database connection string and debug logging

### appsettings.Production.json
- **Purpose**: Production environment specific settings
- **Used by**: Production environment (ASPNETCORE_ENVIRONMENT=Production)
- **Contains**: Production database connection string and production logging levels

### appsettings.Local.json
- **Purpose**: Local development specific settings (gitignored)
- **Used by**: Local development when needed
- **Contains**: Local database connection string for testing

## Connection String Configuration

### Development
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=SAGAR\\SQL2025;Database=SchoolWebPortal;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

### Production
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=PRODUCTION_SERVER;Database=SchoolWebPortal_Production;User Id=your_username;Password=your_password;TrustServerCertificate=true;"
  }
}
```

### Local
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=SAGAR\\SQL2025;Database=SchoolWebPortal_Local;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

## Environment Variables

Set the environment variable to control which configuration file is used:

- **Windows**: `set ASPNETCORE_ENVIRONMENT=Development`
- **PowerShell**: `$env:ASPNETCORE_ENVIRONMENT="Development"`
- **Linux/Mac**: `export ASPNETCORE_ENVIRONMENT=Development`

## Configuration Loading Order

ASP.NET Core loads configuration files in this order:
1. appsettings.json
2. appsettings.{Environment}.json
3. User secrets
4. Environment variables
5. Command line arguments

Later configurations override earlier ones.

## Security Notes

- **appsettings.Local.json** should be added to .gitignore
- Production connection strings should use proper authentication
- Never commit production passwords to version control
- Use User Secrets for sensitive data in production
