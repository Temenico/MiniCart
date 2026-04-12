# 🧪 QA Evidence - HU-04

## 📌 Historia evaluada

- **ID:** HU-04
- **Título:** Implementar gestión de carritos e ítems en el microservicio
- **Rama QA:** `HU-04-qa`

## ✅ Criterios validados

- [x] Existe la entidad `Cart`.
- [x] Existe la entidad `CartItem`.
- [x] Existen repositorios para carrito e ítems.
- [x] Existen DTOs de request y response.
- [x] Existe servicio para la lógica de carrito.
- [x] Existe controlador con endpoints de carrito e ítems.
- [x] Se puede crear un carrito vacío.
- [x] Se puede consultar un carrito por id.
- [x] Se puede agregar un producto al carrito.
- [x] Se puede actualizar la cantidad de un ítem.
- [x] Se puede eliminar un ítem del carrito.
- [x] Se puede eliminar un carrito completo.
- [x] Se recalculan subtotal y total automáticamente.
- [x] Se validan existencia de producto, stock y cantidad.
- [x] Se manejan errores para carrito o producto inexistente.

## 🔎 Evidencia funcional revisada

- Entidades verificadas en `cart-service/src/main/java/com/minicart/cartservice/entity/`.
- Repositorios verificados en `cart-service/src/main/java/com/minicart/cartservice/repository/`.
- Servicio de carrito verificado en `CartService` y `CartServiceImpl`.
- Controlador de carrito verificado en `CartController`.
- Manejo de errores verificado en:
  - `GlobalExceptionHandler`
  - `CartNotFoundException`
  - `CartItemNotFoundException`
  - `BusinessValidationException`
- Pruebas de controlador verificadas en `CartControllerTest`.
- Evidencia de ejecución de pruebas reportada como exitosa en rama de desarrollo (`mvn test`).

## 🧾 Resultado QA

**PASS**

## 📝 Observaciones

- HU-04 cumple el alcance funcional de gestión de carritos e ítems.
- No se detectan bloqueantes para avanzar a HU-05.
