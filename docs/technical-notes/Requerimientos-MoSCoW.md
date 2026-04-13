# 🧭 Priorización MoSCoW de requerimientos - MiniCart

## 1. Objetivo

Priorizar requerimientos del sistema usando MoSCoW para orientar decisiones de desarrollo, pruebas y cierre del proyecto.

## 2. Criterio de priorización aplicado

- **Must Have**: sin este punto, el sistema no cumple alcance mínimo.
- **Should Have**: aporta calidad importante, pero no bloquea operación base.
- **Could Have**: mejora valor percibido; puede diferirse sin riesgo funcional.
- **Won't Have (for now)**: explícitamente fuera de alcance de la versión actual.

## 3. Must Have (M) - imprescindible

| Código | Requerimiento |
|---|---|
| M-01 | Estructura monorepo modular (`frontend`, `api-gateway`, `cart-service`, `database`, `docs`) |
| M-02 | CRUD completo de productos |
| M-03 | Gestión completa de carritos e ítems |
| M-04 | Cálculo automático de subtotales y total de carrito |
| M-05 | Validaciones de negocio mínimas (nombre/precio/stock/cantidad/recursos existentes) |
| M-06 | Integración funcional `frontend -> gateway -> service -> db` |
| M-07 | Migraciones y datos semilla con Liquibase |
| M-08 | Ejecución integral por `docker compose` |
| M-09 | Documentación final técnica y funcional actualizada |

## 4. Should Have (S) - importante

| Código | Requerimiento |
|---|---|
| S-01 | UI clara y responsiva en dispositivos comunes |
| S-02 | Mensajes de éxito/error amigables y consistentes |
| S-03 | Validación técnica de cierre (`npm build`, pruebas backend) |
| S-04 | Guía de ejecución rápida y validación post-arranque |
| S-05 | Endpoint de salud en gateway para verificación operativa |

## 5. Could Have (C) - deseable a futuro

| Código | Requerimiento |
|---|---|
| C-01 | Filtros y búsqueda de productos |
| C-02 | Ordenamiento por nombre, precio o stock |
| C-03 | Paginación de listados |
| C-04 | Mejoras visuales adicionales (animaciones/toasts avanzados) |
| C-05 | Exportación simple de datos de catálogo/carrito |

## 6. Won't Have For Now (W) - fuera de alcance actual

| Código | Requerimiento |
|---|---|
| W-01 | Autenticación y autorización (JWT/roles) |
| W-02 | Registro y gestión de usuarios |
| W-03 | Checkout real y pasarela de pagos |
| W-04 | Gestión formal de órdenes post-compra |
| W-05 | Inventario distribuido y reservas avanzadas |
| W-06 | Notificaciones y mensajería |
| W-07 | Reportería analítica avanzada |

## 7. Nota de control de alcance

Si un requerimiento no está en **Must Have** o **Should Have** para esta versión, no debe bloquear el cierre de HU-08 ni la validación final del proyecto.
