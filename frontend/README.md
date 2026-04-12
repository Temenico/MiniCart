# 🖥️ Frontend

Módulo web de MiniCart construido con React + Vite.

## 🎯 Objetivo

Proveer una interfaz clara para gestión de productos y, posteriormente, gestión de carritos.

## ✅ Alcance implementado (HU-06)

- Vista de listado de productos.
- Formulario para crear productos.
- Formulario para editar productos.
- Acción para eliminar productos.
- Mensajes de éxito y error.
- Validaciones de campos requeridos.
- Consumo de API mediante `api-gateway`.

## 🌐 Integración con API Gateway

Por defecto el frontend consume:

- `http://localhost:8080/api`

Se puede sobrescribir con variable de entorno:

- `VITE_API_BASE_URL`

Ejemplo:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

## ▶️ Ejecución local

```bash
npm install
npm run dev
```
