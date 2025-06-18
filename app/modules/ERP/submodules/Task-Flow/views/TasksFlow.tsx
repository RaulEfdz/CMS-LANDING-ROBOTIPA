// app/modules/Task-Flow/views/TasksView.tsx
'use client';

import { Button } from '@/components/ui/button';
import { LayoutGrid, List, Plus, Wifi, WifiOff } from 'lucide-react';
import KanbanView from './KanbanView';
import TableView from './TableView';
import { useTasksLogic } from '../logic/tasks-logic';
import { TaskDialog } from '../components/TaskDialog';


export default function TasksFlow() {
    const {
        tasks,
        // setTasks,
        viewMode,
        setViewMode,
        isOnline,
        // setIsOnline,
        dialogOpen,
        setDialogOpen,
        editingTask,
        setEditingTask,
        // toast,
        columns,
        onDragEnd,
        handleCreateTask,
        handleUpdateTaskStatus,
        handleEditTask,
        handleUpdateExistingTask,
        handleDeleteTask,
        // getStatusColor,
    } = useTasksLogic();

    const handleNewTaskClick = () => {
        setEditingTask(null);
        setDialogOpen(true);
    };

    const onSaveTask = async (taskData: { title: string; description: string; id?: string }) => {
        if (editingTask) {
            if (editingTask.id) { // Ensure editingTask.id is not null/undefined
                await handleUpdateExistingTask(editingTask.id, taskData);
            } else {
                console.error("Error: Editing task has no ID.");
                // Handle error appropriately, maybe show a toast
                return; // Important to stop further execution
            }

        } else {
            await handleCreateTask(taskData);
        }
        setDialogOpen(false); // Close dialog after save, regardless of create or edit
    };


    return (
        <div className="p-6">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold">Flujo de tareas</h1>
                        {isOnline ? (
                            <Wifi className="h-5 w-5 text-green-500" />
                        ) : (
                            <WifiOff className="h-5 w-5 text-yellow-500" />
                        )}
                    </div>
                    <p className="text-muted-foreground">
                        Manejo de flujos de tareas
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleNewTaskClick}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva tarea
                    </Button>
                    <Button
                        variant={viewMode === 'kanban' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('kanban')}
                    >
                        <LayoutGrid className="h-5 w-5" />
                    </Button>
                    <Button
                        variant={viewMode === 'table' ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => setViewMode('table')}
                    >
                        <List className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <TaskDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onSave={onSaveTask} // Use the wrapper function onSaveTask
                editingTask={editingTask}
                setEditingTask={setEditingTask}
            />

            {viewMode === 'kanban' ? (
                <KanbanView
                    tasks={tasks}
                    columns={columns}
                    onDragEnd={onDragEnd}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                />
            ) : (
                <TableView
                        tasks={tasks}
                        // getStatusColor={getStatusColor}
                        onEditTask={handleEditTask}
                        onDeleteTask={handleDeleteTask}
                        onUpdateTaskStatus={handleUpdateTaskStatus} // ✅ Pass onUpdateTaskStatus to TableView
                />
            )}
        </div>
    );
}