# 🖥️ Frontend

Módulo web de MiniCart construido con React + Vite.

## 🎯 Objetivo

Proveer una interfaz clara para gestión de productos y carritos.

## ✅ Alcance implementado (HU-06 y HU-07)

- Vista de listado de productos.
- Formulario para crear productos.
- Formulario para editar productos.
- Acción para eliminar productos.
- Vista para gestionar carritos.
- Acción para crear y seleccionar carrito.
- Acción para agregar productos al carrito.
- Acción para actualizar cantidades de ítems.
- Acción para eliminar ítems del carrito.
- Visualización de subtotal por ítem y total del carrito.
- Mensajes de éxito y error.
- Validaciones de campos requeridos.
- Consumo de API mediante `api-gateway`.

## 🌐 Integración con API Gateway

Por defecto el frontend consume:

- `http://localhost:8090/api`

Se puede sobrescribir con variable de entorno:

- `VITE_API_BASE_URL`

Ejemplo:

```bash
VITE_API_BASE_URL=http://localhost:8090/api
```

## 🔌 Puertos por defecto del proyecto

- Frontend (Vite): `5273`
- API Gateway: `8090`
- Cart Service: `8091`
- PostgreSQL (host): `5443`

## ▶️ Ejecución local

```bash
npm install
npm run dev
```
