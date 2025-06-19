# Blueprint definitivo para submódulos CMS (Next.js + Supabase + React Query)

Este blueprint es la referencia única y oficial para crear submódulos CRUD en el CMS. Sigue este patrón para garantizar consistencia, robustez y escalabilidad.

## Estructura recomendada

```
app/modules/CMS/submodules/NOMBRE_SUBMODULO/
├── api/
│   └── actions.ts
├── hooks/
│   └── useNOMBRE_SUBMODULO.ts
├── schema.ts
├── types.ts
├── components/
│   ├── ComponentForm.tsx
│   ├── ComponentList.tsx
│   └── ComponentTabs.tsx
├── index.tsx
├── ClientWrapper.tsx
└── page.tsx
```

## Descripción de archivos clave

- **api/actions.ts**: Funciones CRUD para la tabla en Supabase.
- **hooks/useNOMBRE_SUBMODULO.ts**: Hook con React Query para listar, crear, actualizar y borrar.
- **schema.ts**: Esquema Zod para validación y tipos.
- **types.ts**: Tipos TypeScript inferidos del schema.
- **components/**: Formulario, listado y tabs para UI.
- **index.tsx**: Componente contenedor. Incluye manejo de errores:
  - Si no hay conexión a la base de datos, muestra mensaje claro.
  - Si la tabla no existe, muestra mensaje con instrucciones para crearla.
- **ClientWrapper.tsx**: Client Component que importa dinámicamente el contenedor con `dynamic(() => import('./index'), { ssr: false })`.
- **page.tsx**: Server Component que solo renderiza `<ClientWrapper />`.

## Ejemplo de manejo de errores en index.tsx

```tsx
function isSupabaseConnectionError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: string }).message === "string" &&
    ((error as { message: string }).message.includes("Failed to fetch") ||
      (error as { message: string }).message.includes("NetworkError") ||
      (error as { message: string }).message.includes("connection"))
  );
}

function isSupabaseTableMissingError(error: unknown, table: string) {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: string }).message === "string" &&
    (error as { message: string }).message.includes(`relation \"public.${table}\" does not exist`)
  );
}

// ...
if (listQuery.error) {
  if (isSupabaseConnectionError(listQuery.error)) {
    return <div className="text-red-600 font-bold">No hay conexión actual a la base de datos.</div>;
  }
  if (isSupabaseTableMissingError(listQuery.error, 'NOMBRE_TABLA')) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
        <h2 className="text-xl font-bold mb-2">NOMBRE DEL MÓDULO</h2>
        <p className="mb-2 font-semibold">Error: La tabla <code>NOMBRE_TABLA</code> no existe en la base de datos.</p>
        <ul className="list-disc ml-6 text-sm">
          <li>Verifica que la migración de la tabla <code>NOMBRE_TABLA</code> se haya ejecutado correctamente en Supabase.</li>
          <li>Si es un entorno nuevo, crea la tabla desde el panel de Supabase o ejecuta la migración SQL correspondiente.</li>
          <li>Recarga la página después de solucionar el problema.</li>
        </ul>
      </div>
    );
  }
  return <div>Error: {(listQuery.error as Error).message}</div>;
}
```

## Pasos para crear un nuevo submódulo

1. Copia la estructura anterior en `app/modules/CMS/submodules/NOMBRE_SUBMODULO/`.
2. Renombra los archivos y hooks según el nombre del submódulo.
3. Ajusta el schema Zod y los tipos a los campos de tu tabla.
4. Implementa las funciones CRUD en `api/actions.ts` según tu endpoint o tabla Supabase.
5. Personaliza los componentes de formulario, lista y tabs según los campos y secciones necesarias.
6. **Agrega la ruta en `app/modules/CMS/config/routes.ts` para que tu submódulo aparezca en el menú del CMS:**
   ```ts
   {
     title: "Mi Nuevo Módulo",
     route: "/modules/CMS/submodules/MiNuevoModulo",
   },
   ```
7. ¡Listo! Accede a `/modules/CMS/submodules/NOMBRE_SUBMODULO` para usar tu nuevo submódulo.

## Ejemplo de schema y types

```ts
// schema.ts
import { z } from 'zod';

export const myEntitySchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().min(1),
  image_url: z.string().url(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});
```

```ts
// types.ts
import { z } from 'zod';
import { myEntitySchema } from './schema';

export type MyEntity = z.infer<typeof myEntitySchema>;
```

## Ejemplo de actions CRUD

```ts
// api/actions.ts
import { createClient } from '@/utils/supabase/client';
import { z } from 'zod';
import { myEntitySchema } from '../schema';

const supabase = createClient();

export async function listItems() {
  const { data, error } = await supabase.from('my_entity').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getItem(id: string) {
  const { data, error } = await supabase.from('my_entity').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function createItem(input: z.infer<typeof myEntitySchema>) {
  const { data, error } = await supabase.from('my_entity').insert([input]).select().single();
  if (error) throw error;
  return data;
}

export async function updateItem(id: string, input: Partial<z.infer<typeof myEntitySchema>>) {
  const { data, error } = await supabase.from('my_entity').update(input).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteItem(id: string) {
  const { error } = await supabase.from('my_entity').delete().eq('id', id);
  if (error) throw error;
  return true;
}
```

---

Con estos ejemplos y la estructura recomendada, cualquier desarrollador puede crear submódulos CMS robustos, escalables y con UX profesional.

**Ventajas:**
- Estructura replicable y escalable.
- Código DRY y fuertemente tipado.
- Manejo de errores de conexión y tabla inexistente con mensajes claros y UX profesional.
- Compatible con Next.js 13+ y React Query (TanStack Query).
- Experiencia consistente para todos los submódulos del CMS.

## Ejemplo concreto: submódulo ProjectCards

```
app/modules/CMS/submodules/ProjectCards/
├── api/
│   └── actions.ts
├── hooks/
│   └── useProjectCards.ts
├── schema.ts
├── types.ts
├── components/
│   ├── ComponentForm.tsx
│   ├── ComponentList.tsx
│   └── ComponentTabs.tsx
├── index.tsx
└── page.tsx
```

- **api/actions.ts**: Funciones CRUD para la tabla `projects` en Supabase.
- **hooks/useProjectCards.ts**: Hook con react-query para listar, crear, actualizar y borrar cards.
- **schema.ts**: Esquema Zod con los campos: id, title, description, image_url, project_url, technologies, created_at, updated_at.
- **types.ts**: Tipos TypeScript inferidos del schema.
- **components/ComponentForm.tsx**: Formulario con react-hook-form + zod para crear/editar cards.
- **components/ComponentList.tsx**: Listado en tabla/grid con paginación y acciones.
- **components/ComponentTabs.tsx**: Pestañas: General, Media, Detalles, Opciones.
- **index.tsx**: Componente contenedor que usa el hook, renderiza tabs, formulario y lista.
- **page.tsx**: Página Next.js que importa dinámicamente el contenedor.

Puedes copiar y adaptar esta estructura para cualquier nuevo submódulo del CMS.

