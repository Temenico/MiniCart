# 🗄️ Database Module

Este módulo centraliza toda la configuración y versionamiento de base de datos para MiniCart usando PostgreSQL y Liquibase.

## 🎯 Objetivo del módulo

- Definir y mantener el esquema relacional del sistema.
- Versionar cambios de base de datos mediante migraciones.
- Cargar datos semilla iniciales de forma controlada.
- Evitar mezclar lógica de base de datos dentro de `cart-service`.

## 🗂️ Estructura interna

```text
database/
├── .tmp/
├── 01_ddl/
│   └── changelog-ddl.yaml
├── 02_dml/
│   └── changelog-dml.yaml
├── docker/
│   └── liquibase/
│       └── liquibase.properties
├── scripts/
│   └── run-liquibase.ps1
├── .dockerignore
├── .env.example
├── changelog-master.yaml
└── README.md
```

## 🧪 Qué crea Liquibase

### Tablas base

- `product`
- `cart`
- `cart_item`

### Reglas incluidas

- Llaves primarias y foráneas.
- Restricciones de integridad (`CHECK`).
- Índices para `cart_item`.
- Relación `cart -> cart_item` con eliminación en cascada.
- Datos semilla iniciales en `product`.

## ▶️ Ejecución con Docker Compose

Desde la raíz del repositorio:

```bash
docker compose up -d
```

Este flujo levanta:

- `postgres`
- `liquibase` (ejecuta `update` usando `changelog-master.yaml`)

Para detener servicios:

```bash
docker compose down
```

## ⚙️ Ejecución manual de Liquibase

También se puede ejecutar Liquibase de forma manual con el script:

```powershell
./database/scripts/run-liquibase.ps1 -Command update
```

Comandos útiles:

- `update`
- `status`
- `history`
- `validate`

## 🌱 Migraciones y datos semilla

- `changelog-master.yaml` incluye en orden:
  - `01_ddl/changelog-ddl.yaml`
  - `02_dml/changelog-dml.yaml`
- Primero se crea el esquema (DDL), luego se cargan semillas (DML).

## 🧱 Relación con PostgreSQL y Docker

- PostgreSQL corre como servicio `postgres` en Docker Compose.
- Liquibase usa la conexión JDBC definida en:
  - `database/docker/liquibase/liquibase.properties`
- El changelog se monta desde `./database` al contenedor de Liquibase.

## 🚫 Archivos que no se deben mover

- `database/changelog-master.yaml`
- `database/01_ddl/changelog-ddl.yaml`
- `database/02_dml/changelog-dml.yaml`
- `database/docker/liquibase/liquibase.properties`

Estos archivos deben permanecer en `database/` para mantener la separación de responsabilidades del proyecto.
