import React from "react";
import { useGallery } from "./hooks/useGallery";
import { ComponentForm } from "./components/ComponentForm";
import { ComponentList } from "./components/ComponentList";
import { ComponentTabs } from "./components/ComponentTabs";
import { GalleryImage } from "./types";

function isSupabaseConnectionError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: string }).message === "string" &&
    ((error as { message: string }).message.includes("Failed to fetch") ||
      (error as { message: string }).message.includes("NetworkError") ||
      (error as { message: string }).message.includes("connection"))
  );
}

function isSupabaseTableMissingError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: string }).message === "string" &&
    (error as { message: string }).message.includes(
      'relation "public.gallery" does not exist'
    )
  );
}

export default function GalleryContainer() {
  const { listQuery, createMutation, updateMutation, deleteMutation } =
    useGallery();
  const [selected, setSelected] = React.useState<GalleryImage | null>(null);
  const [formValues, setFormValues] = React.useState<Partial<GalleryImage>>({});

  React.useEffect(() => {
    if (selected) setFormValues(selected);
    else setFormValues({});
  }, [selected]);

  if (listQuery.isLoading) return <div>Cargando...</div>;
  if (listQuery.error) {
    if (isSupabaseConnectionError(listQuery.error)) {
      return (
        <div className="text-red-600 font-bold">
          No hay conexión actual a la base de datos.
        </div>
      );
    }
    if (isSupabaseTableMissingError(listQuery.error)) {
      return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <h2 className="text-xl font-bold mb-2">Galería de Imágenes</h2>
          <p className="mb-2 font-semibold">
            Error: La tabla <code>gallery</code> no existe en la base de datos.
          </p>
          <ul className="list-disc ml-6 text-sm">
            <li>
              Verifica que la migración de la tabla <code>gallery</code> se haya
              ejecutado correctamente en Supabase.
            </li>
            <li>
              Si es un entorno nuevo, crea la tabla desde el panel de Supabase o
              ejecuta la migración SQL correspondiente.
            </li>
            <li>Recarga la página después de solucionar el problema.</li>
          </ul>
        </div>
      );
    }
    return <div>Error: {(listQuery.error as Error).message}</div>;
  }

  const handleSave = (data: GalleryImage) => {
    if (selected) {
      updateMutation.mutate({ id: selected.id, input: data });
    } else {
      createMutation.mutate(data);
    }
    setSelected(null);
  };

  return (
    <div className="space-y-8">
      <ComponentTabs
        values={formValues}
        onChange={(field, value) =>
          setFormValues((f) => ({ ...f, [field]: value }))
        }
      />
      <ComponentForm
        defaultValues={formValues}
        onSubmit={handleSave}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
      <ComponentList
        items={listQuery.data || []}
        onEdit={(item) => setSelected(item)}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </div>
  );
}
