import React from 'react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger
} from '@radix-ui/react-menubar';

// Definir el tipo de una opción del menú
type MenuItem = {
  icon: React.ReactNode; // Ícono de la opción
  label: string; // Texto de la opción
  action: () => void; // Función que se ejecuta al hacer clic
  isActive: boolean; // Estado activo/inactivo
};

// Props del componente MenuBar
interface MenuBarProps {
  items: MenuItem[];
}

const MenuBarTools = ({ items }: MenuBarProps) => {
  return (
    <Menubar className="rounded-none border p-2 space-x-2 flex w-full">
      {items.map((item, index) => (
        <MenubarMenu key={index}>
          <MenubarTrigger
            onClick={item.action}
            className={`flex items-center space-x-2 p-2 rounded-none ${
              item.isActive ? 'bg-blue-100 text-black' : 'hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </MenubarTrigger>
        </MenubarMenu>
      ))}
    </Menubar>
  );
};

export default MenuBarTools;