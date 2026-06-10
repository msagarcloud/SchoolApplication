# School Application

## Modules

### Overview
A .NET 10 solution split into clean layers: Domain, Application, Infrastructure, API, Gateway. Each project has a single responsibility.

### Projects

- **SchoolDemo.Domain**
  - Purpose: Core domain models, DTOs and public interfaces.
  - Contains: Entities, request/response types, repository and service interfaces.
  - Notes: No external dependencies; defines contracts used across the solution.

- **SchoolDemo.Application**
  - Purpose: Business logic and application services.
  - Contains: Service implementations (e.g., IUserService), mapping between domain models and responses, orchestration of repository calls.

- **SchoolDemo.Infrastructure**
  - Purpose: Data access and persistence.
  - Contains: EF Core DbContext, entity mappings, repository implementations (e.g., UserRepository, BaseRepositoryOptimized), caching and DB operations.
  - Notes: Implements interfaces defined in Domain.

- **SchoolDemo.API**
  - Purpose: Public HTTP API surface.
  - Contains: Controllers, request validation, wiring Application services, Swagger and API configuration.

- **SchoolDemo.Gateway**
  - Purpose: API gateway / reverse-proxy for external clients.
  - Contains: Routing and edge concerns (e.g., Ocelot config, aggregation, auth passthrough).

### How modules relate
- API and Gateway depend on Application and Domain.
- Application depends on Domain and calls Infrastructure via interfaces.
- Infrastructure implements repository interfaces from Domain.

### Quick start
- Build solution:
  - dotnet build SchoolApplication\\SchoolApplication.slnx
- Run a project:
  - dotnet run --project SchoolDemo.API
  - dotnet run --project SchoolDemo.Gateway

