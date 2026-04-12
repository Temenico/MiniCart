# 🧪 QA Evidence - HU-05

## 📌 Historia evaluada

- **ID:** HU-05
- **Título:** Configurar el API Gateway y enrutar las solicitudes al microservicio
- **Rama QA:** `HU-05-qa`

## ✅ Criterios validados

- [x] Existe el proyecto `api-gateway`.
- [x] El gateway inicia con configuración mínima funcional.
- [x] Se configuran rutas para productos.
- [x] Se configuran rutas para carritos.
- [x] Las solicitudes del frontend pasan por el gateway.
- [x] El microservicio responde correctamente a través del gateway.
- [x] No existe lógica de negocio dentro del gateway.

## 🔎 Evidencia funcional revisada

- Configuración de rutas verificada en `api-gateway/src/main/resources/application.yml`.
- Rutas verificadas:
  - `/api/products` y `/api/products/**`
  - `/api/carts` y `/api/carts/**`
- Filtro de reescritura de path verificado:
  - `StripPrefix=1`
- Configuración CORS verificada para frontend local:
  - `http://localhost:5173`
- Parametrización de destino de microservicio verificada:
  - `CART_SERVICE_URL` (default `http://localhost:8081`)
- Documentación del módulo verificada en `api-gateway/README.md`.
- Evidencia de prueba del módulo reportada como exitosa (`mvn test` en `api-gateway`).

## 🧾 Resultado QA

**PASS**

## 📝 Observaciones

- HU-05 cumple el alcance de gateway como punto de entrada central.
- No se detectan bloqueantes para avanzar a HU-06.
