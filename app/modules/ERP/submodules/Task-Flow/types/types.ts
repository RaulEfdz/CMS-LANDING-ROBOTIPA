// app/modules/ERP/submodules/Task-Flow/types/types.ts
export interface TaskType {
    id: string;
    created_at?: string; // Añadimos created_at como opcional, ya que puede ser manejado por la base de datos
    user_id: string; // Añadimos user_id, ya que ahora es requerido en la base de datos
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed' | 'discarded';
}