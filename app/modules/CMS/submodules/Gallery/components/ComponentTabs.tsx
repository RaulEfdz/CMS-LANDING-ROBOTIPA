import React from "react";
import { GalleryImage } from "../types";

interface Props {
  values: Partial<GalleryImage>;
  onChange: (field: keyof GalleryImage, value: unknown) => void;
}

export function ComponentTabs({ values, onChange }: Props) {
  const [tab, setTab] = React.useState<"general" | "media">("general");

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          className={tab === "general" ? "tab-active" : "tab"}
          onClick={() => setTab("general")}
        >
          General
        </button>
        <button
          className={tab === "media" ? "tab-active" : "tab"}
          onClick={() => setTab("media")}
        >
          Media
        </button>
      </div>
      {tab === "general" && (
        <div>
          <label htmlFor="title">Título</label>
          <input
            id="title"
            value={values.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            className="input"
            placeholder="Título de la imagen"
          />
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={values.description || ""}
            onChange={(e) => onChange("description", e.target.value)}
            className="input"
            placeholder="Descripción"
          />
        </div>
      )}
      {tab === "media" && (
        <div>
          <label htmlFor="image_url">URL Imagen</label>
          <input
            id="image_url"
            value={values.image_url || ""}
            onChange={(e) => onChange("image_url", e.target.value)}
            className="input"
            placeholder="https://..."
          />
        </div>
      )}
    </div>
  );
}
