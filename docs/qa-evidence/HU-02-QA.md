# 🧪 QA Evidence - HU-02

## 📌 Historia evaluada

- **ID:** HU-02
- **Título:** Configurar el módulo de base de datos con Liquibase
- **Rama QA:** `HU-02-qa`

## ✅ Criterios validados

- [x] Existe la carpeta `database` con estructura organizada.
- [x] Existe un `changelog-master.yaml`.
- [x] Existen carpetas para scripts DDL y DML.
- [x] Liquibase está configurado para ejecutarse sobre PostgreSQL.
- [x] Se crean las tablas base del sistema mediante migraciones.
- [x] Se pueden cargar datos semilla iniciales.
- [x] Existe un `README.md` dentro de `database`.
- [x] La configuración de base de datos no está mezclada dentro de `cart-service`.

## 🔎 Evidencia funcional revisada

- Changelog maestro configurado en `database/changelog-master.yaml`.
- Migraciones DDL disponibles en `database/01_ddl/changelog-ddl.yaml`.
- Migraciones DML y datos semilla en `database/02_dml/changelog-dml.yaml`.
- Configuración de Liquibase para PostgreSQL en `database/docker/liquibase/liquibase.properties`.
- Script de apoyo para ejecución de Liquibase en `database/scripts/run-liquibase.ps1`.
- Servicio `liquibase` integrado en `docker-compose.yml`.
- Documentación del módulo validada en `database/README.md`.

## 🧾 Resultado QA

**PASS**

## 📝 Observaciones

- HU-02 cumple el alcance definido para configuración de base de datos versionada.
- No se detectan bloqueantes para avanzar a HU-03.
