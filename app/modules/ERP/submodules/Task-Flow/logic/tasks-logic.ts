import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DropResult } from '@hello-pangea/dnd';
import { TaskType } from '../types/types';
import { SelectAllTask } from '../handler/selectAllTask';
import { HandleCreateTask } from '../handler/createTask';
import { HandleUpdateTaskStatus } from '../handler/updateTask';
import { HandleDeleteTask } from '../handler/removeTask';
import { HandleUpdateExistingTask } from '../handler/existingTask';

const columnsConfig = [
    { id: 'pending', title: 'Pending' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'completed', title: 'Completed' },
    { id: 'discarded', title: 'Discarded' },
];

export const useTasksLogic = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [viewMode, setViewMode] = useState<'kanban' | 'table'>('table'); // Modificación: 'table' ahora es el valor por defecto
    const [isOnline, setIsOnline] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<TaskType | null>(null);
    const { toast } = useToast();
    const columns = columnsConfig;

    useEffect(() => {
        // Cargar tareas desde la API al montar el componente
        const loadInitialTasks = async () => {
            try {
                const apiTasks = await SelectAllTask();
                setTasks(apiTasks);
                toast({
                    title: "Tareas cargadas",
                    description: "Bien!",
                    variant: "default",
                });
            } catch (error) {
                console.error('Error fetching tasks from API:', error);
                toast({
                    title: "Error al cargar tareas",
                    description: "No se pudieron cargar las tareas desde el servidor.",
                    variant: "destructive",
                });
            }
        };

        loadInitialTasks();

        // Check online status
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)


        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);


    const onDragEnd = async (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);

        reorderedItem.status = result.destination.droppableId as TaskType['status'];

        // Actualizar el estado de la tarea en Supabase
        const updateSuccess = await HandleUpdateTaskStatus({
            taskId: reorderedItem.id,
            newStatus: reorderedItem.status,
            setTasks,
            tasks
            // toast: toast // ✅ Re-added toast prop here
        });

        if(updateSuccess) {
            items.splice(result.destination.index, 0, reorderedItem);
            setTasks(items);
            alert("actualizados")
        } else {
            toast({
                title: "Error al actualizar la tarea",
                description: "No se pudo actualizar el estado de la tarea. Por favor, inténtalo de nuevo.",
                variant: "destructive",
            });
        }
    };

    const handleCreateTask = async (taskData: { title: string; description: string }) => {
        HandleCreateTask({
            taskData,
            setTasks,
            tasks,
        });
    };

    const handleUpdateTaskStatus = async (taskId: string, newStatus: TaskType['status']): Promise<boolean> => {
        return HandleUpdateTaskStatus({ // Directly return the result from HandleUpdateTaskStatus
            taskId,
            newStatus,
            setTasks,
            tasks,
        });
    };



    const handleEditTask = (task: TaskType) => {
        setEditingTask(task);
        setDialogOpen(true);
    };

    const handleUpdateExistingTask = async (taskId: string, taskData: { title: string; description: string }) =>  {
        return HandleUpdateExistingTask({ // Directly return the result from HandleUpdateExistingTask
            taskId,
            taskData,
            setTasks,
            tasks,
            setEditingTask,
            setDialogOpen,
        });
    };


    const handleDeleteTask = async (taskId: string) => {
        HandleDeleteTask({
            taskId,
            setTasks,
            tasks,
        });
    };


    const getStatusColor = (status: TaskType['status']) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-600 dark:text-yellow-400';
            case 'in-progress':
                return 'text-blue-600 dark:text-blue-400';
            case 'completed':
                return 'text-green-600 dark:text-green-400';
            case 'discarded':
                return 'text-red-600 dark:text-red-400';
            default:
                return '';
        }
    };

    return {
        tasks,
        setTasks,
        viewMode,
        setViewMode,
        isOnline,
        setIsOnline,
        dialogOpen,
        setDialogOpen,
        editingTask,
        setEditingTask,
        toast,
        columns,
        onDragEnd,
        handleCreateTask,
        handleUpdateTaskStatus,
        handleEditTask,
        handleUpdateExistingTask,
        handleDeleteTask,
        getStatusColor,
    };
};