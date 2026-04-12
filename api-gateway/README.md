# 🌐 API Gateway

Módulo encargado de actuar como punto de entrada único entre el frontend y `cart-service`.

## 🎯 Objetivo

- Centralizar solicitudes del frontend.
- Enrutar tráfico de productos y carritos hacia el microservicio.
- Mantener el gateway sin lógica de negocio.

## ⚙️ Configuración actual (HU-05)

- Puerto del gateway: `8080`
- URL objetivo de microservicio:
  - `CART_SERVICE_URL` (por defecto `http://localhost:8081`)

## 🛣️ Rutas configuradas

- `/api/products` y `/api/products/**` → `cart-service`
- `/api/carts` y `/api/carts/**` → `cart-service`

Las rutas usan `StripPrefix=1`, por lo que:

- `/api/products` llega al microservicio como `/products`
- `/api/carts` llega al microservicio como `/carts`

## 🔒 CORS

Se permite origen de frontend local:

- `http://localhost:5173`

## ✅ Regla de diseño

Este módulo no contiene lógica de negocio.  
Solo enruta y centraliza acceso.
