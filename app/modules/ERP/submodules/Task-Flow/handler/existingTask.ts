import { update } from "@/app/actions/update";
import { TaskType } from "../types/types";

interface HandleUpdateExistingTaskProps {
    taskId: string;
    taskData: { title: string; description: string };
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    tasks: TaskType[];
    setEditingTask: React.Dispatch<React.SetStateAction<TaskType | null>>;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export const HandleUpdateExistingTask = async ({
    taskId, taskData, setTasks, tasks, setEditingTask, setDialogOpen
}: HandleUpdateExistingTaskProps): Promise<boolean> => {
    const tableName = 'tasks';
    const dataToUpdate = {
        title: taskData.title,
        description: taskData.description,
    };

    const updateResult = await update<TaskType>({
        nameTable: tableName,
        id: taskId,
        dataToUpdate: dataToUpdate,
        onError: (error) => {
            console.error('Error updating task in Supabase:', error);
            // toast({
            //     title: "Error al editar la tarea",
            //     description: "No se pudieron guardar los cambios. Por favor, inténtalo de nuevo.",
            //     variant: "destructive",
            // });
        },
        onSuccess: () => {
            // toast({
            //     title: "Tarea actualizada",
            //     description: "Los cambios en la tarea se han guardado exitosamente.",
            // });
            // Actualizar el estado local de las tareas
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? { ...task, ...dataToUpdate } : task
            );
            setTasks(updatedTasks);
            setEditingTask(null); // Limpiar la tarea en edición
            setDialogOpen(false); // Cerrar el diálogo
        }
    });

    return !updateResult.error; // Retorna true si no hubo error, false si hubo error
};