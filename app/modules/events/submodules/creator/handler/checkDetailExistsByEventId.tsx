// utils/supabase/checkDetailExistsByEventId.ts
'use client';

import { createClient } from '@/utils/supabase/client';

export const checkDetailExistsByEventId = async (eventId: string): Promise<boolean> => {
  const supabase = createClient();

  if (!eventId) {
    console.warn("checkDetailExistsByEventId: eventId is empty or undefined.");
    return false; // Return false if eventId is not provided
  }

  try {
    const { data, error } = await supabase
      .from('details')
      .select('id') // We only need to select the 'id' column to check for existence, it's efficient
      .eq('event_id', eventId)
      .limit(1); // Limit to 1 to optimize query, we only need to know if at least one exists

    if (error) {
      console.error("Error checking detail existence by eventId:", error);
      return false; // Return false in case of error
    }

    // If data is not null and has at least one element, it means a detail with this event_id exists
    return data !== null && data.length > 0;

  } catch (error) {
    console.error("Exception in checkDetailExistsByEventId:", error);
    return false; // Return false in case of exception
  }
};