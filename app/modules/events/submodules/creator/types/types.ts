// app/modules/events/types/types.ts
export type EventStatus = 'initialized' | 'in_process' | 'completed' | 'abandoned';

export interface Event {
    id: string;
    title: string;
    event_type: string;
    possible_date: string; // Si lo manejas como string o puedes usar Date
    status: 'initialized' | 'in_process' | 'completed' | 'abandoned';
    budget: number;
    tags: string[];
    custom_tags: string[];
  }