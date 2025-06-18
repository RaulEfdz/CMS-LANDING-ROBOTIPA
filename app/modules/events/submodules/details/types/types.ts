export interface Detail {
  id: string | undefined; // UUID autogenerado por Supabase (clave primaria)
  event_id: string; // UUID - Clave foránea a la tabla 'Event'
  description: string | null;
  status_detail: string | null;
  requirements: string | null;
  theme: string | null;
}

// Mock de la interfaz Detail
export const mockDetail: Detail = {
  id: "550e8400-e29b-41d4-a716-446655440000", // UUID de ejemplo
  event_id: "123e4567-e89b-12d3-a456-426614174000", // UUID de ejemplo para event_id
  description: "Este es un detalle de ejemplo para el evento.",
  status_detail: "Pendiente",
  requirements: "Documentación completa y aprobación del equipo.",
  theme: "Tecnología e Innovación",
};
