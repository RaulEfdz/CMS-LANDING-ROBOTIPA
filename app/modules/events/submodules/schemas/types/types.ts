// types/event-types.ts

export type TaskStatus = 'pending' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled' | 'abandoned';

export interface Task {
  id: string;
  event_id: string;
  task_description: string;
  type_task: 'before' | 'during' | 'after' | 'other';
  status: TaskStatus;
  priority: string | null;
  assigned_to: string | null;
  due_date: string | null;
  notes: string | null;
}