// components/DialogFormDetailsEvent.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Detail } from "../types/types";
import { RequirementsSelector } from "./RequirementsSelector";

interface DialogFormDetailsEventProps {
  eventType: string;
  onComplete: (data: Detail) => void;
}

export function DialogFormDetailsEvent({
  eventType,
  onComplete,
}: DialogFormDetailsEventProps) {
  const [open, setOpen] = useState(false);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>(
    []
  );

  const [formData, setFormData] = useState<Detail>({
    id: "",
    event_id: "",
    description: "",
    status_detail: "",
    requirements: "",
    theme: "",
  });

  const handleRequirementsChange = (requirements: string[]) => {
    setSelectedRequirements(requirements);
    setFormData((prev) => ({
      ...prev,
      requirements: requirements.join(", "),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Detallar Evento</Button>
      </DialogTrigger>
      <DialogContent className="w-auto min-w-[70rem]">
        <DialogHeader>
          <DialogTitle>Detalles del Evento ({eventType})</DialogTitle>
          <DialogDescription>
            Configura los detalles específicos para este tipo de evento.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Campo para description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              className="col-span-3 border p-2 rounded"
            />
            <p className="col-start-2 col-span-3 text-sm text-gray-500">
              Descripción general del evento {eventType}.
            </p>
          </div>

          {/* Componente de Requisitos */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="requirements" className="text-right">
              Requisitos
            </label>
            <div className="col-span-3">
              <RequirementsSelector
                eventType={eventType}
                selectedRequirements={selectedRequirements}
                onRequirementsChange={handleRequirementsChange}
              />
              <p className="mt-2 text-sm text-gray-500">
                {eventType === "boda" &&
                  "Seleccione elementos para la ceremonia y recepción"}
                {eventType === "cumpleaños" &&
                  "Seleccione elementos para la fiesta infantil"}
                {eventType === "conferencia" &&
                  "Seleccione recursos necesarios para el evento"}
                {eventType === "educativa" &&
                  "Seleccione materiales educativos requeridos"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="theme" className="text-right">
              Tema
            </label>
            <input
              id="theme"
              name="theme"
              onChange={handleChange}
              className="col-span-3 border p-2 rounded"
            />
            <p className="col-start-2 col-span-3 text-sm text-gray-500">
              Indica el tema principal del evento.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              onComplete(formData);
              setOpen(false);
            }}
          >
            Aceptar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
