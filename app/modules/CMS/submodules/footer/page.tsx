"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Trash2,
  Save,
  CheckCircle,
  Settings,
  Menu,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

type MenuItem = {
  label: string;
  link: string;
};

type FooterData = {
  name: string;
  copyright: string;
  menu: MenuItem[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
};

const footerData = {
  name: "CIIMED",
  copyright: "© 2025 CIIMED. Todos los derechos reservados.",
  menu: [
    { label: "Inicio", link: "/" },
    { label: "Sobre Nosotros", link: "/sobre-nosotros" },
    { label: "Áreas de Investigación", link: "/areas-investigacion" },
    { label: "Formación y Capacitación", link: "/formacion-capacitacion" },
    { label: "Alianzas Estratégicas", link: "/alianzas-estrategicas" },
    { label: "Participa con Nosotros", link: "/participa" },
    { label: "Contacto", link: "/contacto" },
  ],
  contact: {
    email: "contacto@ejemplo.com",
    phone: "+123 456 7890",
    address: "Calle Ejemplo, Ciudad, País",
  },
};

export default function Page() {
  const [data, setData] = useState<FooterData>(footerData);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Omit<FooterData, "menu" | "contact">
  ) => {
    setData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof FooterData["contact"]
  ) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [key]: e.target.value },
    }));
  };

  const handleMenuChange = (
    index: number,
    field: "label" | "link",
    value: string
  ) => {
    setData((prev) => {
      const newMenu = [...prev.menu];
      newMenu[index][field] = value;
      return { ...prev, menu: newMenu };
    });
  };

  const addMenuItem = () => {
    setData((prev) => ({
      ...prev,
      menu: [...prev.menu, { label: "", link: "" }],
    }));
  };

  const removeMenuItem = (index: number) => {
    setData((prev) => ({
      ...prev,
      menu: prev.menu.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Simular guardar datos
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Datos guardados:", data);
    setSaved(true);
    setIsLoading(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "menu", label: "Menú", icon: Menu },
    { id: "contact", label: "Contacto", icon: Phone },
  ];

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full h-full">
        {/* Header */}
        <div className="w-full bg-white rounded-t-2xl shadow-lg p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Editor de Footer
              </h1>
              <p className="text-gray-600 mt-1">
                Personaliza la información del pie de página
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

        {/* Tabs */}
        <div className="w-full bg-white shadow-lg border-b border-gray-100">
          <div className="flex w-full">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 flex-1 justify-center ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="w-full bg-white rounded-b-2xl shadow-lg p-6 flex-1">
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Nombre de la Organización
                  </Label>
                  <Input
                    value={data.name}
                    onChange={(e) => handleChange(e, "name")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingresa el nombre de la organización"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Copyright
                  </Label>
                  <Textarea
                    value={data.copyright}
                    onChange={(e) => handleChange(e, "copyright")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingresa el texto de copyright"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Menu Tab */}
          {activeTab === "menu" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Elementos del Menú
                </h3>
                <Button
                  onClick={addMenuItem}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Elemento
                </Button>
              </div>

              <div className="space-y-4">
                {data.menu.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">
                        Elemento {index + 1}
                      </span>
                      {data.menu.length > 1 && (
                        <Button
                          onClick={() => removeMenuItem(index)}
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          Eliminar
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Etiqueta
                        </Label>
                        <Input
                          value={item.label}
                          onChange={(e) =>
                            handleMenuChange(index, "label", e.target.value)
                          }
                          placeholder="Texto del menú"
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Enlace
                        </Label>
                        <Input
                          value={item.link}
                          onChange={(e) =>
                            handleMenuChange(index, "link", e.target.value)
                          }
                          placeholder="/ruta-del-enlace"
                          className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg font-semibold text-gray-900">
                Información de Contacto
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Mail className="w-4 h-4" />
                    Correo Electrónico
                  </Label>
                  <Input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => handleContactChange(e, "email")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Phone className="w-4 h-4" />
                    Teléfono
                  </Label>
                  <Input
                    type="tel"
                    value={data.contact.phone}
                    onChange={(e) => handleContactChange(e, "phone")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+123 456 7890"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MapPin className="w-4 h-4" />
                  Dirección
                </Label>
                <Textarea
                  value={data.contact.address}
                  onChange={(e) => handleContactChange(e, "address")}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Calle, Ciudad, País"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="w-full mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
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
        </div>
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
  );
}
