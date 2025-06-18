"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { selectAll } from "@/app/actions/selectAll";
import { update } from "@/app/actions/update";
import { HeroContent } from "./types";

export default function HeroAdminPage() {
  const [data, setData] = useState<Partial<HeroContent>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const heroDataArray = await selectAll<HeroContent>("hero_content");
      if (heroDataArray && heroDataArray.length > 0) {
        setData(heroDataArray[0]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!data.id) {
      alert("Error: No se pudo identificar el registro a actualizar.");
      return;
    }
    setSaving(true);
    const { error } = await update({
      nameTable: "hero_content",
      id: String(data.id),
      dataToUpdate: data,
    });
    if (error) {
      alert("Error al guardar los cambios.");
    } else {
      alert("Contenido del Hero actualizado correctamente.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-96 w-full" />
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Editor de Sección Hero</CardTitle>
          <CardDescription>
            Administra el contenido principal de la landing page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="welcome_title">Título de Bienvenida</Label>
              <Input
                id="welcome_title"
                name="welcome_title"
                value={data.welcome_title || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="welcome_subtitle">Subtítulo de Bienvenida</Label>
              <Input
                id="welcome_subtitle"
                name="welcome_subtitle"
                value={data.welcome_subtitle || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mission_title">Título de Misión</Label>
            <Input
              id="mission_title"
              name="mission_title"
              value={data.mission_title || ""}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mission_text">Texto de Misión</Label>
            <Textarea
              id="mission_text"
              name="mission_text"
              value={data.mission_text || ""}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vision_title">Título de Visión</Label>
            <Input
              id="vision_title"
              name="vision_title"
              value={data.vision_title || ""}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="vision_text">Texto de Visión</Label>
            <Textarea
              id="vision_text"
              name="vision_text"
              value={data.vision_text || ""}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="main_image_url">URL de Imagen Principal</Label>
            <Input
              id="main_image_url"
              name="main_image_url"
              value={data.main_image_url || ""}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="main_image_alt">
              Texto alternativo de la imagen
            </Label>
            <Input
              id="main_image_alt"
              name="main_image_alt"
              value={data.main_image_alt || ""}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="main_image_ai_hint">Hint IA (opcional)</Label>
            <Input
              id="main_image_ai_hint"
              name="main_image_ai_hint"
              value={data.main_image_ai_hint || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
