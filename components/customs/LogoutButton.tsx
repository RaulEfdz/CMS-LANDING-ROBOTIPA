"use client"

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { useState } from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

const  LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {
  const supabase = createClient();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);


  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error during logout:", error.message);
        // Aquí podrías mostrar un mensaje de error al usuario si lo deseas.
      } else {
        // Redirigir al usuario a la página de inicio o de login tras el logout exitoso.
        router.push('/auth');
        router.refresh(); //  Recargar la ruta para reflejar los cambios de autenticación en el servidor.
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? "Cerrando sesión..." : children || "Cerrar Sesión"}
    </Button>
  );
};

export default LogoutButton;