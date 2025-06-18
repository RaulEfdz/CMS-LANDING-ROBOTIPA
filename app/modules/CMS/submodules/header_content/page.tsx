"use client";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { headerContentSchema, HeaderContentSchema } from "./schema";
import { getHeaderContent, updateHeaderContent } from "./actions";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Save,
  CheckCircle,
  Menu,
  Link2,
  Zap,
  ExternalLink,
  Plus,
  Trash2,
} from "lucide-react";

export default function HeaderContentPage() {
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<HeaderContentSchema | null>(
    null
  );
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<HeaderContentSchema>({
    resolver: zodResolver(headerContentSchema),
    defaultValues: initialData ?? {},
  });

  const {
    fields: navLinksFields,
    append: appendNavLink,
    remove: removeNavLink,
  } = useFieldArray({
    control,
    name: "nav_links",
  });

  const {
    fields: quickLinksFields,
    append: appendQuickLink,
    remove: removeQuickLink,
  } = useFieldArray({
    control,
    name: "quick_links",
  });

  useEffect(() => {
    getHeaderContent()
      .then((data) => {
        setInitialData(data);
        reset(data);
      })
      .catch(() =>
        toast({
          title: "Error",
          description: "No se pudo cargar el contenido.",
        })
      )
      .finally(() => setLoading(false));
  }, [reset, toast]);

  const onSubmit = async (values: HeaderContentSchema) => {
    try {
      await updateHeaderContent(values);
      setSaved(true);
      toast({
        title: "Guardado",
        description: "Cambios guardados correctamente.",
      });
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "No se pudo guardar.";
      toast({ title: "Error", description: errorMsg });
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!initialData) return <div>No hay datos de header_content.</div>;

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full h-full">
        <div className="w-full bg-white rounded-t-2xl shadow-lg p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Editor de Header
              </h1>
              <p className="text-gray-600 mt-1">
                Personaliza la información del encabezado
              </p>
            </div>
            {saved && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full animate-pulse">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Guardado exitosamente</span>
              </div>
            )}
          </div>
        </div>
        <div className="w-full bg-white shadow-lg border-b border-gray-100">
          <div className="flex w-full">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 flex-1 justify-center ${
                activeTab === "general"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Zap className="w-4 h-4" /> General
            </button>
            <button
              onClick={() => setActiveTab("nav")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 flex-1 justify-center ${
                activeTab === "nav"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Menu className="w-4 h-4" /> Menú Principal
            </button>
            <button
              onClick={() => setActiveTab("cta")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 flex-1 justify-center ${
                activeTab === "cta"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <ExternalLink className="w-4 h-4" /> CTA
            </button>
            <button
              onClick={() => setActiveTab("quick")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 flex-1 justify-center ${
                activeTab === "quick"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Link2 className="w-4 h-4" /> Enlaces Rápidos
            </button>
          </div>
        </div>
        <div className="w-full bg-white rounded-b-2xl shadow-lg p-6 flex-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            {activeTab === "general" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Título
                    </Label>
                    <Input
                      {...register("title")}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.title && (
                      <span className="text-red-500">
                        {errors.title.message}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Subtítulo
                    </Label>
                    <Input
                      {...register("subtitle")}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Logo URL
                  </Label>
                  <Input
                    {...register("logo_url")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
            {activeTab === "nav" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Enlaces de Navegación
                  </h3>
                  <Button
                    type="button"
                    onClick={() => appendNavLink({ label: "", url: "" })}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" /> Añadir enlace
                  </Button>
                </div>
                <div className="space-y-4">
                  {navLinksFields.map((field, idx) => (
                    <div
                      key={field.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">
                          Enlace {idx + 1}
                        </span>
                        {navLinksFields.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeNavLink(idx)}
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Eliminar
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">
                            Etiqueta
                          </Label>
                          <Input
                            {...register(`nav_links.${idx}.label` as const)}
                            placeholder="Etiqueta"
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">
                            URL
                          </Label>
                          <Input
                            {...register(`nav_links.${idx}.url` as const)}
                            placeholder="URL"
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {errors.nav_links && (
                    <span className="text-red-500">
                      {errors.nav_links.message as string}
                    </span>
                  )}
                </div>
              </div>
            )}
            {activeTab === "cta" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      Texto del CTA
                    </Label>
                    <Input
                      {...register("cta_label")}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      URL del CTA
                    </Label>
                    <Input
                      {...register("cta_url")}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "quick" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Enlaces Rápidos
                  </h3>
                  <Button
                    type="button"
                    onClick={() => appendQuickLink({ name: "", url: "" })}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" /> Añadir enlace rápido
                  </Button>
                </div>
                <div className="space-y-4">
                  {quickLinksFields.map((field, idx) => (
                    <div
                      key={field.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">
                          Enlace Rápido {idx + 1}
                        </span>
                        {quickLinksFields.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeQuickLink(idx)}
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" /> Eliminar
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">
                            Nombre
                          </Label>
                          <Input
                            {...register(`quick_links.${idx}.name` as const)}
                            placeholder="Nombre"
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">
                            URL
                          </Label>
                          <Input
                            {...register(`quick_links.${idx}.url` as const)}
                            placeholder="URL"
                            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {errors.quick_links && (
                    <span className="text-red-500">
                      {errors.quick_links.message as string}
                    </span>
                  )}
                </div>
              </div>
            )}
            <div className="w-full mt-8 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Guardando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}
