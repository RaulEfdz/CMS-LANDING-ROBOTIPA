import { removeAll } from "@/app/actions/removeAll";

export async function removeAllEvent(eventIds: string[]) {
    try {
      const tableName = 'events';
      const success = await removeAll(tableName, eventIds);
      if (success) {
        console.log(`Eventos con IDs ${eventIds.join(', ')} eliminados correctamente.`);
        // Actualizar UI o realizar otras acciones
        return true
      } else {
        console.log(`Fallo al eliminar los eventos con IDs ${eventIds.join(', ')}.`);
        // Manejar fallo
        return false
      }
    } catch (error) {
      console.error('Error al eliminar eventos:', error);
      // Manejar error
      return false
    }
  }