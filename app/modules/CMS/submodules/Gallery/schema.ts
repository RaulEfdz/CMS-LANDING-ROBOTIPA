import { z } from "zod";

export const galleryImageSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  image_url: z.string().url(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
