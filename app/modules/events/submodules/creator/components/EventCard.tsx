"use client"; // Asegúrate de que EventCard es un componente cliente para usar useState y select

import { useState, useEffect } from "react";
import { Clock, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EventStatus } from "../types/types";
import { Button } from "@/components/ui/button";
import { removeEvents } from "../handler/removeEvents";
import { Detail } from "../../details/types/types";
import { DialogFormDetailsEvent } from "../../details/components/DetailsEventForm";
import { createDetails } from "../../details/handler/createDetails";

import { useRouter } from "next/navigation"; // Import useRouter for programmatic navigation
import { update } from "@/app/actions/update";
import { checkItemExists } from "@/app/actions/checkItemExists";

export type EventCardProps = {
  id: string;
  title: string;
  status: EventStatus;
  date: Date;
  type: string;
  budget: number | null;
  onStatusChange?: () => void; // onStatusChange se mantiene si lo usas para otra lógica en el cliente
  onDeleteEvent?: () => void;
};

function StatusBadge({ status }: { status: EventStatus }) {
  const getStatusStyle = () => {
    const baseStyle = "px-3 py-1 text-sm font-medium border-2";
    switch (status) {
      case "initialized":
        return `${baseStyle} border-blue-200 bg-blue-50 text-blue-700`;
      case "in_process":
        return `${baseStyle} border-yellow-200 bg-yellow-50 text-yellow-700`;
      case "completed":
        return `${baseStyle} border-green-200 bg-green-50 text-green-700`;
      case "abandoned":
        return `${baseStyle} border-red-200 bg-red-50 text-red-700`;
      default:
        return `${baseStyle} border-gray-200 bg-gray-50 text-gray-700`;
    }
  };

  return (
    <span className={getStatusStyle()}>
      {status.replace("_", " ").charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export function EventCard({
  id,
  title,
  status,
  date,
  type,
  budget,
  onStatusChange,
  onDeleteEvent,
}: EventCardProps) {
  const [currentStatus, setCurrentStatus] = useState<EventStatus>(status);
  const [detailExists, setDetailExists] = useState<boolean | null>(null); // Initialize as null

  const router = useRouter(); // Hook useRouter for navigation

  useEffect(() => {
    const checkDetails = async () => {
      const exists = await checkItemExists("details", "event_id", id);
      setDetailExists(exists);
    };
    checkDetails();
  }, [id]); // Depend on 'id' so effect re-runs if id changes


  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = event.target.value as EventStatus;
    setCurrentStatus(newStatus);

    const result = await update({
      nameTable: "events",
      id: id,
      dataToUpdate: { status: newStatus },
      onSuccess: (updatedData) => {
        if (onStatusChange) onStatusChange();
        console.log("Status updated successfully!", updatedData);
      },
      onError: (error) => {
        console.error("Failed to update status on server", error);
        setCurrentStatus(status);
      },
    });

    if (result?.error) {
      console.error("Failed to update status on server", result.error);
      setCurrentStatus(status);
    }
  };

  const handleDeleteChange = async (idToDelete: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este evento?"
    );
    if (!confirmDelete) {
      return; // Si el usuario cancela, no hacer nada
    }

    const result = await removeEvents(idToDelete); // Llama a la Server Action removeEvents

    if (result) {
      console.log("Event deleted successfully!");
      if (onDeleteEvent) {
        onDeleteEvent(); // Llama al callback onDeleteEvent si se proporciona para actualizar la lista de eventos en el componente padre
      }
    } else {
      console.error("Failed to delete event", result);
      // Opcional: Mostrar un mensaje de error al usuario (ej. usando un estado de error y un elemento para mostrar el mensaje)
    }
  };

  function createDetailsHandler(data: Detail) {
    createDetails(data, id);
    setDetailExists(true); // Optimistically update detailExists state after creating details
  }

  const handleGoToDetails = () => {
    router.push(`/modules/events/submodules/details/${id}`); // Programmatic navigation using useRouter
  };


  return (
    <Card className="border-none p-6 shadow-lg hover:shadow-xl transition-shadow rounded-none">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-xl text-primary">{title}</h3>
        <StatusBadge status={currentStatus} />
        <Button
          className="p-0 rounded-none bg-transparent shadow-none hover:bg-transparent hover:text-red-600 px-2 text-red-500"
          onClick={() => handleDeleteChange(id)}
        >
          <Trash />
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center text-base">
          <Clock className="mr-2 h-5 w-5 text-gray-600" />
          <span>{date.toLocaleDateString()}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-base">
          <div>
            <span className="text-gray-600">Type:</span>
            <span className="ml-2 font-medium">{type}</span>
          </div>
          <div>
            <span className="text-gray-600">Budget:</span>
            <span className="ml-2 font-medium">
              ${(budget ?? 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Label
            htmlFor={`status-${id}`}
            className="text-base font-semibold text-gray-700"
          >
            Update Status
          </Label>
          <select
            id={`status-${id}`}
            value={currentStatus}
            onChange={handleStatusChange}
            className="mt-2 w-full h-12 border-none rounded-none bg-slate-200 px-4 text-base focus:ring-2 focus:ring-primary"
          >
            <option value="initialized">Initialized</option>
            <option value="in_process">In Process</option>
            <option value="completed">Completed</option>
            <option value="abandoned">Abandoned</option>
          </select>
        </div>
        {detailExists === false ? ( // Use === false for strict boolean check
        <DialogFormDetailsEvent
          eventType={type} // Pass eventType dynamically
          onComplete={(data: Detail) => createDetailsHandler(data)}
        />) : detailExists === true ? ( // Use === true for strict boolean check and check if detailExists is true
          <Button  onClick={handleGoToDetails}>Ir a ver detalles </Button>
        ) : (
          <div>Cargando...</div> // Or some other loading indicator, detailExists is initially null
        )}
      </div>
    </Card>
  );
}