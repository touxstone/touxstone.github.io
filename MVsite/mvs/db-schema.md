# Esquema de Base de Datos — Envío Rápido (Presupuestos)

Resumen
- Objetivo: almacenar solicitudes de presupuesto (interacciones) generadas desde la SPA, usuarios de contacto, bultos, ítems (predefinidos y personalizados), y auditoría básica.
- Diseño pensado para un RDBMS relacional (Postgres/MySQL). Incluye diagrama ER en Mermaid y sentencias DDL.

Mermaid — Diagrama ER
```mermaid
erDiagram
    USERS ||--o{ QUOTES : creates
    QUOTES ||--o{ QUOTE_PACKAGES : has
    QUOTES ||--o{ QUOTE_ITEMS : has
    QUOTES ||--o{ QUOTE_EVENTS : logs
    ITEMS ||--o{ QUOTE_ITEMS : used_by
    QUOTE_PACKAGES }o--|| PACKAGE_TYPES : type
    USERS ||--o{ QUOTE_EVENTS : creates

    USERS {
        bigint id PK
        varchar name
        varchar email
        varchar phone
        timestamp created_at
    }
    QUOTES {
        bigint id PK
        bigint user_id FK
        varchar origin
        varchar destination
        integer distance_km
        date service_date
        decimal estimated_price
        text notes
        varchar status
        timestamp created_at
        timestamp updated_at
    }
    QUOTE_PACKAGES {
        bigint id PK
        bigint quote_id FK
        bigint package_type_id FK
        decimal length_cm
        decimal width_cm
        decimal height_cm
        decimal weight_kg
        boolean needs_packing
        decimal volume_m3
        decimal price
        timestamp created_at
    }
    PACKAGE_TYPES {
        bigint id PK
        varchar code
        varchar label
    }
    ITEMS {
        bigint id PK
        varchar name
        varchar category
        decimal base_price
    }
    QUOTE_ITEMS {
        bigint id PK
        bigint quote_id FK
        bigint item_id FK
        varchar custom_name
        integer quantity
        boolean needs_packing
        decimal price
        timestamp created_at
    }
    QUOTE_EVENTS {
        bigint id PK
        bigint quote_id FK
        varchar event_type
        json payload
        bigint created_by FK
        timestamp created_at
    }
```

Notas del diagrama
- `quotes.status`: `draft`, `pending`, `confirmed`, `cancelled`.
- `package_types.code`: ejemplos `caja`, `maleta`.
- `items.category`: ejemplos `office`, `home`.
- `quote_items.item_id` y `quote_items.custom_name` pueden ser `NULL` para ítems completamente personalizados.
- En SQL, `quote_events.payload` se define como `JSONB`; en el diagrama se muestra como `json` para mantener compatibilidad con visores Mermaid menos recientes.
