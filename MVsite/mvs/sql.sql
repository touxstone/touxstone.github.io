-- Usuarios (opcional): clientes registrados / empleados que crean la solicitud
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(200),
  phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Presupuestos / solicitudes
CREATE TABLE quotes (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
  origin TEXT,
  destination TEXT,
  distance_km INTEGER,
  service_date DATE,
  estimated_price NUMERIC(10,2),
  notes TEXT,
  status VARCHAR(32) DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tipos de bulto (catalogo)
CREATE TABLE package_types (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  label VARCHAR(150) NOT NULL
);

INSERT INTO package_types (code, label) VALUES
('caja','Caja (medidas)'),
('maleta','Maleta');

-- Bultos asociados al presupuesto
CREATE TABLE quote_packages (
  id BIGSERIAL PRIMARY KEY,
  quote_id BIGINT NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  package_type_id BIGINT REFERENCES package_types(id),
  length_cm NUMERIC(8,2),
  width_cm NUMERIC(8,2),
  height_cm NUMERIC(8,2),
  weight_kg NUMERIC(8,2),
  needs_packing BOOLEAN DEFAULT false,
  volume_m3 NUMERIC(10,4), -- calculado opcional
  price NUMERIC(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Catálogo de ítems (enseres predefinidos)
CREATE TABLE items (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(50), -- 'office'|'home' etc.
  base_price NUMERIC(10,2) DEFAULT 0
);

-- Ítems añadidos a un presupuesto (referencian items o son personalizados)
CREATE TABLE quote_items (
  id BIGSERIAL PRIMARY KEY,
  quote_id BIGINT NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  item_id BIGINT REFERENCES items(id),
  custom_name VARCHAR(255),
  quantity INTEGER DEFAULT 1,
  needs_packing BOOLEAN DEFAULT false,
  price NUMERIC(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices útiles
CREATE INDEX idx_quotes_user ON quotes(user_id);
CREATE INDEX idx_quote_packages_quote ON quote_packages(quote_id);
CREATE INDEX idx_quote_items_quote ON quote_items(quote_id);

-- Tabla de auditoría ligera (opcional)
CREATE TABLE quote_events (
  id BIGSERIAL PRIMARY KEY,
  quote_id BIGINT REFERENCES quotes(id) ON DELETE CASCADE,
  event_type VARCHAR(64),
  payload JSONB,
  created_by BIGINT REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

