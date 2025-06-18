// dashboad_2/app/modules/ERP/submodules/Task-Flow/handler/updateTask.ts
import { update } from "@/app/actions/update";
import { TaskType } from "../types/types";

interface HandleUpdateTaskStatusProps {
    taskId: string;
    newStatus: TaskType['status'];
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>; // Añadimos setTasks
    tasks: TaskType[]; // Añadimos tasks
}

export const HandleUpdateTaskStatus = async ({ taskId, newStatus, setTasks, tasks }: HandleUpdateTaskStatusProps): Promise<boolean> => { // Añadimos setTasks y tasks como parámetros
    const tableName = 'tasks';
    const dataToUpdate = { status: newStatus };

    const updateResult = await update<TaskType>({
        nameTable: tableName,
        id: taskId,
        dataToUpdate: dataToUpdate,
        onError: (error) => {
            console.error('Error updating task status in Supabase:', error);

        },
        onSuccess: () => {        
            // Actualizar el estado local de las tareas AQUÍ
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            );
            setTasks(updatedTasks); // Actualizamos el estado local con setTasks
        }
    });

    return !updateResult.error;
};