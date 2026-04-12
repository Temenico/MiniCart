# 🛒 MiniCart

MiniCart is a modular monorepo project for building a small but complete shopping cart web application with clear boundaries between frontend, gateway, business service, database migrations, and documentation.

## 🎯 Objective

Build a maintainable shopping cart system with:

- Product management (CRUD)
- Cart and cart item management
- Automatic subtotal and total calculations
- A clear architecture that is easy to understand and evolve

## 📌 Scope

The project includes:

- Monorepo architecture
- Modular project structure
- Frontend, API Gateway, and cart service
- Database and documentation modules

### 🚫 Out of Scope

- Authentication and authorization
- Checkout and payments
- Multi-service distributed architecture
- Advanced reporting and admin features

## 🏗️ Architecture

High-level flow:

`Frontend -> API Gateway -> Cart Service -> PostgreSQL`

Modules:

- `frontend`: React + Vite user interface
- `api-gateway`: Spring Cloud Gateway routing layer
- `cart-service`: Spring Boot business service
- `database`: Liquibase and database-related assets
- `docs`: user stories, QA evidence, setup and technical notes

## 🧰 Tech Stack

- Frontend: React, Vite
- Backend: Spring Boot, Spring Data JPA, Validation
- Gateway: Spring Cloud Gateway
- Database: PostgreSQL
- Migrations: Liquibase
- Infrastructure: Docker, Docker Compose

## 🗂️ Repository Structure

```text
api-gateway/
cart-service/
frontend/
database/
docs/
docker-compose.yml
README.md
.gitignore
```

## ⚙️ Prerequisites

- Node.js 20+
- npm 10+
- Java 21
- Maven 3.9+
- Docker Desktop (or Docker Engine + Compose)

## ▶️ How To Run

### ✅ Recommended (full project)

The main execution mode is a single command for the whole platform:

```bash
docker compose up -d
```

This is the standard way to run MiniCart end-to-end.

Stop services:

```bash
docker compose down
```

### 🛠️ Development mode (module by module)

If you need to work on a specific module independently, you can run each one manually.

Frontend:

```bash
cd frontend
npm install
npm run dev
```

API Gateway:

```bash
cd api-gateway
mvn spring-boot:run
```

Cart Service:

```bash
cd cart-service
mvn spring-boot:run
```

Database:

- Use Docker Compose for PostgreSQL.
- Liquibase assets are in `database/`.

## 🧩 User Story Roadmap

1. HU-01: Repository base and initial structure
2. HU-02: Database module with Liquibase setup
3. HU-03: Product CRUD in cart-service
4. HU-04: Cart and cart-item flows in cart-service
5. HU-05: API Gateway routing integration
6. HU-06: Frontend for product management
7. HU-07: Frontend for cart management
8. HU-08: Final integration, compose, validation, and docs closure
