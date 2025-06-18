// dashboad_2/app/modules/ERP/submodules/Task-Flow/handler/removeTask.ts
import { remove } from "@/app/actions/remove";
import { TaskType } from "../types/types";
// import { useToast } from "@/hooks/use-toast"; // Import useToast here

interface HandleDeleteTaskProps {
    taskId: string;
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    tasks: TaskType[];
    // toast: ReturnType<typeof useToast>; // Define the type for toast
}

export const HandleDeleteTask = async ({ taskId, setTasks, tasks }: HandleDeleteTaskProps): Promise<void> => {
    const tableName = 'tasks';

    const success = await remove(tableName, taskId);

    if (success) {
        // Actualizar el estado local eliminando la tarea
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        // toast({
        //     title: "Tarea eliminada",
        //     description: "La tarea ha sido eliminada exitosamente.",
        // });
    } else {
        console.error('Error deleting task in Supabase');
        // toast({
        //     title: "Error al eliminar la tarea",
        //     description: "No se pudo eliminar la tarea. Por favor, inténtalo de nuevo.",
        //     variant: "destructive",
        // });
    }
};