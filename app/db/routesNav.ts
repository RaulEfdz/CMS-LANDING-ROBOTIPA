// This is sample data.

import { routesModuleCMS } from "../modules/CMS/config/routes";
import { routesModuleERP } from "../modules/ERP/config/routes";
import { routesModuleEvent } from "../modules/events/config/routes";

// routesNav.ts
export const configNav = {
  info: {
    nameApp: "App",
    version: "v1.0.0",
  },
  navMain: [
    routesModuleEvent,
    routesModuleERP,
    routesModuleCMS,
    {
      title: "Analytics",
      route: "/modules/analytics",
      items: [
        {
          title: "Usuarios",
          route: "/modules/analytics/content/users",
        },
        {
          title: "Visitas",
          route: "/modules/analytics/content/views",
        },
        {
          title: "Tasa de Rebote",
          route: "/modules/analytics/content/tr",
        },
        {
          title: "Tasa de Conversión",
          route: "/modules/analytics/content/tc",
        },
      ],
    },
    {
      title: "Profile",
      route: "/modules/profile",
      items: [
        {
          title: "Datos Personales",
          route: "#DatosPersonales", // Ruta absoluta
        },
        {
          title: "Contacto",
          route: "#Contacto", // Ruta absoluta
        },
        {
          title: "Web & Social",
          route: "#WebSocial", // Ruta absoluta
        },
        {
          title: "Preferencias",
          route: "#Preferencias", // Ruta absoluta
        },
        {
          title: "Información Adicional",
          route: "#InformacionAdicional", // Ruta absoluta
        },
      ],
    },
  ],
};
