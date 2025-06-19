# Guía Avanzada: Integración del CMS con Esquema Relacional de Supabase

Esta guía detalla cómo adaptar y expandir el CMS para gestionar el nuevo esquema de base de datos relacional definido para la landing page. Seguiremos los patrones modulares existentes para crear interfaces de administración para cada una de las nuevas tablas de Supabase.

## Principios de Arquitectura del CMS

Dado el nuevo esquema, nuestro CMS manejará dos tipos principales de secciones:

1.  **Secciones de Registro Único (Configuración Global):**
    -   **Ejemplos:** `hero_content`, `header_content`, `footer_content`.
    -   **Interfaz:** Un único formulario para editar los datos de esa sección. No hay una lista de múltiples elementos.
    -   **Lógica:** `SELECT` para obtener el registro único, y `UPDATE` para guardarlo.

2.  **Secciones de Múltiples Registros (Gestión de Contenido - CRUD):**
    -   **Ejemplos:** `services`, `success_stories`, `plans`, `resources`.
    -   **Interfaz:** Una página principal que muestra una lista de todos los registros (ej. una tabla de servicios) con opciones para **Añadir**, **Editar** y **Eliminar** cada elemento. La edición/creación se hará en un formulario (posiblemente en un diálogo o una página separada).
    -   **Lógica:** `SELECT *` para listar, `INSERT` para crear, `UPDATE` para editar y `DELETE` para eliminar.

A continuación, implementaremos un ejemplo de cada tipo.

---

## Parte 1: Implementar una Sección de Registro Único (Ej: Hero)

Crearemos una interfaz para gestionar el contenido de la tabla `hero_content`.

### Paso 1.1: Crear el Submódulo `hero`

1.  Navega a `app/modules/CMS/submodules/`.
2.  Crea una nueva carpeta llamada `hero`.

### Paso 1.2: Definir el Tipo de Datos

1.  Dentro de `app/modules/CMS/submodules/hero/`, crea un archivo `types.ts`.
2.  Define la interfaz para `hero_content`.

    ```typescript
    // app/modules/CMS/submodules/hero/types.ts
    export interface HeroContent {
      id: number; // o string, dependiendo de tu PK
      welcome_title: string;
      welcome_subtitle: string;
      mission_title: string;
      mission_text: string;
      vision_title: string;
      vision_text: string;
      main_image_url: string;
      main_image_alt: string;
      main_image_ai_hint?: string;
    }
    ```

### Paso 1.3: Crear la Interfaz de Administración (`page.tsx`)

Crea el formulario para editar el contenido del Hero.

1.  Dentro de `app/modules/CMS/submodules/hero/`, crea el archivo `page.tsx`.

2.  Pega este código. Utiliza las acciones genéricas para `select` y `update`.

    ```tsx
    // app/modules/CMS/submodules/hero/page.tsx
    'use client';

    import { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
    import { Skeleton } from '@/components/ui/skeleton';
    import { selectAll } from '@/app/actions/selectAll';
    import { update } from '@/app/actions/update';
    import { HeroContent } from './types';

    export default function HeroAdminPage() {
      const [data, setData] = useState<Partial<HeroContent>>({});
      const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);

      useEffect(() => {
        async function fetchData() {
          setLoading(true);
          // Como es un registro único, usamos selectAll y tomamos el primero.
          // En una app real, podrías tener un `selectById` o similar.
          const heroDataArray = await selectAll<HeroContent>('hero_content');
          if (heroDataArray && heroDataArray.length > 0) {
            setData(heroDataArray[0]);
          }
          setLoading(false);
        }
        fetchData();
      }, []);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
      };

      const handleSave = async () => {
        if (!data.id) {
          alert("Error: No se pudo identificar el registro a actualizar.");
          return;
        }
        setSaving(true);
        const { error } = await update({
            nameTable: 'hero_content',
            id: String(data.id), // El ID debe ser un string
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
        return <Card className="p-6"><Skeleton className="h-96 w-full" /></Card>;
      }

      return (
        <div className="max-w-4xl mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle>Editor de Sección Hero</CardTitle>
              <CardDescription>Administra el contenido principal de la landing page.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="welcome_title">Título de Bienvenida</Label>
                  <Input id="welcome_title" name="welcome_title" value={data.welcome_title || ''} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcome_subtitle">Subtítulo de Bienvenida</Label>
                  <Input id="welcome_subtitle" name="welcome_subtitle" value={data.welcome_subtitle || ''} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="mission_text">Texto de Misión</Label>
                  <Textarea id="mission_text" name="mission_text" value={data.mission_text || ''} onChange={handleChange} />
              </div>
               <div className="space-y-2">
                  <Label htmlFor="vision_text">Texto de Visión</Label>
                  <Textarea id="vision_text" name="vision_text" value={data.vision_text || ''} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="main_image_url">URL de Imagen Principal</Label>
                <Input id="main_image_url" name="main_image_url" value={data.main_image_url || ''} onChange={handleChange} />
              </div>
              <div className="flex justify-end pt-4">
                  <Button onClick={handleSave} disabled={saving}>
                      {saving ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    ```

### Paso 1.4: Actualizar la Navegación

Añade la nueva sección al archivo de rutas del CMS.

1.  Abre `app/modules/CMS/config/routes.ts`.
2.  Añade el enlace a "Hero".

    ```typescript
    // app/modules/CMS/config/routes.ts
    export const routesModuleCMS = {
      title: "CMS",
      route: "/modules/CMS",
      items: [
        {
          title: "Hero", // <-- AÑADIR
          route: "/modules/CMS/submodules/hero",
        },
        {
          title: "Header",
          route: "/modules/CMS/submodules/header",
        },
        {
          title: "Footer",
          route: "/modules/CMS/submodules/footer",
        }
      ],
    };
    ```

---

## Parte 2: Implementar una Sección CRUD (Ej: Services)

Ahora, el patrón para gestionar múltiples registros, como los servicios.

### Paso 2.1: Crear el Submódulo `services`

1.  Navega a `app/modules/CMS/submodules/`.
2.  Crea una nueva carpeta llamada `services`.

### Paso 2.2: Definir Tipos de Datos

1.  Dentro de `app/modules/CMS/submodules/services/`, crea un archivo `types.ts`.
2.  Define las interfaces para `services` y sus tablas relacionadas.

    ```typescript
    // app/modules/CMS/submodules/services/types.ts
    export interface Service {
      id: string;
      title: string;
      industry?: string;
      service_type?: string;
      short_description?: string;
      long_description?: string;
      image?: string;
      has_demo?: boolean;
    }

    // Puedes añadir las otras interfaces (ServiceFeature, etc.) aquí también.
    ```

### Paso 2.3: Crear la Interfaz de Administración (`page.tsx`)

Esta página listará los servicios y permitirá gestionarlos.

1.  Dentro de `app/modules/CMS/submodules/services/`, crea el archivo `page.tsx`.

2.  Pega este código. Este es un gestor completo que lista los servicios y abre un diálogo para crear/editar.

### Paso 2.4: Crear el Componente de Formulario (`ServiceFormDialog.tsx`)

Este componente reutilizable gestionará la creación y edición de un servicio.

1.  Crea la carpeta `components` dentro de `app/modules/CMS/submodules/services/`.
2.  Dentro, crea el archivo `ServiceFormDialog.tsx`.

    ```tsx
    // app/modules/CMS/submodules/services/components/ServiceFormDialog.tsx
    'use client';
    
    import { useState, useEffect } from 'react';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { create } from '@/app/actions/create';
    import { update } from '@/app/actions/update';
    import { Service } from '../types';

    interface ServiceFormDialogProps {
      open: boolean;
      onOpenChange: (open: boolean) => void;
      service: Service | null;
      onSave: () => void;
    }

    export function ServiceFormDialog({ open, onOpenChange, service, onSave }: ServiceFormDialogProps) {
      const [formData, setFormData] = useState<Partial<Service>>({});
      const [saving, setSaving] = useState(false);

      useEffect(() => {
        if (service) {
          setFormData(service);
        } else {
          setFormData({ id: crypto.randomUUID() }); // Generar un ID para nuevos servicios
        }
      }, [service]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
      
      const handleSubmit = async () => {
        setSaving(true);
        let success = false;
        if (service) { // Editando
            const result = await update({ nameTable: 'services', id: service.id, dataToUpdate: formData });
            success = !result.error;
        } else { // Creando
            success = await create(formData, 'services');
        }
        
        if (success) {
            onSave();
            onOpenChange(false);
        } else {
            alert('Hubo un error al guardar.');
        }
        setSaving(false);
      };

      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{service ? 'Editar Servicio' : 'Nuevo Servicio'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" name="title" value={formData.title || ''} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service_type">Tipo de Servicio</Label>
                <Input id="service_type" name="service_type" value={formData.service_type || ''} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="short_description">Descripción Corta</Label>
                <Textarea id="short_description" name="short_description" value={formData.short_description || ''} onChange={handleChange} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
              <Button onClick={handleSubmit} disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }
    ```

### Paso 2.5: Actualizar la Navegación

Finalmente, añade el gestor de servicios a las rutas del CMS.

1.  Abre `app/modules/CMS/config/routes.ts`.
2.  Añade la nueva ruta.

    ```typescript
    // app/modules/CMS/config/routes.ts
    // ... (otras rutas)
        {
          title: "Services",
          route: "/modules/CMS/submodules/services",
        },
    // ...
    ```

## Conclusión y Próximos Pasos

Has implementado los dos patrones fundamentales para construir tu CMS. Ahora puedes replicar estos pasos para el resto de las tablas:

-   **Usa el patrón de Registro Único** para: `header_content`, `footer_content`.
-   **Usa el patrón CRUD** para: `success_stories`, `plans`, `resources`, `testimonials`.
-   **Para datos relacionados** (como `service_features`), puedes añadirlos como un sub-formulario dentro del diálogo de edición principal (ej. `ServiceFormDialog`). Esto requerirá lógica adicional para gestionar la creación/eliminación de estos sub-elementos.