# 📄 DocMgmt Backend

A scalable, modular, and production-ready **Document Management System** backend built with **Node.js**, **Express**, **TypeScript**, **Prisma**, and **PostgreSQL**.  
Includes JWT authentication, role-based access, file uploads, rate limiting, logging, and Swagger API docs.

---

## 🚀 Getting Started

### 1. **Clone the Repository**

```sh
git clone https://github.com/your-org/docmgmt-backend.git
cd docmgmt-backend
```

---

### 2. **Environment Variables**

Copy `.env.example` to `.env` and fill in your secrets and config:

```sh
cp .env.example .env
```

**Key variables:**

| Variable                | Description                        |
|-------------------------|------------------------------------|
| `PORT`                  | Server port (default: 3300)        |
| `DATABASE_URL`          | PostgreSQL connection string       |
| `JWT_SECRET`            | JWT signing secret                 |
| `RATE_LIMIT_WINDOW_MS`  | Rate limit window (ms)             |
| `RATE_LIMIT_MAX`        | Max requests per window            |
| ...                     | (Add S3, CORS, etc. as needed)     |

---

### 3. **Start with Docker**

Build and run the app, database, and seed data:

```sh
docker compose up --build
```

- The app will run migrations, seed 1000 users and 100,000 documents, and start the server.

---

### 4. **Where is the Server Running?**

- **API Base URL:** [http://localhost:3300/api](http://localhost:3300/api)
- **Swagger Docs:** [http://localhost:3300/api/docs](http://localhost:3300/api/docs)
- **Health Check:** [http://localhost:3300/ping](http://localhost:3300/ping)

---

## 🛠️ Tech Stack & Architecture

- **Node.js** & **Express**: Fast, unopinionated web server.
- **TypeScript**: Type safety and modern JS features.
- **Prisma ORM**: Type-safe DB access, migrations, and seeding.
- **PostgreSQL**: Reliable, scalable relational database.
- **JWT**: Secure authentication and role-based authorization.
- **Multer**: File upload handling (pluggable to S3, etc.).
- **Winston**: Centralized, configurable logging.
- **express-rate-limit**: Protects APIs from abuse.
- **Swagger (OpenAPI)**: Auto-generated, interactive API docs.
- **Jest & Supertest**: Robust testing for all modules.
- **Docker**: Containerized, reproducible deployments.

---

## 🏗️ Code Structure

```
src/
  modules/
    auth/       # Auth logic (routes, controller, service, validator)
    user/       # User management (admin, roles)
    document/   # Document CRUD, upload, ownership
  middlewares/  # Auth, rate limiter, logger, etc.
  utils/        # Logger, JWT, file upload helpers
  __tests__/    # Jest/Supertest E2E and unit tests
  app.ts        # Express app setup (routes, middleware)
  index.ts      # Server entrypoint, graceful shutdown
prisma/
  schema.prisma # DB schema
  seed.ts       # Data seeding script (faker)
docker-compose.yml
dockerfile
.env
```

- **Modular:** Each feature is a module with its own routes, controller, service, and validator.
- **Configurable:** All secrets and config in `.env`.
- **Testable:** Mocks for file uploads, isolated DB for tests.

---

## 📚 API Documentation

- **Swagger UI:** [http://localhost:3300/api/docs](http://localhost:3300/api/docs)
- **OpenAPI Spec:** Annotated in route files using `@openapi` JSDoc comments.
- **Try endpoints, view schemas, and see error responses interactively.**

---

## 📦 Logger

- Uses **Winston** for structured logging.
- Logs to console (colorized) and files (`logs/error.log`, `logs/combined.log`).
- Log level is configurable via `.env` (`LOG_LEVEL`).
- Example usage:
  ```typescript
  import logger from "./utils/logger";
  logger.info("User created");
  logger.error("Failed to fetch document: %s", err.message);
  ```

---

## 🛡️ Rate Limiting

- **Global rate limiting** via `express-rate-limit`.
- Configurable via `.env`:
  - `RATE_LIMIT_WINDOW_MS` (default: 900000 ms = 15 min)
  - `RATE_LIMIT_MAX` (default: 100 requests)
  - `RATE_LIMIT_MESSAGE` (custom error message)
- Returns HTTP 429 if limit exceeded.

---

## ⚙️ .env Example

```
PORT=3300
DATABASE_URL=postgres://postgres:postgres@db:5432/docmgmt
JWT_SECRET=your-super-secret
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
RATE_LIMIT_MESSAGE=Too many requests from this IP, please try again later.
```

---

## 🗄️ Database

- **PostgreSQL** (Dockerized, see `docker-compose.yml`)
- Managed via **Prisma** (migrations, schema, seed)
- Seed script generates 1,000 users and 100,000 documents for demo/testing

---

## 🧑‍💻 Code Practices

- **Type-safe** everywhere (TypeScript, Prisma types)
- **Separation of concerns:** Each module handles its own logic
- **Environment-driven config:** No secrets or config hard-coded
- **Extensive testing:** E2E and unit tests for all modules
- **Scalable:** Stateless, ready for horizontal scaling, CDN/file storage ready
- **Observability:** Centralized logging, health checks, and rate limiting

---

**Happy Testing! 🚀**