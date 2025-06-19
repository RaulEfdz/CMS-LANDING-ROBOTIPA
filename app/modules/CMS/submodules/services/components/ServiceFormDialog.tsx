"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { create } from "@/app/actions/create";
import { update } from "@/app/actions/update";
import { Service } from "../types";

interface ServiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
  onSave: () => void;
}

export function ServiceFormDialog({
  open,
  onOpenChange,
  service,
  onSave,
}: ServiceFormDialogProps) {
  const [formData, setFormData] = useState<Partial<Service>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      setFormData({ id: crypto.randomUUID() });
    }
  }, [service]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    let success = false;
    if (service) {
      const result = await update({
        nameTable: "services",
        id: service.id,
        dataToUpdate: formData,
      });
      success = !result.error;
    } else {
      success = await create(formData, "services");
    }

    if (success) {
      onSave();
      onOpenChange(false);
    } else {
      alert("Hubo un error al guardar.");
    }
    setSaving(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {service ? "Editar Servicio" : "Nuevo Servicio"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service_type">Tipo de Servicio</Label>
            <Input
              id="service_type"
              name="service_type"
              value={formData.service_type || ""}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="short_description">Descripción Corta</Label>
            <Textarea
              id="short_description"
              name="short_description"
              value={formData.short_description || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
