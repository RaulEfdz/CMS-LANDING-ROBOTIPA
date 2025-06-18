// "use client"
// app/modules/events/actions/actions.ts
import { eventSchema } from '../schema/schema';
import { z } from 'zod';

export type ValidEventData = z.infer<typeof eventSchema>;

export async function formatAndValidateEventData(formData: FormData): Promise<ValidEventData> {
  const rawData = {
    title: formData.get('title'),
    event_type: formData.get('event_type'),
    possible_date: new Date(formData.get('possible_date') as string),
    tags: JSON.parse(formData.get('tags') as string || '[]'),
    custom_tags: JSON.parse(formData.get('custom_tags') as string || '[]'),
    budget: parseFloat(formData.get('budget') as string || '0'),
  };

  const result = eventSchema.safeParse(rawData);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    throw new Error(JSON.stringify(errors));
  }

  return result.data;
}


