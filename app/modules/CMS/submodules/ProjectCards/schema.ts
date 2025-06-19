import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  image_url: z.string().url(),
  project_url: z.string().url().nullable(),
  technologies: z.array(z.string()),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
