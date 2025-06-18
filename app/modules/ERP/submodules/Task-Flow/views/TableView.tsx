'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2, Loader2, ClipboardList } from 'lucide-react';
import { TaskType } from '../types/types';
import { cn } from '@/lib/utils';

interface TableViewProps {
    tasks: TaskType[];
    onEditTask: (task: TaskType) => void;
    onDeleteTask: (taskId: string) => void;
    onUpdateTaskStatus: (taskId: string, newStatus: TaskType['status']) => Promise<boolean>;
    isLoading?: boolean;
}

const TableView: React.FC<TableViewProps> = ({
    tasks,
    onEditTask,
    onDeleteTask,
    onUpdateTaskStatus,
    isLoading = false
}) => {
    const [updatingTaskId, setUpdatingTaskId] = React.useState<string | null>(null);

    const handleStatusUpdate = async (taskId: string, newStatus: TaskType['status']) => {
        setUpdatingTaskId(taskId);
        try {
            await onUpdateTaskStatus(taskId, newStatus);
        } finally {
            setUpdatingTaskId(null);
        }
    };

    const getPossibleStatuses = (currentStatus: TaskType['status']): TaskType['status'][] => {
        switch (currentStatus) {
            case 'pending':
                return ['in-progress', 'discarded'];
            case 'discarded':
                return ['pending'];
            case 'in-progress':
                return ['completed', 'discarded', 'pending'];
            default:
                return [];
        }
    };

    const getStatusColor = (status: TaskType['status']) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'discarded': return 'bg-red-100 text-red-800';
            default: return '';
        }
    };

    const translateStatus = (status: TaskType['status']) => {
        return {
            'pending': 'Pendiente',
            'in-progress': 'En Progreso',
            'completed': 'Completada',
            'discarded': 'Descartada'
        }[status];
    };

    if (isLoading) {
        return (
            <Card className="w-full h-64 flex items-center justify-center bg-white/50 rounded-none">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </Card>
        );
    }

    if (tasks.length === 0) {
        return (
            <Card className="w-full h-64 bg-white/50 rounded-none">
                <CardContent className="flex flex-col items-center justify-center h-full space-y-4">
                    <ClipboardList className="h-12 w-12 text-gray-400" />
                    <div className="text-center">
                        <h3 className="text-lg font-medium text-gray-900">No se encontraron tareas</h3>
                        <p className="text-sm text-gray-500">Comienza creando tu primera tarea</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full overflow-hidden border border-gray-200 rounded-none">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-semibold">Título</TableHead>
                        <TableHead className="font-semibold">Descripción</TableHead>
                        <TableHead className="font-semibold">Estado</TableHead>
                        <TableHead className="text-right font-semibold">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow
                            key={task.id}
                            // className="hover:bg-gray-50 transition-colors"
                            className={cn(
                                "capitalize rounded-none cursor-pointer",
                                task.status === 'pending' && 'bg-yellow-200 ',
                                 task.status  === 'in-progress' && 'bg-blue-200 ',
                                 task.status  === 'completed' && 'bg-green-200 ',
                                 task.status  === 'discarded' && 'bg-red-200 '
                            )}
                        >
                            <TableCell className="font-medium pl-5">{task.title}</TableCell>
                            <TableCell className="text-gray-600">{task.description}</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    {updatingTaskId === task.id ? (
                                        <div className="flex items-center space-x-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Actualizando...</span>
                                        </div>
                                    ) : (
                                        <span className={cn(
                                            "capitalize font-medium px-2 py-1 rounded-none text-sm",
                                            getStatusColor(task.status)
                                        )}>
                                            {translateStatus(task.status)}
                                        </span>
                                    )}
                                </div>
                                <div className="flex space-x-1 mt-1">
                                    {getPossibleStatuses(task.status).map(newStatus => (
                                        <Button
                                            key={newStatus}
                                            variant="outline"
                                            size="sm"
                                            disabled={updatingTaskId === task.id}
                                            onClick={() => handleStatusUpdate(task.id, newStatus)}
                                            className={cn(
                                                "capitalize rounded-none",
                                                newStatus === 'pending' && 'border-yellow-500 text-yellow-600 hover:bg-yellow-50',
                                                newStatus === 'in-progress' && 'border-blue-500 text-blue-600 hover:bg-blue-50',
                                                newStatus === 'completed' && 'border-green-500 text-green-600 hover:bg-green-50',
                                                newStatus === 'discarded' && 'border-red-500 text-red-600 hover:bg-red-50'
                                            )}
                                        >
                                            {translateStatus(newStatus)}
                                        </Button>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className="text-right space-x-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onEditTask(task)}
                                    className="hover:bg-gray-100 rounded-none"
                                >
                                    <Edit className="h-4 w-4 text-gray-600" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDeleteTask(task.id)}
                                    className="hover:bg-red-50 rounded-none"
                                >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
};

export default TableView;