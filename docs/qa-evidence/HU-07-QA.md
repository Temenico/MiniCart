# 🧪 QA Evidence - HU-07

## 📌 Historia evaluada

- **ID:** HU-07
- **Título:** Implementar interfaz de carrito de compras en el frontend
- **Rama QA:** `HU-07-qa`

## ✅ Criterios validados

- [x] Existe una vista para visualizar el carrito.
- [x] Se pueden agregar productos al carrito desde el frontend.
- [x] Se puede actualizar la cantidad de un ítem.
- [x] Se puede eliminar un ítem del carrito.
- [x] Se muestra el subtotal por ítem.
- [x] Se muestra el total del carrito.
- [x] El frontend consume la API a través del `api-gateway`.
- [x] Se muestran mensajes básicos de éxito o error.
- [x] La interfaz es clara, limpia y funcional.
- [x] No se mezcla lógica de UI con lógica de acceso a API.

## 🔎 Evidencia funcional revisada

- Página de carrito verificada en `frontend/src/pages/CartManagementPage.jsx`.
- Componentes de UI de carrito verificados:
  - `frontend/src/components/CartSelector.jsx`
  - `frontend/src/components/AddCartItemForm.jsx`
  - `frontend/src/components/CartItemsTable.jsx`
  - `frontend/src/components/ConfirmDialog.jsx`
- Separación de responsabilidades verificada:
  - lógica de estado en `frontend/src/hooks/useCartManagement.js`
  - consumo de API en `frontend/src/services/cartService.js`
  - validaciones/modelos en `frontend/src/utils/cartValidators.js` y `frontend/src/models/cartModel.js`
- Integración por gateway verificada con endpoints de carrito bajo `/api/carts/**`.
- Formato monetario COP validado en UI con utilitario `frontend/src/utils/currency.js`.
- Ajustes visuales y responsive verificados en `frontend/src/styles/carts.css`.
- Evidencia técnica reportada como exitosa:
  - `npm run build` en `frontend` -> **SUCCESS**
  - `mvn test` en `api-gateway` -> **BUILD SUCCESS**
  - `mvn test` en `cart-service` -> **BUILD SUCCESS**

## 🧾 Resultado QA

**PASS**

## 📝 Observaciones

- HU-07 cumple el alcance funcional esperado de gestión de carrito desde frontend.
- La navegación entre productos y carrito quedó integrada en `frontend/src/routes/AppRoutes.jsx`.
- No se detectan bloqueantes para continuar hacia HU-08.
