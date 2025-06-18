-- SNIPER TITLE:  CREATE TABLE Task - Final SQL (con ENUM status y CHECK type_task)

-- 1. Crear un tipo ENUM llamado 'task_status_enum' para los estados de las tareas
CREATE TYPE task_status_enum AS ENUM ('pending', 'in_progress', 'on_hold', 'completed', 'cancelled', 'abandoned');

-- 2. Crear la tabla 'task' usando el tipo ENUM para la columna 'status' y CHECK para 'type_task'
CREATE TABLE task (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL,
     user_id UUID NOT NULL,
    task_description TEXT NOT NULL,
    type_task VARCHAR(20) NOT NULL,
    status task_status_enum NOT NULL DEFAULT 'pending', -- Usa el tipo ENUM 'task_status_enum'
    priority VARCHAR(20),
    assigned_to VARCHAR(255),
    due_date DATE,
    notes TEXT,
    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
    CONSTRAINT task_type_check CHECK (type_task IN ('before', 'during', 'after', 'other')) -- Restricción CHECK para 'type_task'
);