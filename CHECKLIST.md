# Checklist de Autoevaluación del Sistema CMS

Este documento sirve como un checklist de calidad y completitud para cada nueva sección de contenido que se integra en el sistema. Utiliza esta lista para evaluar cada módulo (`hero`, `services`, `success_stories`, etc.) antes de considerarlo "terminado".

## Sección a Evaluar: `[nombre_de_la_seccion]`

---

### ✅ 1. Backend y Base de Datos (Supabase)

-   **[ ] Esquema de Tabla Principal:** La tabla principal (ej. `services`) ha sido creada en Supabase siguiendo el esquema SQL definido.
-   **[ ] Esquema de Tablas Relacionadas:** Todas las tablas de soporte (ej. `service_features`, `service_company_sizes`) han sido creadas.
-   **[ ] Tipos de Datos Correctos:** Las columnas usan los tipos de datos adecuados (TEXT, BOOLEAN, JSONB, TIMESTAMPTZ, etc.).
-   **[ ] Claves y Relaciones:** Se han definido correctamente las claves primarias (`id`) y las claves foráneas (`FOREIGN KEY`) con sus respectivas acciones `ON DELETE CASCADE`.
-   **[ ] Row Level Security (RLS):** RLS está **habilitado** para todas las nuevas tablas.
-   **[ ] Políticas de Acceso:** Se han creado las políticas de RLS necesarias (SELECT, INSERT, UPDATE, DELETE) para los roles de usuario correspondientes (ej. `authenticated`, `service_role`).
-   **[ ] Datos de Prueba (Seed):** Se ha insertado al menos un registro de prueba en cada tabla para facilitar el desarrollo y las pruebas iniciales.

---

### ✅ 2. Módulo de Administración (CMS)

#### 2.1 Estructura y Navegación

-   **[ ] Estructura de Carpetas:** El nuevo módulo se ha creado en `app/modules/CMS/submodules/[nombre_seccion]/`.
-   **[ ] Definición de Tipos:** Se ha creado un archivo `types.ts` con las interfaces de TypeScript correspondientes a las tablas de Supabase.
-   **[ ] Integración en la Navegación:** La nueva sección ha sido añadida a `app/modules/CMS/config/routes.ts`.
-   **[ ] Visibilidad en la UI:** El enlace a la nueva sección aparece y funciona correctamente en la barra lateral del CMS.

#### 2.2 Funcionalidad (Patrón CRUD para Múltiples Registros)

*Aplica para secciones como `services`, `resources`, `plans`, etc.*

-   **[ ] Vista de Lista:** La página principal del módulo (`page.tsx`) muestra una tabla o lista con todos los registros de la tabla principal.
-   **[ ] Acción `selectAll`:** La lista de datos se obtiene correctamente usando la acción genérica `selectAll`.
-   **[ ] Botón de Creación:** Existe un botón "Añadir Nuevo" que abre el formulario de creación.
-   **[ ] Formulario de Creación/Edición:** Se ha creado un componente de formulario (ej. en un `Dialog`) que maneja tanto la creación como la edición.
-   **[ ] Acción `create`:** El formulario, en modo "Creación", utiliza la acción `create` para guardar un nuevo registro.
-   **[ ] Acción `update`:** El formulario, en modo "Edición", utiliza la acción `update` para modificar un registro existente.
-   **[ ] Acción `remove`:** El botón de "Eliminar" en cada registro utiliza la acción `remove` para borrarlo de la base de datos.
-   **[ ] Feedback al Usuario:** El sistema proporciona feedback claro (ej. alertas, toasts) después de cada operación (creado, actualizado, eliminado, error).
-   **[ ] Manejo de Relaciones (Avanzado):** Si la sección tiene datos relacionados (ej. características de un servicio), el formulario permite gestionarlos.

#### 2.3 Funcionalidad (Patrón de Registro Único)

*Aplica para secciones como `hero_content`, `header_content`, `footer_content`.*

-   **[ ] Vista de Formulario:** La página principal del módulo (`page.tsx`) es un formulario para editar los campos de la sección.
-   **[ ] Carga de Datos Iniciales:** Al cargar la página, los datos del registro único se obtienen de Supabase y se muestran en el formulario.
-   **[ ] Acción `update`:** El botón "Guardar Cambios" utiliza la acción `update` para persistir todas las modificaciones en el único registro.
-   **[ ] Feedback al Usuario:** El sistema proporciona feedback claro al guardar los cambios o si ocurre un error.

---

### ✅ 3. Integración en la Landing Page (Frontend)

-   **[ ] Consulta de Datos:** El componente correspondiente en la landing page (`HeroSection`, `ServicesSection`, etc.) obtiene los datos actualizados desde Supabase.
-   **[ ] Renderizado Dinámico:** El contenido se muestra dinámicamente en la UI, reemplazando cualquier dato estático.
-   **[ ] Mapeo de Datos Correcto:** Los datos de la base de datos se mapean correctamente a los `props` de los componentes de la UI.
-   **[ ] Manejo de Datos Relacionados:** Si aplica, los datos de tablas relacionadas se obtienen y se muestran correctamente (ej. listar las tecnologías de un caso de éxito).
-   **[ ] Manejo de Estado Vacío:** El componente se muestra de forma elegante si no hay contenido en la base de datos (ej. "Aún no hay servicios disponibles").
-   **[ ] Diseño Responsivo:** El contenido dinámico se adapta y se ve bien en todos los tamaños de pantalla (móvil, tablet, escritorio).

---

### ✅ 4. Calidad y Mantenimiento General

-   **[ ] Reusabilidad del Código:** Las acciones (`create`, `update`, etc.) y los componentes de UI (`Button`, `Card`, etc.) se han reutilizado eficazmente.
-   **[ ] Rendimiento:** Las consultas a Supabase son eficientes. Se seleccionan solo las columnas necesarias (`select('id, title')`) cuando no se requiere toda la información.
-   **[ ] Experiencia de Usuario (CMS):** La interfaz de administración es clara, intuitiva y fácil de usar. Incluye estados de carga (`loading`, `saving`) para evitar clics duplicados.
-   **[ ] Manejo de Errores:** La aplicación (tanto el CMS como la landing) maneja los errores de la API de forma controlada, evitando que la aplicación se rompa y mostrando mensajes útiles si es posible.
-   **[ ] Analítica (Si aplica):** Si la sección debe ser rastreada, se ha implementado la lógica para registrar la visita en la tabla `page_visits`.