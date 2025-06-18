"use client"
import { X, Plus, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { requirements } from "../data/requirements"

interface RequirementsSelectorProps {
  eventType: string
  selectedRequirements: string[]
  onRequirementsChange: (requirements: string[]) => void
}

export function RequirementsSelector({
  eventType,
  selectedRequirements,
  onRequirementsChange
}: RequirementsSelectorProps) {
  const [newRequirement, setNewRequirement] = useState("")
  const predefinedRequirements = requirements[eventType] || []

  const handleAddRequirement = () => {
    if (newRequirement.trim() && !selectedRequirements.includes(newRequirement)) {
      onRequirementsChange([...selectedRequirements, newRequirement.trim()])
      setNewRequirement("")
    }
  }

  const handleRemoveRequirement = (requirement: string) => {
    onRequirementsChange(selectedRequirements.filter(r => r !== requirement))
  }

  const handleResetRequirements = () => {
    onRequirementsChange([])
    setNewRequirement("")
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">Requisitos del Evento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Predefined Requirements */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">Requisitos Sugeridos</h3>
          <div className="flex flex-wrap gap-2">
            {predefinedRequirements.map((req) => (
              <Button
                key={req}
                variant={selectedRequirements.includes(req) ? "default" : "outline"}
                size="sm"
                className="h-8"
                onClick={() => {
                  if (!selectedRequirements.includes(req)) {
                    onRequirementsChange([...selectedRequirements, req])
                  }
                }}
              >
                {req}
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Requirements */}
        {selectedRequirements.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Requisitos Seleccionados</h3>
            <div className="flex flex-wrap gap-2">
              {selectedRequirements.map((req) => (
                <Badge
                  key={req}
                  variant="secondary"
                  className="px-3 py-1 flex items-center gap-1"
                >
                  {req}
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(req)}
                    className="ml-1 hover:text-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Add New Requirement */}
        <div className="flex gap-2">
          <Input
            type="text"
            value={newRequirement}
            onChange={(e) => setNewRequirement(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddRequirement()}
            placeholder="Agregar requisito personalizado"
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddRequirement}
            disabled={!newRequirement.trim()}
          >
            <Plus size={16} className="mr-1" />
            Agregar
          </Button>
        </div>

        {/* Reset Button */}
        {selectedRequirements.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResetRequirements}
            className="w-full text-gray-500 hover:text-gray-700"
          >
            <RefreshCw size={16} className="mr-2" />
            Reiniciar todos los requisitos
          </Button>
        )}
      </CardContent>
    </Card>
  )
}