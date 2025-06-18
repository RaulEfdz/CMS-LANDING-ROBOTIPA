// models.ts
"use client";

export interface NotificationState {
  email: boolean;
  sms: boolean;
}

export interface NotificationPreferences {
  promotional: boolean;
  events: boolean;
  updates: boolean;
  reminders: boolean;
}

export interface LocationPreferences {
  searchRadius: number;
  selectedZones: string[];
}

export type PrivacyLevel = 'public' | 'private';

export interface AiModel {
  value: string;
  label: string;
}

export interface SettingsData {
  notifications: NotificationState;
  notificationTypes: NotificationPreferences;
  locationPrefs: LocationPreferences;
  selectedAiModel: string;
  selectedEventTypes: string[];
  privacyLevel: PrivacyLevel;
}

export interface SettingsPanelProps {
  onSave: (settings: SettingsData) => void;
}

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Constantes de ejemplo para IA, tipos de evento y zonas
const AI_MODELS: AiModel[] = [
  { value: "gpt-3", label: "GPT-3" },
  { value: "gpt-4", label: "GPT-4" },
];

const EVENT_TYPES: string[] = ["Concierto", "Conferencia", "Deporte", "Teatro"];

const ZONES: string[] = ["Norte", "Sur", "Este", "Oeste"];

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSave }) => {
  // Estados para cada grupo de configuraciones
  const [notifications, setNotifications] = useState<NotificationState>({
    email: false,
    sms: false,
  });

  const [notificationTypes, setNotificationTypes] = useState<NotificationPreferences>({
    promotional: false,
    events: false,
    updates: false,
    reminders: false,
  });

  const [locationPrefs, setLocationPrefs] = useState<LocationPreferences>({
    searchRadius: 10,
    selectedZones: [],
  });

  const [selectedAiModel, setSelectedAiModel] = useState<string>("");
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [privacyLevel, setPrivacyLevel] = useState<PrivacyLevel>("public");

  // Handlers para actualizar estados
  const handleNotificationChange =
    (key: keyof NotificationState) => (checked: boolean) => {
      setNotifications((prev) => ({ ...prev, [key]: checked }));
    };

  const handleNotificationTypeChange =
    (key: keyof NotificationPreferences) => (checked: boolean) => {
      setNotificationTypes((prev) => ({ ...prev, [key]: checked }));
    };

  const toggleZone = (zone: string) => {
    setLocationPrefs((prev) => {
      const isSelected = prev.selectedZones.includes(zone);
      const selectedZones = isSelected
        ? prev.selectedZones.filter((z) => z !== zone)
        : [...prev.selectedZones, zone];
      return { ...prev, selectedZones };
    });
  };

  const toggleEventType = (eventType: string) => {
    setSelectedEventTypes((prev) =>
      prev.includes(eventType)
        ? prev.filter((et) => et !== eventType)
        : [...prev, eventType]
    );
  };

  const handleSave = () => {
    const settings: SettingsData = {
      notifications,
      notificationTypes,
      locationPrefs,
      selectedAiModel,
      selectedEventTypes,
      privacyLevel,
    };
    onSave(settings);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Notificaciones */}
      <Card className="rounded-none border">
        <CardHeader className="rounded-none">
          <CardTitle>Notificaciones</CardTitle>
          <CardDescription>Elige cómo quieres recibir notificaciones.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries({
            email: 'Notificaciones por Email',
            sms: 'Notificaciones por SMS',
          }).map(([key, label]) => (
            <div key={key} className="flex items-center space-x-3">
              <Checkbox
                className="rounded-none"
                id={key}
                checked={notifications[key as keyof NotificationState]}
                onCheckedChange={(checked) =>
                  handleNotificationChange(key as keyof NotificationState)(
                    Boolean(checked)
                  )
                }
              />
              <Label htmlFor={key} className="text-sm font-medium">
                {label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tipos de Notificaciones */}
      <Card className="rounded-none border">
        <CardHeader className="rounded-none">
          <CardTitle>Tipos de Notificaciones</CardTitle>
          <CardDescription>
            Personaliza los tipos de notificaciones que deseas recibir.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries({
            promotional: 'Ofertas y Promociones',
            events: 'Eventos y Actividades',
            updates: 'Actualizaciones del Sistema',
            reminders: 'Recordatorios',
          }).map(([key, label]) => (
            <div key={key} className="flex items-center space-x-3">
              <Checkbox
                className="rounded-none"
                id={`notify-${key}`}
                checked={notificationTypes[key as keyof NotificationPreferences]}
                onCheckedChange={(checked) =>
                  handleNotificationTypeChange(key as keyof NotificationPreferences)(
                    Boolean(checked)
                  )
                }
              />
              <Label htmlFor={`notify-${key}`} className="text-sm font-medium">
                {label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Preferencias de Ubicación */}
      <Card className="rounded-none border">
        <CardHeader className="rounded-none">
          <CardTitle>Preferencias de Ubicación</CardTitle>
          <CardDescription>
            Define tu área de búsqueda y zonas preferidas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Radio de Búsqueda: {locationPrefs.searchRadius} km</Label>
            <Slider
              className="rounded-none"
              value={[locationPrefs.searchRadius]}
              onValueChange={([value]) =>
                setLocationPrefs((prev) => ({ ...prev, searchRadius: value }))
              }
              min={1}
              max={50}
              step={1}
            />
          </div>
          <div className="space-y-4">
            <Label>Zonas Preferidas</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ZONES.map((zone) => (
                <div key={zone} className="flex items-center space-x-3">
                  <Checkbox
                    className="rounded-none"
                    id={`zone-${zone}`}
                    checked={locationPrefs.selectedZones.includes(zone)}
                    onCheckedChange={(checked) => {
                      if (checked !== null) toggleZone(zone);
                    }}
                  />
                  <Label htmlFor={`zone-${zone}`} className="text-sm font-medium">
                    {zone}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selección de Modelo de IA */}
      <Card className="rounded-none border">
        <CardHeader className="rounded-none">
          <CardTitle>Modelo de IA</CardTitle>
          <CardDescription>
            Selecciona el modelo de IA que mejor se adapte a tus necesidades.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedAiModel} onValueChange={setSelectedAiModel}>
            <SelectTrigger className="w-full rounded-none">
              <SelectValue placeholder="Selecciona un modelo" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {AI_MODELS.map(({ value, label }) => (
                <SelectItem key={value} value={value} className="rounded-none">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Tipos de Evento Preferidos */}
      <Card className="rounded-none border">
        <CardHeader className="rounded-none">
          <CardTitle>Tipos de Evento Preferidos</CardTitle>
          <CardDescription>
            Selecciona los tipos de eventos que te interesan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EVENT_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-3">
                <Checkbox
                  className="rounded-none"
                  id={type}
                  checked={selectedEventTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked !== null) toggleEventType(type);
                  }}
                />
                <Label htmlFor={type} className="text-sm font-medium">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuración de Privacidad */}
      <Card className="rounded-none border">
        <CardHeader className="rounded-none">
          <CardTitle>Privacidad</CardTitle>
          <CardDescription>Define la visibilidad de tus eventos.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={privacyLevel}  onValueChange={(value) => setPrivacyLevel(value as PrivacyLevel)}
          >
            <div className="space-y-4">
              {[
                { value: 'public', label: 'Eventos Públicos' },
                { value: 'private', label: 'Eventos Privados' },
              ].map(({ value, label }) => (
                <div key={value} className="flex items-center space-x-3">
                  <RadioGroupItem
                    value={value}
                    id={value}
                    className="rounded-none"
                  />
                  <Label htmlFor={value} className="text-sm font-medium">
                    {label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Botón de Guardar */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="rounded-none">
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
