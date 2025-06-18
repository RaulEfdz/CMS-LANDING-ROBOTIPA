"use client";

import { BasicCard } from "@/components/customs/BasicCard";
import { useRouter } from "next/navigation";
import { configNav } from "./db/routesNav";

export default function Home() {
  const router = useRouter();

  const handleCardClick = () => {
    const { navMain } = configNav
    router.push(navMain[0].route)
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <BasicCard
        title="Mi Tarjeta Personalizada"
        description="Este es un texto descriptivo diferente para mi tarjeta."
        buttonText="Ir al dasboard"
        onButtonClick={handleCardClick}
      />
    </div>
  );
}

       