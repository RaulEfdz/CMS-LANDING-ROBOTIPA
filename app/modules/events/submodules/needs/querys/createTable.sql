-- SNIPER TITLE:  CREATE TABLE Need - Final SQL
CREATE TABLE need (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Clave primaria única para cada necesidad, UUID autogenerado por Supabase
    event_id UUID NOT NULL, -- Clave foránea que relaciona esta necesidad con un evento específico (tabla 'event')
     user_id UUID NOT NULL,
    need_name VARCHAR(255) NOT NULL, -- Nombre de la necesidad (obligatorio, NOT NULL, VARCHAR para texto corto)
    description TEXT, -- Descripción detallada de la necesidad (opcional, puede ser NULL, TEXT para texto largo)
    quantity INTEGER, -- Cantidad necesaria de este item (opcional, puede ser NULL, INTEGER para números enteros)
    estimated_budget DECIMAL(15, 2), -- Presupuesto estimado para esta necesidad (opcional, puede ser NULL, DECIMAL para moneda)
    status VARCHAR(20), -- Estado de la necesidad (opcional, puede ser NULL, VARCHAR para texto corto)

    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE -- Define la clave foránea referenciando la tabla 'event' y su columna 'id'
    -- ON DELETE CASCADE: Si se elimina un evento de la tabla 'event', también se eliminan automáticamente las necesidades asociadas en esta tabla
);