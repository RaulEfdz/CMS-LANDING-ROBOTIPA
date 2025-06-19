"use client";

import dynamic from "next/dynamic";

const GalleryContainer = dynamic(() => import("./index"), { ssr: false });

export default function ClientWrapper() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Galería de Imágenes</h1>
      <GalleryContainer />
    </div>
  );
}
