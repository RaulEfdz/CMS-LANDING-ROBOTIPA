// app/db/charts.ts
// Definición de tipos para los datos
export interface DataPoint {
  name: string;
  usuarios: number;
  visitas: number;
  rebote: number;
  conversion: number;
}

export interface ChartConfig {
  title: string;
  dataKey: keyof DataPoint; // Asegura que dataKey sea una clave válida de DataPoint
  color: string;
}

// Función para generar datos aleatorios dentro de un rango
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Variables de configuración
const useRandomData = true; // Cambia a false para usar datos reales
const startFromZero = true; // Cambia a false para no iniciar desde 0

// Datos reales (puedes modificarlos según tus necesidades)
const realData: DataPoint[] = [
  { name: 'Día 1', usuarios: 1500, visitas: 1200, rebote: 20, conversion: 5 },
  { name: 'Día 2', usuarios: 2000, visitas: 1500, rebote: 25, conversion: 7 },
  { name: 'Día 3', usuarios: 1800, visitas: 1300, rebote: 22, conversion: 6 },
  // Agrega más datos reales aquí...
];

// Generar datos aleatorios para 30 días
const generateRandomData = (): DataPoint[] => {
  return Array.from({ length: 30 }, (_, i) => ({
      name: `Día ${i + 1}`,
      usuarios: startFromZero && i === 0 ? 0 : getRandomInt(1000, 5000),
      visitas: startFromZero && i === 0 ? 0 : getRandomInt(500, 3000),
      rebote: startFromZero && i === 0 ? 0 : getRandomInt(10, 50),
      conversion: startFromZero && i === 0 ? 0 : getRandomInt(5, 20)
  }));
};

// Seleccionar datos según la configuración
export const data: DataPoint[] = useRandomData ? generateRandomData() : realData;

// Configuración de las gráficas
export const chartConfigs: ChartConfig[] = [
  { title: 'Usuarios', dataKey: 'usuarios', color: '#8884d8' },
  { title: 'Visitas', dataKey: 'visitas', color: '#82ca9c' },
  { title: 'Tasa de Rebote', dataKey: 'rebote', color: '#ffc658' },
  { title: 'Tasa de Conversión', dataKey: 'conversion', color: '#f50057' }
];