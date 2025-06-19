import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { galleryImageSchema } from "../schema";
import { GalleryImage } from "../types";
import { z } from "zod";

interface Props {
  defaultValues?: Partial<GalleryImage>;
  onSubmit: (data: z.infer<typeof galleryImageSchema>) => void;
  isLoading?: boolean;
}

export function ComponentForm({ defaultValues, onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof galleryImageSchema>>({
    resolver: zodResolver(galleryImageSchema),
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
          placeholder="Título de la imagen"
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
      <button type="submit" className="btn" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
