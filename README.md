# SchoolApplication
ERP System for School Management System
•	Overview: .NET 10 solution split by clean layers: Domain, Application, Infrastructure, API, Gateway. Each project has a single responsibility and these can be shown as a "Modules" section in the repo README.
•	SchoolDemo.Domain
•	Purpose: Core domain models, DTOs and public interfaces (entities, request/response types, repository/service interfaces).
•	Responsibilities: Define contracts and types used across the solution; no external dependencies.
•	SchoolDemo.Application
•	Purpose: Business logic and application services implementing domain use-cases.
•	Responsibilities: Service implementations (IUserService, IRoleService, etc.), mapping between domain models and responses, orchestration of repository calls.
•	SchoolDemo.Infrastructure
•	Purpose: Data access and persistence layer.
•	Responsibilities: EF Core DbContext, entity mappings, repository implementations (UserRepository, BaseRepositoryOptimized, etc.), caching and DB operations.
•	SchoolDemo.API
•	Purpose: Public HTTP API surface for clients.
•	Responsibilities: Controllers, request validation, wiring Application services, API-specific configuration (Swagger, auth, routing).
•	SchoolDemo.Gateway
•	Purpose: API gateway / reverse-proxy (entry point for external clients).
•	Responsibilities: Routing, aggregation, edge concerns (rate limiting, authentication passthrough), configuration (Ocelot or equivalent).
•	Notes
•	Build: dotnet build SchoolApplication\SchoolApplication.slnx (targets .NET 10)
•	How modules relate: API and Gateway depend on Application and Domain; Application depends on Domain and uses Infrastructure via interfaces; Infrastructure implements Domain repository interfaces.
