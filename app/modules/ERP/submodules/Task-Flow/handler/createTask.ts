// dashboad_2/app/modules/ERP/submodules/Task-Flow/handler/createTask.ts
import { create } from "@/app/actions/create";
import { TaskType } from "../types/types";
// import { useToast } from "@/hooks/use-toast"; // Import useToast here

interface HandleCreateTaskProps {
    taskData: { title: string; description: string };
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
    tasks: TaskType[];
    // toast: ReturnType<typeof useToast>; // Define the type for toast
}

export const HandleCreateTask = async ({ taskData, setTasks}: HandleCreateTaskProps): Promise<void> => {
    const tableName = 'tasks';
    const taskToCreate = {
        title: taskData.title,
        description: taskData.description,
        status: 'pending', //  Estado por defecto al crear
    };

    const success = await create(taskToCreate, tableName);

    if (success) {
        //  Simulamos la nueva tarea para actualizar el estado local (idealmente refetch o recibir la tarea de la API)
        const newTask: TaskType = {
            id: Math.random().toString(36).substring(2, 9), //  ID simulado -  Considerar refetch para obtener ID real de la base de datos
            title: taskData.title,
            description: taskData.description,
            status: 'pending',
            user_id: '' //  Debes obtener el user_id real aquí si es necesario en este punto
        };
        setTasks(prevTasks => [...prevTasks, newTask]); // Usar función de actualización para prevenir problemas de estado
        // toast({
        //     title: "Tarea creada",
        //     description: "Tu nueva tarea ha sido creada exitosamente.",
        // });
    } else {
        console.error('Error creating task in Supabase');
        // toast({
        //     title: "Error",
        //     description: "Hubo un error al crear tu tarea. Por favor, inténtalo de nuevo.",
        //     variant: "destructive",
        // });
    }
};