'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type MenuItem = { label: string; link: string };

type FooterData = {
  name: string;
  copyright: string;
  menu: MenuItem[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
};
 const footerData = {
    name: "CIIMED",
    copyright: "© 2025 CIIMED. Todos los derechos reservados.",
    menu: [
      { label: "Inicio", link: "/" },
      { label: "Sobre Nosotros", link: "/sobre-nosotros" },
      { label: "Áreas de Investigación", link: "/areas-investigacion" },
      { label: "Formación y Capacitación", link: "/formacion-capacitacion" },
      { label: "Alianzas Estratégicas", link: "/alianzas-estrategicas" },
      { label: "Participa con Nosotros", link: "/participa" },
      { label: "Contacto", link: "/contacto" }
    ],
    contact: {
      email: "contacto@ejemplo.com",
      phone: "+123 456 7890",
      address: "Calle Ejemplo, Ciudad, País"
    }
  };

export default function Page() {
  const [data, setData] = useState<FooterData>(footerData);
  const [saved, setSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof Omit<FooterData, 'menu' | 'contact'>
  ) => {
    setData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof FooterData['contact']) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [key]: e.target.value },
    }));
  };

  const handleMenuChange = (index: number, value: string) => {
    setData((prev) => {
      const newMenu = [...prev.menu];
      newMenu[index].label = value;
      return { ...prev, menu: newMenu };
    });
  };

  const handleSave = () => {
    console.log('Datos guardados:', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Editar Footer</h1>
      {saved && <div className="p-2 mb-4 text-green-700 bg-green-200 rounded">Datos guardados correctamente</div>}

      <Label>Nombre</Label>
      <Input value={data.name} onChange={(e) => handleChange(e, 'name')} />

      <Label>Copyright</Label>
      <Textarea value={data.copyright} onChange={(e) => handleChange(e, 'copyright')} />
      
      <h2 className="text-xl font-semibold mt-4">Menú</h2>
      {data.menu.map((item, index) => (
        <div key={index}>
          <Label>{`Menú ${index + 1}`}</Label>
          <Input value={item.label} onChange={(e) => handleMenuChange(index, e.target.value)} />
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-4">Contacto</h2>
      <Label>Correo Electrónico</Label>
      <Input value={data.contact.email} onChange={(e) => handleContactChange(e, 'email')} />
      
      <Label>Teléfono</Label>
      <Input value={data.contact.phone} onChange={(e) => handleContactChange(e, 'phone')} />
      
      <Label>Dirección</Label>
      <Input value={data.contact.address} onChange={(e) => handleContactChange(e, 'address')} />

      <Button className="mt-4" onClick={handleSave}>Guardar</Button>
    </div>
  );
}
