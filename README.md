# 🛒 MiniCart

MiniCart is a modular monorepo for a complete shopping cart system with integrated frontend, gateway, business microservice, database migrations, and project documentation.

## 🎯 Objective

Deliver a maintainable and executable shopping cart platform with:

- Product management (CRUD)
- Cart and cart-item management
- Subtotal and total calculation
- Clear module boundaries and documentation

## 🏗️ Architecture

`Frontend -> API Gateway -> Cart Service -> PostgreSQL`

Modules:

- `frontend`: React + Vite interface
- `api-gateway`: Spring Cloud Gateway routing layer
- `cart-service`: Spring Boot business logic
- `database`: Liquibase changelogs and seed data
- `docs`: user stories, QA evidence, setup, and technical notes

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

## 🔌 Runtime Ports

- Frontend: `http://localhost:5273`
- API Gateway: `http://localhost:8090`
- Cart Service: `http://localhost:8091`
- PostgreSQL (host): `localhost:5443`

## ▶️ Run The Full System (recommended)

Start all modules with one command:

```bash
docker compose up -d --build
```

This command provisions and runs:

- PostgreSQL
- Liquibase migrations
- Cart Service
- API Gateway
- Frontend

Stop everything:

```bash
docker compose down
```

Stop and remove database volume (clean reset):

```bash
docker compose down -v
```

## ✅ Quick Verification

After startup:

- Open frontend: `http://localhost:5273`
- Check gateway health: `http://localhost:8090/actuator/health`
- Check products through gateway: `http://localhost:8090/api/products`

If `docker compose up -d --build` finished successfully, the project is fully integrated and ready to use.

## 📚 Key Documentation

- Setup guide:
  - [Run With Docker Compose](docs/setup-guides/Run-With-Docker-Compose.md)
- Functional and non-functional requirements (IEEE 830):
  - [Functional and Non-Functional Requirements](docs/technical-notes/Requerimientos-Funcionales-No-Funcionales.md)
- MoSCoW prioritization:
  - [MoSCoW Requirements](docs/technical-notes/Requerimientos-MoSCoW.md)
- UML diagrams:
  - [UML Diagrams](docs/diagrams/README.md)
- User stories and QA evidence:
  - [User Stories](docs/user-stories/)
  - [QA Evidence](docs/qa-evidence/)

## 🛠️ Module-by-module Development Mode

Use this only when working on a specific module locally.

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

Database and migrations:

```bash
docker compose up -d postgres liquibase
```
