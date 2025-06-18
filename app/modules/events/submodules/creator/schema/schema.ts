// events/schema.ts
import { z } from 'zod';
export interface Event {
  id: string;
  title: string;
  event_type: string;
  possible_date: string; // Si lo manejas como string o puedes usar Date
  status: 'initialized' | 'in_process' | 'completed' | 'abandoned';
  budget: number; // <--- Budget field here
  tags: string[];
  custom_tags: string[];
}

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  event_type: z.enum(['wedding', 'corporate', 'birthday']),
  possible_date: z.date().refine(date => date > new Date(), "Date must be in the future"),
  tags: z.array(z.string()).default([]),
  custom_tags: z.array(z.string()).default([]),
  status: z.enum(['initialized', 'in_process', 'completed', 'abandoned']).default('initialized'),
  budget: z.number().optional(), // Added budget field as optional number
});