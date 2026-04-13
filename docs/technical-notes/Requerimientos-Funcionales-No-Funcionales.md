# 📌 Especificación de Requerimientos de Software (SRS) - MiniCart

Formato basado en IEEE 830.

## 1. Introducción

### 1.1 Propósito

Definir de manera formal los requerimientos funcionales y no funcionales del sistema **MiniCart**, para guiar desarrollo, validación y cierre técnico del proyecto.

### 1.2 Alcance

MiniCart es una aplicación web de carrito de compras con arquitectura modular:

- `frontend`
- `api-gateway`
- `cart-service`
- `database`
- `docs`

Flujo principal:

`frontend -> api-gateway -> cart-service -> PostgreSQL`

### 1.3 Definiciones, acrónimos y abreviaturas

- **SRS**: Software Requirements Specification.
- **RF**: Requerimiento funcional.
- **RNF**: Requerimiento no funcional.
- **CRUD**: Create, Read, Update, Delete.
- **API Gateway**: punto único de entrada para el frontend.
- **Liquibase**: herramienta de versionado de base de datos.

### 1.4 Referencias

- Historias de usuario HU-01 a HU-08.
- Documentación del repositorio en `README.md` y `docs/`.

### 1.5 Visión general del documento

- Sección 2: descripción general del producto.
- Sección 3: requerimientos específicos (funcionales y no funcionales).

## 2. Descripción general

### 2.1 Perspectiva del producto

MiniCart es un sistema autónomo para práctica académica/técnica. No depende de módulos externos de pago o autenticación para su operación base.

### 2.2 Funciones del producto

- Gestión de productos.
- Gestión de carritos e ítems.
- Cálculo automático de subtotales y total.
- Persistencia en PostgreSQL.
- Migraciones y semillas con Liquibase.
- Ejecución integral con Docker Compose.

### 2.3 Características de usuarios

- **Usuario**: gestiona productos y carrito de compras.

### 2.4 Restricciones generales

- Monorepo único con estructura definida.
- `api-gateway` sin lógica de negocio.
- Changelogs de Liquibase en `database/`.

### 2.5 Supuestos y dependencias

- El carrito es intención de compra, no reserva avanzada de inventario.
- PostgreSQL y Docker Compose están disponibles en ambiente local.
- Validación fuerte de negocio se ejecuta en backend.

## 3. Requerimientos específicos

### 3.1 Requerimientos de interfaces externas

#### 3.1.1 Interfaces de usuario

- UI web responsiva para administración de productos y carritos.
- Formularios con validación básica y mensajes de estado.

#### 3.1.2 Interfaces de software

- Frontend consume API por `api-gateway` en `/api/**`.
- Gateway enruta a `cart-service`.
- `cart-service` usa PostgreSQL como persistencia.
- Liquibase aplica migraciones de esquema y datos.

#### 3.1.3 Interfaces de comunicación

- HTTP/JSON entre frontend, gateway y microservicio.
- Conexión JDBC entre `cart-service` y PostgreSQL.

### 3.2 Requerimientos funcionales (RF)

| ID | Requerimiento | Verificación esperada |
|---|---|---|
| RF-01 | El sistema debe crear productos | `POST /products` retorna producto creado |
| RF-02 | El sistema debe listar productos | `GET /products` retorna colección |
| RF-03 | El sistema debe consultar producto por ID | `GET /products/{id}` retorna detalle |
| RF-04 | El sistema debe actualizar productos | `PUT /products/{id}` actualiza registro |
| RF-05 | El sistema debe eliminar productos | `DELETE /products/{id}` elimina registro |
| RF-06 | El sistema debe validar datos de producto | Rechaza nombre vacío, precio/stock negativos |
| RF-07 | El sistema debe crear carritos vacíos | `POST /carts` crea carrito |
| RF-08 | El sistema debe listar carritos | `GET /carts` retorna carritos |
| RF-09 | El sistema debe consultar carrito por ID | `GET /carts/{id}` retorna detalle |
| RF-10 | El sistema debe agregar ítems al carrito | `POST /carts/{id}/items` agrega ítem válido |
| RF-11 | El sistema debe actualizar cantidades de ítems | `PUT /carts/{id}/items/{itemId}` actualiza cantidad |
| RF-12 | El sistema debe eliminar ítems del carrito | `DELETE /carts/{id}/items/{itemId}` elimina ítem |
| RF-13 | El sistema debe eliminar carrito e ítems asociados | `DELETE /carts/{id}` elimina carrito completo |
| RF-14 | El sistema debe recalcular subtotal por ítem | Subtotal consistente con precio y cantidad |
| RF-15 | El sistema debe recalcular total del carrito | Total consistente con suma de subtotales |
| RF-16 | El sistema debe validar reglas de carrito | Rechaza producto inexistente y cantidad <= 0 |
| RF-17 | El frontend debe usar gateway como punto único | Solicitudes por `/api/**` en gateway |
| RF-18 | La base de datos debe inicializarse con Liquibase | Cambios de esquema y seed aplicados |
| RF-19 | El sistema debe ejecutarse de forma integral con compose | `docker compose up -d --build` operativo |

### 3.3 Requerimientos no funcionales (RNF)

| ID | Categoría | Requerimiento |
|---|---|---|
| RNF-01 | Arquitectura | Estructura modular obligatoria en un único repositorio |
| RNF-02 | Diseño técnico | Gateway sin lógica de negocio; lógica en `cart-service` |
| RNF-03 | Usabilidad | Interfaz clara y usable en desktop/laptop/tablet/móvil |
| RNF-04 | Operabilidad | Mensajes de éxito/error comprensibles para usuario |
| RNF-05 | Portabilidad | Ejecución local soportada por Docker y Docker Compose |
| RNF-06 | Configuración | Puertos documentados para evitar conflictos |
| RNF-07 | Verificabilidad | Build frontend y pruebas backend exitosas para cierre |
| RNF-08 | Observabilidad | Validación operativa vía endpoint de salud en gateway |
| RNF-09 | Alcance | Sin autenticación, pagos ni checkout real en esta versión |

### 3.4 Reglas de negocio mínimas

- No crear productos sin nombre.
- No permitir precio negativo.
- No permitir stock negativo.
- No agregar productos inexistentes al carrito.
- No permitir cantidades menores o iguales a cero.
- Recalcular subtotal y total automáticamente.
- Eliminar ítems asociados cuando se elimina un carrito.

### 3.5 Requerimientos fuera de alcance

- Autenticación/autorización y gestión de usuarios.
- Checkout real, órdenes y pasarela de pagos.
- Inventario distribuido y promociones avanzadas.
- Reportes complejos y administración por roles.

## 4. Trazabilidad de alto nivel

- HU-02: RF-18
- HU-03: RF-01 a RF-06
- HU-04: RF-07 a RF-16
- HU-05: RF-17
- HU-08: RF-19 y RNF de integración/cierre
