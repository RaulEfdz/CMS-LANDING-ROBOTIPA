"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DataPoint } from "@/app/db/charts";
import { useRouter } from "next/navigation"; // Importar useRouter
import { Button } from "@/components/ui/button"; // Importar el componente Button

// Definición de props para el componente ChartCard
interface ChartCardProps {
  title: string;
  dataKey: keyof DataPoint; // Asegura que dataKey sea una clave válida de DataPoint
  color: string;
  data: DataPoint[];
  fullViewRoute?: string; // Hacer la prop opcional
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  dataKey,
  color,
  data,
  fullViewRoute,
}) => {
  const router = useRouter(); // Inicializar useRouter

  const handleViewFullChart = () => {
    if (fullViewRoute) {
      router.push(fullViewRoute); // Navegar a la ruta de la vista completa solo si existe
    }
  };

  return (
    <Card className="w-full h-full flex flex-col rounded-none">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold text-gray-700">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <div className="w-full h-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#666" }}
                tickLine={{ stroke: "#666" }}
              />
              <YAxis tick={{ fill: "#666" }} tickLine={{ stroke: "#666" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter>
        {fullViewRoute && ( // Mostrar el botón solo si fullViewRoute está definido
          <Button
            className="rounded-none shadow-xs"
            onClick={handleViewFullChart}
            variant="outline"
          >
            Ver gráfica completa
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ChartCard;
