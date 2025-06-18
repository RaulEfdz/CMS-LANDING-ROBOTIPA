// types/event-types.ts (o donde tengas tus interfaces)

export interface Need {
  id: string; // UUID autogenerado por Supabase (clave primaria)
  event_id: string; // UUID - Clave foránea a la tabla 'Event'
  need_name: string; // Nombre de la necesidad (obligatorio)
  description: string | null; // Descripción detallada de la necesidad (opcional)
  quantity: number | null; // Cantidad necesaria (opcional)
  estimated_budget: number | null; // Presupuesto estimado (opcional)
  status: string | null; // Estado de la necesidad (opcional)
}