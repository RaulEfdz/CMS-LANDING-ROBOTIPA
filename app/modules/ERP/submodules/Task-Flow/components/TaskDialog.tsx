// app/modules/Task-Flow/components/TaskDialog.tsx
'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FormEvent, useState, useEffect } from 'react';
import { TaskType } from "../types/types";


interface TaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (taskData: { title: string; description: string, id?: string }) => Promise<void>; // Modified onSave to return Promise<void>
    editingTask: TaskType | null;
    setEditingTask: React.Dispatch<React.SetStateAction<TaskType | null>>;
}

export const TaskDialog: React.FC<TaskDialogProps> = ({ open, onOpenChange, onSave, editingTask, setEditingTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTask]);

    const handleSubmit = async (event: FormEvent) => { // Added async
        event.preventDefault();
        if (!title || !description) return;

        const taskData = { title, description, ...(editingTask?.id ? { id: editingTask.id } : {}) };

        await onSave(taskData); // Await the onSave promise
        onOpenChange(false);
        setEditingTask(null);
        setTitle('');
        setDescription('');
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{editingTask ? "Edit Task" : "Create New Task"}</DialogTitle>
                    <DialogDescription>
                        {editingTask ? "Edit your task details here." : "Enter the details for your new task."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            placeholder="Task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>{editingTask ? "Update Task" : "Create Task"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};