"use client";

import dynamic from "next/dynamic";

const ProjectCardsContainer = dynamic(() => import("./index"), { ssr: false });

export default function ClientWrapper() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Project Cards</h1>
      <ProjectCardsContainer />
    </div>
  );
}
