import React, { useState } from 'react';
import { ZoomIn, Download, RefreshCcw } from 'lucide-react';
import MenuBarTools from '@/app/modules/analytics/components/MenuBarTools';

const ChartsTools = () => {
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
      label: 'Limitar',
      action: () => {
        console.log('Zoom In clickeado');
        setActiveItem('Zoom In');
      },
      isActive: activeItem === 'Zoom In',
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
  ];

  return (
    <div className="p-8 flex">
      <MenuBarTools items={menuItems} />
    </div>
  );
};

export default ChartsTools;