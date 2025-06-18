import { UserRole } from '@/utils/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

// Define un tipo para los roles (puedes usar un enum o un tipo literal union)

/**
 * Función para cambiar el rol de un usuario en la base de datos de Supabase.
 *
 * @param supabaseClient Cliente Supabase inicializado.
 * @param userId El UUID del usuario al que se le cambiará el rol.
 * @param newRole El nuevo rol que se asignará al usuario (de tipo UserRole).
 * @returns Una promesa que resuelve a void si la operación es exitosa, o rechaza con un error si falla.
 *
 * @throws Error Si hay un error al llamar a la función de Supabase.
 */
export const setUserRole = async (
  supabaseClient: SupabaseClient,
  userId: string, // UUID como string
  newRole: UserRole
): Promise<void> => {
  try {
    const { error } = await supabaseClient.rpc('set_user_role', {
      user_id_input: userId, // Asegúrate que coincida con el nombre del parámetro en la función SQL
      new_role: newRole,      // Asegúrate que coincida con el nombre del parámetro en la función SQL
    });

    if (error) {
      // Ocurrió un error al llamar a la función de Supabase
      console.error("Error al cambiar el rol del usuario:", error);
      throw new Error(`Error al cambiar el rol del usuario: ${error.message}`); // Lanza un error para que quien llame a esta función pueda manejarlo
    }

    // Si no hay error, la función se ejecutó correctamente en Supabase
    console.log(`Rol del usuario ${userId} cambiado a ${newRole} exitosamente.`);
    // No necesitamos retornar nada explícitamente (Promise<void>)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) { // 'any' es necesario aquí para capturar errores de tipo desconocido
    console.error("Error inesperado al intentar cambiar el rol del usuario:", error);
    throw new Error(`Error inesperado al cambiar el rol: ${error.message || 'Desconocido'}`); // Propaga el error
  }
};

// --- Ejemplo de cómo podrías usar esta función en un componente de Next.js ---
// (Recuerda importar tu cliente Supabase inicializado donde sea necesario)
/*
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { setUserRole, UserRole } from './path/to/tuFuncionSetUserRole'; // Ajusta la ruta

const ComponenteAdminPanel = () => {
  const supabase = createClientComponentClient(); // Inicializa el cliente Supabase
  const [userIdToUpdate, setUserIdToUpdate] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user'); // Valor inicial por defecto

  const handleRoleChange = async () => {
    if (!userIdToUpdate || !selectedRole) {
      alert("Por favor, selecciona un usuario y un rol.");
      return;
    }

    try {
      await setUserRole(supabase, userIdToUpdate, selectedRole);
      alert(`Rol del usuario ${userIdToUpdate} actualizado a ${selectedRole} exitosamente.`);
      // Puedes actualizar la UI o hacer otras acciones después de un cambio exitoso
    } catch (error: any) {
      alert(`Error al cambiar el rol: ${error.message || 'Desconocido'}`);
      // Manejar el error en la UI (mostrar mensaje al usuario, etc.)
    }
  };

  return (
    <div>
      <h2>Panel de Administración - Cambiar Rol de Usuario</h2>
      <div>
        <label htmlFor="userId">ID de Usuario:</label>
        <input
          type="text"
          id="userId"
          value={userIdToUpdate}
          onChange={(e) => setUserIdToUpdate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="role">Nuevo Rol:</label>
        <select
          id="role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value as UserRole)}
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
          <option value="editor">Editor</option>
        * Agrega más opciones de rol aquí si tienes 
        </select>
      </div>
      <button onClick={handleRoleChange}>Cambiar Rol</button>
    </div>
  );
};

export default ComponenteAdminPanel;
*/