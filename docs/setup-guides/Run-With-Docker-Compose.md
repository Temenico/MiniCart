# 🚀 Run MiniCart With Docker Compose

## 🎯 Purpose

Run the complete MiniCart platform with a single command.

## ✅ Prerequisites

- Docker Desktop (or Docker Engine + Compose)

## ▶️ Start full platform

From repository root:

```bash
docker compose up -d --build
```

Services started:

- `postgres` (PostgreSQL)
- `liquibase` (database migrations)
- `cart-service` (business microservice)
- `api-gateway` (frontend entrypoint)
- `frontend` (web application)

## 🔌 Ports

- Frontend: `http://localhost:5273`
- API Gateway: `http://localhost:8090`
- Cart Service: `http://localhost:8091`
- PostgreSQL (host): `localhost:5443`

## 🧪 Basic verification

1. Open `http://localhost:5273`
2. Check gateway health: `http://localhost:8090/actuator/health`
3. Check products via gateway: `http://localhost:8090/api/products`

## 🛑 Stop platform

```bash
docker compose down
```

## ♻️ Full reset (including database volume)

```bash
docker compose down -v
docker compose up -d --build
```
