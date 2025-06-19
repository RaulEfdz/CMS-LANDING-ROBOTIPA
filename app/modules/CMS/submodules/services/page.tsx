"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { selectAll } from "@/app/actions/selectAll";
import { remove } from "@/app/actions/remove";
import { Service } from "./types";
import { ServiceFormDialog } from "./components/ServiceFormDialog";

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    const data = await selectAll<Service>("services");
    // Filtrar y forzar el tipado para evitar problemas con id undefined
    const filtered = (data || []).filter(
      (s): s is Service => !!s.id
    ) as Service[];
    setServices(filtered);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Seguro que deseas eliminar este servicio?")) {
      await remove("services", id);
      fetchServices();
    }
  };

  const handleNew = () => {
    setSelectedService(null);
    setDialogOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Gestión de Servicios</CardTitle>
          <Button onClick={handleNew}>Nuevo Servicio</Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Título</th>
                  <th className="px-4 py-2 text-left">Tipo</th>
                  <th className="px-4 py-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b">
                    <td className="px-4 py-2">{service.title}</td>
                    <td className="px-4 py-2">{service.service_type}</td>
                    <td className="px-4 py-2 space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(service)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(service.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
      <ServiceFormDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSelectedService(null);
        }}
        service={selectedService}
        onSave={fetchServices}
      />
    </div>
  );
}
