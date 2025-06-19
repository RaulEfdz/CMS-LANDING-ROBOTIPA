import React from "react";
import { Project } from "../types";

interface Props {
  values: Partial<Project>;
  onChange: (field: keyof Project, value: unknown) => void;
}

export function ComponentTabs({ values, onChange }: Props) {
  const [tab, setTab] = React.useState<
    "general" | "media" | "detalles" | "opciones"
  >("general");

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
        <button
          className={tab === "detalles" ? "tab-active" : "tab"}
          onClick={() => setTab("detalles")}
        >
          Detalles
        </button>
        <button
          className={tab === "opciones" ? "tab-active" : "tab"}
          onClick={() => setTab("opciones")}
        >
          Opciones
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
            placeholder="Título del proyecto"
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
      {tab === "detalles" && (
        <div>
          <label htmlFor="technologies">Tecnologías (separadas por coma)</label>
          <input
            id="technologies"
            value={values.technologies?.join(", ") || ""}
            onChange={(e) =>
              onChange(
                "technologies",
                e.target.value.split(",").map((s: string) => s.trim())
              )
            }
            className="input"
            placeholder="React, Next.js, Tailwind"
          />
        </div>
      )}
      {tab === "opciones" && (
        <div>
          <label htmlFor="project_url">URL Proyecto</label>
          <input
            id="project_url"
            value={values.project_url || ""}
            onChange={(e) => onChange("project_url", e.target.value)}
            className="input"
            placeholder="https://..."
          />
        </div>
      )}
    </div>
  );
}
