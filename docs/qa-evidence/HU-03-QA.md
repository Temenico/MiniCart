# 🧪 QA Evidence - HU-03

## 📌 Historia evaluada

- **ID:** HU-03
- **Título:** Implementar CRUD de productos en el microservicio
- **Rama QA:** `HU-03-qa`

## ✅ Criterios validados

- [x] Existe la entidad `Product`.
- [x] Existe repositorio para productos.
- [x] Existen DTOs de request y response.
- [x] Existe servicio para la lógica de productos.
- [x] Existe controlador con endpoints CRUD.
- [x] Se puede crear un producto.
- [x] Se pueden listar productos.
- [x] Se puede consultar un producto por id.
- [x] Se puede actualizar un producto.
- [x] Se puede eliminar un producto.
- [x] Se validan nombre, precio y stock.
- [x] Se manejan errores para datos inválidos o recursos inexistentes.

## 🔎 Evidencia funcional revisada

- Endpoints CRUD implementados en `cart-service/src/main/java/com/minicart/cartservice/controller/ProductController.java`.
- Lógica de negocio implementada en `ProductService` y `ProductServiceImpl`.
- Persistencia implementada en `ProductRepository`.
- Validaciones de request implementadas en `ProductRequest`.
- Manejo global de errores implementado en `GlobalExceptionHandler`.
- Mensajes de validación y error verificados en español.
- Pruebas de controlador disponibles en `ProductControllerTest`.
- Ejecución de pruebas reportada exitosa en rama de desarrollo (`mvn test`).

## 🧾 Resultado QA

**PASS**

## 📝 Observaciones

- HU-03 cumple el alcance de CRUD de productos en `cart-service`.
- No se detectan bloqueantes para avanzar a HU-04.
