'use client';

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from '@hello-pangea/dnd';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { TaskType } from '../types/types';

interface KanbanViewProps {
    tasks: TaskType[];
    columns: { id: string; title: string }[];
    onDragEnd: (result: DropResult) => void;
    onEditTask: (task: TaskType) => void;
    onDeleteTask: (taskId: string) => void;
}

const KanbanView: React.FC<KanbanViewProps> = ({ tasks, columns, onDragEnd, onEditTask, onDeleteTask }) => {
    const getColumnStyle = (columnId: string) => {
        switch (columnId) {
            case 'pending':
                return 'bg-yellow-50 border border-yellow-600';
            case 'in-progress':
                return 'bg-blue-50 border border-blue-600';
            case 'completed':
                return 'bg-green-50 border border-green-600';
            case 'discarded':
                return 'bg-red-50 border border-red-600';
            default:
                return 'bg-gray-50 border- border-gray-600';
        }
    };

    const getTaskStyle = (status: string) => {
        switch (status) {
            case 'pending':
                return 'border border-yellow-600 bg-white hover:bg-yellow-50';
            case 'in-progress':
                return 'border border-blue-600 bg-white hover:bg-blue-50';
            case 'completed':
                return 'border border-green-600 bg-white hover:bg-green-50';
            case 'discarded':
                return 'border border-red-600 bg-white hover:bg-red-50';
            default:
                return 'border border-gray-600 bg-white hover:bg-gray-50';
        }
    };

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 p-6 bg-gray-100 min-h-screen">
            <DragDropContext onDragEnd={onDragEnd}>
                {columns.map((column) => (
                    <div
                        key={column.id}
                        className={`rounded-none p-4 ${getColumnStyle(column.id)}`}
                    >
                        <h2 className="font-semibold text-lg mb-4 px-2">{column.title}</h2>
                        <Droppable droppableId={column.id}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-3"
                                >
                                    {tasks
                                        .filter((task) => task.status === column.id)
                                        .map((task, index) => (
                                            <Draggable
                                                key={task.id}
                                                draggableId={task.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <Card
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`
                                                            p-4 shadow-sm rounded-none transition-all duration-200
                                                            ${getTaskStyle(task.status)}
                                                            ${snapshot.isDragging ? 'shadow-lg ring-2 ring-offset-2' : ''}
                                                        `}
                                                    >
                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex justify-between items-start">
                                                                <h3 className="font-medium pr-16 text-gray-800">{task.title}</h3>
                                                                <div className="flex gap-1 shrink-0">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 rounded-full hover:bg-gray-100"
                                                                        onClick={() => onEditTask(task)}
                                                                    >
                                                                        <Edit className="h-4 w-4 text-gray-600" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 rounded-full hover:bg-red-100"
                                                                        onClick={() => onDeleteTask(task.id)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-gray-600">
                                                                {task.description}
                                                            </p>
                                                        </div>
                                                    </Card>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                ))}
            </DragDropContext>
        </div>
    );
};

export default KanbanView;