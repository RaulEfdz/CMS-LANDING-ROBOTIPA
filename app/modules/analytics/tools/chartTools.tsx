import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Download, RefreshCcw, BrainCircuit } from 'lucide-react';
import MenuBarTools from '@/app/modules/analytics/components/MenuBarTools';

const ChartTools = () => {
  // Estado para manejar la opción activa
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Definir las opciones del menú
  const menuItems = [
    {
      icon: <RefreshCcw className="w-4 h-4" />,
      label: 'Actualizar',
      action: () => {
        console.log('Inicio clickeado');
        setActiveItem('Inicio');
      },
      isActive: activeItem === 'Inicio',
    },
    {
      icon: <ZoomIn className="w-4 h-4" />,
      label: 'Zoom In',
      action: () => {
        console.log('Zoom In clickeado');
        setActiveItem('Zoom In');
      },
      isActive: activeItem === 'Zoom In',
    },
    {
      icon: <ZoomOut className="w-4 h-4" />,
      label: 'Zoom Out',
      action: () => {
        console.log('Zoom Out clickeado');
        setActiveItem('Zoom Out');
      },
      isActive: activeItem === 'Zoom Out',
    },
    {
      icon: <Download className="w-4 h-4" />,
      label: 'Exportar',
      action: () => {
        console.log('Exportar clickeado');
        setActiveItem('Exportar');
      },
      isActive: activeItem === 'Exportar',
    },
    {
      icon: <BrainCircuit className="w-4 h-4" />,
      label: 'Regresion Lineal',
      action: () => {
        console.log('Regresion Lineal');
        setActiveItem("Regresion Lineal");
      },
      isActive: activeItem === 'Regresion Lineal',
    },
  ];

  return (
    <div className="py-8 flex">
      <MenuBarTools items={menuItems} />
    </div>
  );
};

export default ChartTools;