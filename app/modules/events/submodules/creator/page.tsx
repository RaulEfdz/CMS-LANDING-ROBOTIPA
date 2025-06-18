// app/events/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { removeAllEvent } from "./handler/removeAllEvents";
import { Button } from "@/components/ui/button";
import { EventForm } from "./components/EventForm";
import { EventCard } from "./components/EventCard";
import { selectAll } from "@/app/actions/selectAll";

// Definimos el type alias para el estado
type EventStatus = "initialized" | "in_process" | "completed" | "abandoned";

// Definimos la interfaz para los eventos
export interface Event {
  // Export the interface if you want to import it in selectAll.ts
  id: string;
  title: string;
  event_type: string;
  possible_date: string; // O Date, según convenga
  status: EventStatus;
  budget: number;
  tags: string[];
  custom_tags: string[];
}

export default function Creator() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [events, setEvents] = useState<Event[] | any>([]);

  // Función para traer los eventos desde Supabase - Now using selectAllEvents from selectAll.ts
  const fetchEvents = async () => {
    const fetchedEvents= await selectAll("events");
    setEvents(fetchedEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Función para actualizar la lista de eventos después de eliminar uno
  const handleEventDeleted = (deletedEventId: string) => {
    // Filtra el evento eliminado de la lista actual de eventos
    const updatedEvents = events.filter((event: Event) => event.id !== deletedEventId);
    setEvents(updatedEvents);
  };

  // Función para eliminar todos los eventos con confirmación
  const handlerRemoveAllEvents = async () => {
    if (events.length === 0) {
      alert("No hay eventos para eliminar."); // Opcional: mostrar un mensaje si no hay eventos
      return;
    }

    // Construir el mensaje de confirmación con títulos e IDs
    const confirmationMessage =
      `¿Estás seguro de que deseas eliminar los siguientes eventos?\n\n` +
      events.map((event:Event) => event.title);

    const confirmDelete = window.confirm(confirmationMessage);
    if (!confirmDelete) {
      return; // Si el usuario cancela, no hacer nada
    }

    const eventIdsToDelete = events.map((event:Event) => event.id);

    const result = await removeAllEvent(eventIdsToDelete); // Llama a la Server Action removeAllEvent

    if (result) {
      console.log("Todos los eventos eliminados correctamente.");
      setEvents([]); // Limpiar la lista de eventos en el estado
      // Opcional: Mostrar un mensaje de éxito al usuario
      alert("Eventos eliminados exitosamente.");
    } else {
      console.error("Fallo al eliminar los eventos", result);
      // Opcional: Mostrar un mensaje de error al usuario
      alert("Fallo al eliminar los eventos. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center">
          <Clock className="mr-2 h-6 w-6" />
          Your Events
        </h2>
        <Button
          className=" bg-red-500 shadow-none hover:bg-red-600 rounded-none"
          onClick={() => handlerRemoveAllEvents()}
        >
          Eliminar todo
        </Button>
        <EventForm onEventCreated={fetchEvents} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No hay eventos para mostrar.</p>
          </div>
        ) : (
          events.map((event: Event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              status={event.status}
              date={new Date(event.possible_date)}
              type={event.event_type}
              budget={event.budget}
              onStatusChange={fetchEvents}
              onDeleteEvent={() => handleEventDeleted(event.id)} // Pasa handleEventDeleted como callback
            />
          ))
        )}
      </div>
    </div>
  );
}
