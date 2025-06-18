"use client";

import { useState, useEffect } from "react"; // Importa useEffect
import { Calendar, Tags, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagSelector } from "./TagSelector";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Importa componentes de diálogo de Shadcn

import { createEvent } from "../handler/createEvent";

const predefinedTags = [
  { id: "catering", label: "Catering", colorClass: "bg-rose-100" },
  { id: "music", label: "Music", colorClass: "bg-blue-100" },
  { id: "decor", label: "Decoration", colorClass: "bg-green-100" },
];

interface EventFormProps {
  /** Función callback que se ejecuta una vez que se crea el evento, por ejemplo para refrescar la lista */
  onEventCreated: () => void;
}

export function EventForm({ onEventCreated }: EventFormProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [title, setTitle] = useState(""); // Estado para el título
  const [eventType, setEventType] = useState(""); // Estado para el tipo de evento
  const [possibleDate, setPossibleDate] = useState(""); // Estado para la fecha
  const [budget, setBudget] = useState(""); // Estado para el presupuesto - **AÑADIDO**
  const [isFormValid, setIsFormValid] = useState(false); // Estado para la validez del formulario
  const [open, setOpen] = useState(false); // Estado para controlar la apertura del diálogo

  useEffect(() => {
    setIsFormValid(title !== "" && eventType !== "" && possibleDate !== "");
  }, [title, eventType, possibleDate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) {
      return; // No hacer nada si el formulario no es válido
    }

    const result = await createEvent(e.currentTarget, tags, customTags, budget);

    if (result) {
      onEventCreated();
      setOpen(false); // Cierra el diálogo después de enviar
    } else {
      alert("error create event");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-none">
          <Rocket className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Event</DialogTitle>
          <DialogDescription>
            Fill in the form below to start planning your event.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Título */}
          <div>
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              name="title"
              required
              placeholder="My Awesome Event"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Actualiza el estado del título
            />
          </div>

          {/* Tipo de Evento y Fecha */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="event_type">
                <Tags className="inline mr-2 h-4 w-4" />
                Event Type *
              </Label>
              <select
                id="event_type"
                name="event_type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
                value={eventType}
                onChange={(e) => setEventType(e.target.value)} // Actualiza el estado del tipo de evento
              >
                <option value="" disabled>
                  Select event type
                </option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="birthday">Birthday</option>
              </select>
            </div>

            <div>
              <Label htmlFor="possible_date">
                <Calendar className="inline mr-2 h-4 w-4" />
                Possible Date *
              </Label>
              <Input
                type="date"
                id="possible_date"
                name="possible_date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={possibleDate}
                onChange={(e) => setPossibleDate(e.target.value)} // Actualiza el estado de la fecha
              />
            </div>
          </div>

          {/* Campo Budget */}
          <div>
            <Label htmlFor="budget">Budget</Label>
            <Input
              type="number"
              id="budget"
              name="budget"
              placeholder="Estimated Budget (optional)"
              value={budget} // **AÑADIDO: Value para controlar el input de budget**
              onChange={(e) => setBudget(e.target.value)} // **AÑADIDO: onChange para actualizar el estado de budget**
            />
          </div>

          {/* Selector de Tags */}
          <TagSelector
            predefinedTags={predefinedTags}
            onTagsChange={setTags}
            onCustomTagsChange={setCustomTags}
          />
          <DialogFooter>
            <Button type="submit" disabled={!isFormValid} className="w-full">
              <Rocket className="mr-2 h-4 w-4" />
              Start Planning
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
