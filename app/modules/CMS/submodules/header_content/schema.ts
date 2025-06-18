import { z } from "zod";

export const headerContentSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  subtitle: z.string().nullable().optional(),
  logo_url: z.string().url("Debe ser una URL válida").nullable().optional(),
  nav_links: z
    .array(
      z.object({
        label: z.string().min(1, "Etiqueta requerida"),
        url: z.string().url("Debe ser una URL válida"),
      })
    )
    .min(1, "Debe haber al menos un enlace de navegación"),
  cta_label: z.string().nullable().optional(),
  cta_url: z.string().url("Debe ser una URL válida").nullable().optional(),
  quick_links: z
    .array(
      z.object({
        name: z.string().min(1, "Nombre requerido"),
        url: z.string().url("Debe ser una URL válida"),
      })
    )
    .optional(),
});

export type HeaderContentSchema = z.infer<typeof headerContentSchema>;
