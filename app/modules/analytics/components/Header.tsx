"use client";

import LogoutButton from "@/app/auth/LogoutButton";
import { createClient } from "@/utils/supabase/client"; // Importa createClient
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js"; // Importa el tipo Session de Supabase
import { MenuBar, MenuItem } from "./MunuBar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
  const menuItems: MenuItem[] = [
    {
      type: "menu",
      label: "Archivo",
      items: [
        {
          type: "item",
          label: "Nueva Nota",
          shortcut: "⌘N",
          onClick: () => console.log("Nueva Nota clicked"),
        },
        {
          type: "item",
          label: "Nueva Carpeta",
          shortcut: "⌘F",
          onClick: () => console.log("Nueva Carpeta clicked"),
        },
        { type: "separator" },
        {
          type: "sub",
          label: "Importar",
          items: [
            {
              type: "item",
              label: "Documento PDF",
              onClick: () => console.log("Importar PDF clicked"),
            },
            {
              type: "item",
              label: "Documento Word",
              onClick: () => console.log("Importar Word clicked"),
            },
            {
              type: "item",
              label: "Imagen",
              onClick: () => console.log("Importar Imagen clicked"),
            },
          ],
        },
        { type: "separator" },
        {
          type: "item",
          label: "Exportar nota...",
          shortcut: "⌘E",
          onClick: () => console.log("Exportar clicked"),
        },
      ],
    },
    {
      type: "menu",
      label: "IA",
      items: [
        {
          type: "item",
          label: "Resumir Texto",
          shortcut: "⌘R",
          onClick: () => console.log("Resumir clicked"),
        },
        {
          type: "item",
          label: "Generar Ideas",
          shortcut: "⌘I",
          onClick: () => console.log("Ideas clicked"),
        },
        { type: "separator" },
        {
          type: "sub",
          label: "Análisis",
          items: [
            {
              type: "item",
              label: "Análisis de Sentimiento",
              onClick: () => console.log("Sentimiento clicked"),
            },
            {
              type: "item",
              label: "Extracción de Palabras Clave",
              onClick: () => console.log("Keywords clicked"),
            },
            {
              type: "item",
              label: "Clasificación de Texto",
              onClick: () => console.log("Clasificación clicked"),
            },
          ],
        },
        { type: "separator" },
        {
          type: "item",
          label: "Traducir",
          shortcut: "⌘T",
          onClick: () => console.log("Traducir clicked"),
        },
      ],
    },
    {
      type: "menu",
      label: "Editar",
      items: [
        {
          type: "item",
          label: "Deshacer",
          shortcut: "⌘Z",
          onClick: () => console.log("Undo clicked"),
        },
        {
          type: "item",
          label: "Rehacer",
          shortcut: "⌘⇧Z",
          onClick: () => console.log("Redo clicked"),
        },
        { type: "separator" },
        {
          type: "sub",
          label: "Formato",
          items: [
            {
              type: "item",
              label: "Negrita",
              shortcut: "⌘B",
              onClick: () => console.log("Bold clicked"),
            },
            {
              type: "item",
              label: "Cursiva",
              shortcut: "⌘I",
              onClick: () => console.log("Italic clicked"),
            },
            {
              type: "item",
              label: "Subrayado",
              shortcut: "⌘U",
              onClick: () => console.log("Underline clicked"),
            },
          ],
        },
      ],
    },
    {
      type: "menu",
      label: "Ver",
      items: [
        {
          type: "item",
          label: "Modo Oscuro",
          shortcut: "⌘⇧D",
          onClick: () => console.log("Dark Mode clicked"),
        },
        {
          type: "item",
          label: "Pantalla Completa",
          shortcut: "⌘⇧F",
          onClick: () => console.log("Fullscreen clicked"),
        },
        { type: "separator" },
        {
          type: "sub",
          label: "Paneles",
          items: [
            {
              type: "item",
              label: "Explorador",
              onClick: () => console.log("Explorer clicked"),
            },
            {
              type: "item",
              label: "Panel de IA",
              onClick: () => console.log("AI Panel clicked"),
            },
            {
              type: "item",
              label: "Historial",
              onClick: () => console.log("History clicked"),
            },
          ],
        },
      ],
    },
  ];

  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null); // Explicitamente tipado session como Session | null
  const [isLoadingSession, setIsLoadingSession] = useState(true); // Estado para controlar la carga inicial de la sesión

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoadingSession(true);
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession as Session | null); // Casteo explícito para asegurar el tipo en caso de que sea undefined
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setIsLoadingSession(false);
      }
    };

    fetchSession();
  }, [supabase]);


  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-6 justify-between"> {/* Añadido justify-between */}
        <div className="flex items-center"> {/* Contenedor para SidebarTrigger y MenuBar */}
          <SidebarTrigger />
          <MenuBar items={menuItems} />
        </div>
        <div className="flex items-center"> {/* Contenedor para el botón de Logout */}
          {!isLoadingSession && session && <LogoutButton/>} {/* Renderiza LogoutButton si hay sesión */}
        </div>
      </div>
    </header>
  );
};