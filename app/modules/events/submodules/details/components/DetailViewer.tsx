import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Clock, FileText, Target, Palette, Calendar, Users, Tag, Edit, Check, X } from "lucide-react";
import { Detail } from '../types/types';
import { Event } from '../../creator/types/types';
import { update } from '@/app/actions/update';

interface DetailViewerProps {
  detailData: Detail | null;
  eventData: Event | null;
}

const DetailViewer: React.FC<DetailViewerProps> = ({ detailData, eventData }) => {
  // Estado para controlar el modo edición y los datos editados
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetail, setEditedDetail] = useState<Detail | null>(detailData);
  const [editedEvent, setEditedEvent] = useState<Event | null>(eventData);

  // Actualizar el estado local cuando las props cambien
  useEffect(() => {
    setEditedDetail(detailData);
  }, [detailData]);

  useEffect(() => {
    setEditedEvent(eventData);
  }, [eventData]);

  const getStatusColor = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case 'pendiente': return 'bg-amber-500';
      case 'completado': return 'bg-emerald-500';
      case 'cancelado': return 'bg-rose-500';
      default: return 'bg-slate-500';
    }
  };

  const handleGeneratePredictions = () => {
    console.log('Generando predicciones para el evento:', detailData?.id, eventData?.id);
  };

  if (!editedDetail || !editedEvent) {
    return (
      <div className="p-4 text-center text-red-500">
        Error: No se han cargado los datos del evento y/o detalles.
      </div>
    );
  }

  // Si no estamos en modo edición, separamos los requerimientos para mostrarlos en tarjetas
  const requirementsArray = !isEditing && editedDetail.requirements
    ? editedDetail.requirements.split(', ')
    : [];

  // Función que llama a la función update para ambas tablas
  const handleSaveChanges = async () => {
    try {
      const detailResponse = await update<Detail>({
        nameTable: "details",
        id: editedDetail.id!,
        dataToUpdate: editedDetail,
        onSuccess: (updatedData) => {
          console.log("Detail updated successfully:", updatedData);
        },
        onError: (errorMessage) => {
          console.error("Error updating detail:", errorMessage);
        },
      });
      
      const eventResponse = await update<Event>({
        nameTable: "events",
        id: editedEvent.id!,
        dataToUpdate: editedEvent,
        onSuccess: (updatedData) => {
          console.log("Event updated successfully:", updatedData);
        },
        onError: (errorMessage) => {
          console.error("Error updating event:", errorMessage);
        },
      });

      if (!detailResponse.error && !eventResponse.error) {
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error saving changes:", err);
    }
  };

  // Cancelar la edición y revertir cambios
  const handleCancelEdit = () => {
    setEditedDetail(detailData);
    setEditedEvent(eventData);
    setIsEditing(false);
  };

  return (
    <div className=" w-full mx-auto border-none">
      <Card className="rounded-none border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg">
        <CardHeader className="border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editedEvent.title} 
                  onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value } as Event)}
                  className="text-3xl font-bold bg-transparent border-b border-slate-300 dark:border-slate-600 focus:outline-none"
                />
              ) : (
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  {editedEvent.title || ""}
                </CardTitle>
              )}
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {isEditing ? (
                    <input 
                      type="date" 
                      value={new Date(editedEvent.possible_date).toISOString().substring(0,10)}
                      onChange={(e) => setEditedEvent({ ...editedEvent, possible_date: e.target.value } as Event)}
                      className="border-b border-slate-300 dark:border-slate-600 focus:outline-none"
                    />
                  ) : (
                    <span>{new Date(editedEvent.possible_date).toLocaleDateString()}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editedEvent.event_type} 
                      onChange={(e) => setEditedEvent({ ...editedEvent, event_type: e.target.value } as Event)}
                      className="border-b border-slate-300 dark:border-slate-600 focus:outline-none"
                    />
                  ) : (
                    <span className="capitalize font-bold">{editedEvent.event_type}</span>
                  )}
                </div>
              </div>
            </div>
            {isEditing ? (
              <select 
                value={editedDetail.status_detail || ''}
                onChange={(e) => setEditedDetail({ ...editedDetail, status_detail: e.target.value })}
                className="rounded-none px-4 py-1.5 border border-slate-300 dark:border-slate-600"
              >
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            ) : (
              <Badge className={`${getStatusColor(editedDetail.status_detail)} rounded-none px-4 py-1.5`}>
                {editedDetail.status_detail || 'Sin Estado'}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Descripción
              </h3>
              {isEditing ? (
                <textarea
                  value={editedDetail.description || ''}
                  onChange={(e) => setEditedDetail({ ...editedDetail, description: e.target.value })}
                  className="w-full border border-slate-300 dark:border-slate-600 p-2 rounded"
                />
              ) : (
                <p className="text-slate-600 dark:text-slate-400">
                  {editedDetail.description || 'Sin descripción'}
                </p>
              )}
            </div>

            <div className="border-l-4 border-purple-500 pl-4 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-500" />
                Tema
              </h3>
              {isEditing ? (
                <input 
                  type="text" 
                  value={editedDetail.theme || ''}
                  onChange={(e) => setEditedDetail({ ...editedDetail, theme: e.target.value })}
                  className="w-full border-b border-slate-300 dark:border-slate-600 focus:outline-none"
                />
              ) : (
                <p className="text-slate-600 dark:text-slate-400">
                  {editedDetail.theme || 'Sin tema definido'}
                </p>
              )}
            </div>
          </div>

          <div className="border-l-4 border-emerald-500 pl-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-500" />
              Requerimientos
            </h3>
            {isEditing ? (
              <input 
                type="text" 
                value={editedDetail.requirements || ''}
                onChange={(e) => setEditedDetail({ ...editedDetail, requirements: e.target.value })}
                className="w-full border-b border-slate-300 dark:border-slate-600 focus:outline-none"
                placeholder="Separar requerimientos con comas"
              />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {requirementsArray.map((req, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-800 p-2 text-sm">
                    {req}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="border-t border-slate-200 dark:border-slate-700 p-6">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>ID: {editedDetail.id?.substring(0, 8)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {isEditing ? (
                  <input 
                    type="number" 
                    value={editedEvent.budget}
                    onChange={(e) => setEditedEvent({ ...editedEvent, budget: Number(e.target.value) } as Event)}
                    className="border-b border-slate-300 dark:border-slate-600 focus:outline-none w-24"
                  />
                ) : (
                  <span>Presupuesto: ${editedEvent.budget}</span>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSaveChanges}
                    className="w-full rounded-none bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white transition-all duration-300"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    className="w-full rounded-none bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white transition-all duration-300"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleGeneratePredictions}
                    className="w-full rounded-none bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-700 dark:to-slate-900 hover:from-slate-800 hover:to-slate-600 text-white transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generar Predicciones
                  </Button>
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="w-full rounded-none bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all duration-300"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DetailViewer;
