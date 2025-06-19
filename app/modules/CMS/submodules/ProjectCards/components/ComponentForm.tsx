import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../schema";
import { Project } from "../types";
import { z } from "zod";

interface Props {
  defaultValues?: Partial<Project>;
  onSubmit: (data: z.infer<typeof projectSchema>) => void;
  isLoading?: boolean;
}

export function ComponentForm({ defaultValues, onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          {...register("title")}
          className="input"
          placeholder="Título del proyecto"
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          {...register("description")}
          className="input"
          placeholder="Descripción"
        />
        {errors.description && <span>{errors.description.message}</span>}
      </div>
      <div>
        <label htmlFor="image_url">URL Imagen</label>
        <input
          id="image_url"
          {...register("image_url")}
          className="input"
          placeholder="https://..."
        />
        {errors.image_url && <span>{errors.image_url.message}</span>}
      </div>
      <div>
        <label htmlFor="project_url">URL Proyecto</label>
        <input
          id="project_url"
          {...register("project_url")}
          className="input"
          placeholder="https://..."
        />
        {errors.project_url && <span>{errors.project_url.message}</span>}
      </div>
      <div>
        <label htmlFor="technologies">Tecnologías (separadas por coma)</label>
        <input
          id="technologies"
          {...register("technologies", {
            setValueAs: (v) => v.split(",").map((s: string) => s.trim()),
          })}
          className="input"
          placeholder="React, Next.js, Tailwind"
        />
        {errors.technologies && <span>{errors.technologies.message}</span>}
      </div>
      <button type="submit" className="btn" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
