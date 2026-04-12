# Cart Service

Microservice responsible for MiniCart business logic.

## Current Scope

- Spring Boot + Spring Data JPA setup
- PostgreSQL connectivity
- Product CRUD implementation with validation and error handling

## Product Endpoints (HU-03)

- `GET /products`
- `GET /products/{id}`
- `POST /products`
- `PUT /products/{id}`
- `DELETE /products/{id}`

## Cart Endpoints (HU-04)

- `GET /carts`
- `GET /carts/{id}`
- `POST /carts`
- `DELETE /carts/{id}`
- `POST /carts/{id}/items`
- `PUT /carts/{id}/items/{itemId}`
- `DELETE /carts/{id}/items/{itemId}`
