import { remove } from "@/app/actions/remove";

export async function removeEvents(eventId: string) {
  try {
    const tableName = 'events'; // Nombre de la tabla de eventos
    const success = await remove(tableName, eventId);
    if (success) {
      console.log(`Evento con ID ${eventId} eliminado correctamente.`);
      return true
      // Actualiza la UI o realiza otras acciones tras la eliminación exitosa
    } else {
      console.log(`Fallo al eliminar el evento con ID ${eventId}.`);
      return false
      // Maneja el fallo, muestra un mensaje de error al usuario, etc.
    }
  } catch (error) {
    console.error('Error al eliminar el evento:', error);
    return false
    // Maneja el error, por ejemplo, mostrando un mensaje de error genérico al usuario
  }
}