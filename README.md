# Configuración de Proyecto Supabase con Next.js y Gestión de Roles

Esta guía te mostrará cómo configurar un proyecto en Supabase, crear una tabla `user_profiles` con una columna de `role`, y configurar un trigger para gestionar roles al registrar usuarios. También incluye los pasos para clonar un proyecto Next.js y configurarlo para usar Supabase.

## Paso 1: Crear un Proyecto en Supabase

1.  **Ir al sitio web de Supabase:** Abre tu navegador y visita [https://supabase.com/](https://supabase.com/).

2.  **Registrarse o Iniciar Sesión:** Si tienes cuenta, inicia sesión. Si no, regístrate para obtener una cuenta gratuita.

3.  **Crear un Nuevo Proyecto:**
    *   En el panel de control de Supabase, busca y haz clic en "**New Project**".
    *   **Nombre del Proyecto:** Elige un nombre para tu proyecto.
    *   **Base de Datos Contraseña:** Crea y recuerda una contraseña para la base de datos.
    *   **Región:** Selecciona la región del servidor más cercana.
    *   **Plan de Precios:** El plan "**Free**" es suficiente para empezar.
    *   Haz clic en "**Create New Project**".

    [Image of Supabase UI Create New Project Form]

4.  **Esperar el Despliegue:** Espera unos minutos a que Supabase configure tu proyecto. Serás redirigido al panel de control cuando termine.

## Paso 2: Crear la Tabla `user_profiles` con la Columna `role`

1.  **Ir al Editor de Tablas:** En el panel de control, ve a "**Database**" y luego "**Table editor**".

2.  **Crear Nueva Tabla `user_profiles`:** Haz clic en "**+ New Table**".

3.  **Definir la Tabla `user_profiles` con `role`:** Utiliza este código SQL para crear la tabla, incluyendo la columna `role`:

    ```sql
    CREATE TABLE public.user_profiles (
      user_id UUID PRIMARY KEY REFERENCES auth.users(id) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
      email_confirmed_at TIMESTAMP WITH TIME ZONE NULL,
      first_name TEXT NULL,
      last_name TEXT NULL,
      full_name TEXT NOT NULL,
      profile_picture_url TEXT NULL,
      date_of_birth DATE NULL,
      phone_number TEXT NULL,
      address TEXT NULL,
      city TEXT NULL,
      country TEXT NULL,
      postal_code TEXT NULL,
      timezone TEXT NULL,
      locale TEXT NULL,
      preferred_language TEXT NULL,
      theme_preference TEXT NULL,
      notifications_enabled BOOLEAN NULL DEFAULT TRUE,
      marketing_emails_enabled BOOLEAN NULL DEFAULT TRUE,
      website_url TEXT NULL,
      twitter_username TEXT NULL,
      instagram_username TEXT NULL,
      linkedin_url TEXT NULL,
      github_username TEXT NULL,
      role TEXT NULL DEFAULT 'user',
      is_active BOOLEAN NULL DEFAULT TRUE,
      last_login_at TIMESTAMP WITH TIME ZONE NULL,
      bio TEXT NULL,
      interests TEXT[] NULL,
      custom_field_1 TEXT NULL,
      custom_field_2 INTEGER NULL,
      custom_field_3 BOOLEAN NULL,
      created_by_user_id UUID NULL REFERENCES auth.users(id),
      updated_by_user_id UUID NULL REFERENCES auth.users(id)
    );
    ```

    **Importante:** La línea `role TEXT NULL DEFAULT 'user'`, añade la columna `role` con tipo TEXT y valor por defecto `'user'`.

4.  **Guardar la Tabla:** Copia y pega el código SQL en el editor de tablas de Supabase y guarda.

## Paso 3: Crear un Trigger `create_user_profile_on_signup` para Gestionar Roles

1.  **Ir a Funciones:** En el panel de control, ve a "**Database**" y luego "**Functions**".

2.  **Crear Nueva Función:** Haz clic en "**+ New Function**".

3.  **Configurar Nueva Función para el Trigger:** En la interfaz de creación de funciones, configura los campos de la siguiente manera:
    *   **Name:** `create_user_profile_on_signup`
    *   **Language:** `PL/pgSQL`
    *   **Function type:** Selecciona `Trigger`.
    *   **Code:** Copia y pega el siguiente código SQL:

    ```sql
    CREATE OR REPLACE FUNCTION public.create_user_profile_on_signup()
    RETURNS TRIGGER AS $$
    DECLARE
      initial_username TEXT;
      initial_full_name TEXT;
    BEGIN
      -- Extraer username y full_name desde user_metadata
      initial_username := NEW.raw_user_meta_data->>'username';
      initial_full_name := NEW.raw_user_meta_data->>'full_name';

      INSERT INTO public.user_profiles (user_id, full_name, email_confirmed_at, username, role)
      VALUES (NEW.id, initial_full_name, NULL, initial_username, 'user');

      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    ```

    **Importante:** Se añadió `role` a la lista de columnas en `INSERT` y se asignó el valor `'user'` por defecto.

4.  **Guardar la Función:** Haz clic en "**run**" para guardar la función del trigger.

## Paso 3.1: Crear Políticas de Seguridad Row Level Security (RLS) para `user_profiles`

1.  **Activar RLS para `user_profiles`:**
    *   Si no lo has hecho ya, en el editor de tablas de `user_profiles`, busca la advertencia "**Row Level Security is disabled**".
    *   Haz clic en "**Enable RLS**" para activar Row Level Security en la tabla.

2.  **Ir a la pestaña "Policies":** Una vez activado RLS, ve a la pestaña "**Policies**" dentro de la configuración de la tabla `user_profiles`.

3.  **Crear la política para permitir a los usuarios ver su propio perfil:**
    *   Haz clic en "**Create Policy**".
    *   Selecciona "**From scratch**".
    *   **Name:**  `Allow users to view own profile`
    *   **Action:** Selecciona `SELECT`.
    *   **Policy definition:** En "Using expression", introduce:
        ```sql
        user_id = auth.uid()
        ```
    *   **Roles to apply policy to:**  Selecciona `Authenticated`.
    *   Haz clic en "**Save policy**".

    [Image of Supabase UI Creating SELECT Policy for user_profiles]

4.  **Crear la política para permitir a los usuarios actualizar su propio perfil:**
    *   Haz clic en "**Create Policy**".
    *   Selecciona "**From scratch**".
    *   **Name:**  `Allow users to update own profile`
    *   **Action:** Selecciona `UPDATE`.
    *   **Policy definition:** En "Using expression", introduce:
        ```sql
        user_id = auth.uid()
        ```
    *   **Policy definition:** Deja el campo "With check expression" vacío.
    *   **Roles to apply policy to:**  Selecciona `Authenticated`.
    *   Haz clic en "**Save policy**".

    [Image of Supabase UI Creating UPDATE Policy for user_profiles]

    **Importante:** Estas políticas aseguran que los usuarios autenticados solo pueden ver y modificar *su propia* información en la tabla `user_profiles`.

## Paso 3.2: Crear la Función `set_user_role` para la Gestión de Roles por Administradores

1.  **Ir al SQL Editor:** En el panel de control de Supabase, ve a "**Database**" y luego "**SQL Editor**".

    [Image of Supabase Dashboard with Database and SQL Editor highlighted]

2.  **Crear una Nueva Consulta:** Haz clic en "**+ New query**".

    [Image of Supabase SQL Editor with New query button highlighted]

3.  **Copiar y Pegar el Código SQL de la Función:** Copia el siguiente código SQL y pégalo en el editor de consultas:

    ```sql
    CREATE OR REPLACE FUNCTION public.set_user_role(user_id_input UUID, new_role TEXT)
    RETURNS VOID AS $$
    BEGIN
      -- Verificar si el usuario que llama a esta función es un administrador (ejemplo de seguridad).
      -- NOTA IMPORTANTE: Este es un ejemplo básico de seguridad. En un sistema real, la verificación de roles debe ser más robusta.
      IF NOT check_is_admin(auth.uid()) THEN -- Asume que tienes una función 'check_is_admin' o lógica similar
        RAISE EXCEPTION 'Insufficient privileges to set user roles.';
      END IF;

      -- Validar que el nuevo rol sea uno permitido (opcional, pero recomendado para evitar roles inválidos).
      IF new_role NOT IN ('user', 'admin', 'editor') THEN -- Lista de roles permitidos
        RAISE EXCEPTION 'Invalid role value: %', new_role;
      END IF;

      -- Actualizar el rol en la tabla user_profiles.
      UPDATE public.user_profiles
      SET role = new_role
      WHERE user_id = user_id_input;

    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    -- Seguridad de la función: Definir quién puede EJECUTAR esta función.
    GRANT EXECUTE ON FUNCTION public.set_user_role(UUID, TEXT) TO service_role;
    ```

4.  **Ejecutar la Consulta:** Haz clic en "**Run**" para ejecutar el código SQL y crear la función `set_user_role` en tu base de datos.

    [Image of Supabase SQL Editor with Run button highlighted]

5.  **Verificar la Función:** Para confirmar que la función se creó correctamente, ve a "**Database**" y luego "**Functions**". Busca la función `set_user_role` en la lista de funciones.

    [Image of Supabase Database Functions section with set_user_role function listed]

    **Importante:** Esta función permite a un administrador (en este ejemplo, `service_role`) cambiar el rol de otros usuarios en la tabla `user_profiles`.  Recuerda que la verificación de administrador (`check_is_admin(auth.uid())`) es un ejemplo básico y debe ser adaptada a tu lógica de roles y seguridad en una aplicación real.

## Paso 4: Clonar el Repositorio del Proyecto Next.js y Instalar Dependencias

1.  **Abrir la Terminal:** Abre tu terminal en la ubicación donde deseas guardar el proyecto clonado.

2.  **Clonar el Repositorio de GitHub:**  Ejecuta el comando `git clone` seguido de la URL del repositorio de GitHub de tu proyecto Next.js. Reemplaza `URL_DEL_REPOSITORIO_GITHUB` con la URL real del repositorio.

    ```bash
    git clone URL_DEL_REPOSITORIO_GITHUB mi-proyecto-supabase
    ```

    *   `git clone URL_DEL_REPOSITORIO_GITHUB`: Este comando clona el repositorio de GitHub a tu máquina local.
    *   `mi-proyecto-supabase`: Reemplaza `mi-proyecto-supabase` con el nombre que quieras darle a la carpeta local donde se clonará el repositorio. Si quieres usar el nombre por defecto del repositorio, puedes omitir `mi-proyecto-supabase`.

3.  **Navegar al Directorio del Proyecto Clonado:** Entra al directorio que acabas de clonar. Si usaste `mi-proyecto-supabase` en el paso anterior, ejecuta:

    ```bash
    cd mi-proyecto-supabase
    ```

4.  **Instalar las Dependencias del Proyecto:** Dentro del directorio del proyecto clonado, ejecuta el comando para instalar las dependencias necesarias, especificadas en el archivo `package.json` del repositorio.

    ```bash
    npm install
    ```

    O, si usas yarn:

    ```bash
    yarn install
    ```

    *   `npm install` o `yarn install`: Estos comandos leen el archivo `package.json` en el directorio del proyecto y descargan e instalan todas las bibliotecas y dependencias listadas en ese archivo (incluyendo, probablemente, la biblioteca `@supabase/supabase-js` si el repositorio ya está configurado para Supabase).

## Paso 5:  Verificar la Instalación de la Biblioteca Cliente de Supabase (y si no está, Instalarla)

1.  **Verificar `package.json`:**  Abre el archivo `package.json` que se encuentra en la raíz de tu proyecto clonado. Busca en la sección `"dependencies"` si la biblioteca `@supabase/supabase-js` ya está listada.

2.  **Si `@supabase/supabase-js` NO está en dependencies:** Si no encuentras `@supabase/supabase-js` en la lista de dependencias, significa que la biblioteca cliente de Supabase no está instalada en este proyecto. En ese caso, instálala manualmente ejecutando en tu terminal (dentro del directorio del proyecto):

    ```bash
    npm install @supabase/supabase-js
    ```

    O, si usas yarn:

    ```bash
    yarn add @supabase/supabase-js
    ```

3.  **Si `@supabase/supabase-js` YA está en dependencies:** Si la encuentras en `package.json`, significa que ya se instaló al ejecutar `npm install` o `yarn install` en el Paso 4. En este caso, puedes saltarte este paso y pasar directamente al Paso 6.

## Paso 6: Configurar Variables de Entorno de Supabase en Next.js

1.  **Obtener Claves de API de Supabase:**
    *   En el panel de control de tu proyecto Supabase, ve a "**Project Settings**" (icono de engranaje) y luego "**API**".
    *   Copia "**Project URL**" y "**anon public key**".

2.  **Crear Archivo `.env.local`:**  Si no existe, crea un archivo llamado `.env.local` en la raíz de tu proyecto clonado. Asegúrate de que `.env.local` esté en la raíz del proyecto, en el mismo directorio donde se encuentra `package.json`.

3.  **Añadir Variables de Entorno a `.env.local`:**  Dentro del archivo `.env.local`, añade las siguientes líneas, reemplazando `TU_URL_DE_PROYECTO_SUPABASE` y `TU_CLAVE_ANONIMA_PUBLICA_SUPABASE` con los valores que copiaste de Supabase:

    ```
    NEXT_PUBLIC_SUPABASE_URL=TU_URL_DE_PROYECTO_SUPABASE
    NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_CLAVE_ANONIMA_PUBLICA_SUPABASE
    ```

    **Recordatorio Importante:** Las variables deben comenzar con `NEXT_PUBLIC_` para ser accesibles en el frontend de Next.js.