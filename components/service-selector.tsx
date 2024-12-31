"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { HelpCircle, ChevronDown } from 'lucide-react'

interface Service {
  id: string
  name: string
  info?: string
}

interface ServiceGroup {
  title: string
  services: Service[]
}

const serviceGroups: ServiceGroup[] = [
  {
    title: "MOT & Services",
    services: [
      { id: "mot", name: "MOT" },
      { id: "pre-mot", name: "Pre MOT" },
      { id: "interim-service", name: "Interim Service", info: "Recommended every 6,000 miles" },
      { id: "full-service", name: "Full Service", info: "Recommended every 12,000 miles" },
      { id: "major-service", name: "Major Service", info: "Recommended every 24,000 miles" },
      { id: "oil-filter", name: "Oil & Filter Change" },
    ],
  },
  {
    title: "Addons",
    services: [
      { id: "collect-deliver", name: "Collect & Deliver" },
      { id: "customer-dropoff", name: "Customer Drop-off" },
      { id: "loan-car", name: "Loan Car" },
    ],
  },
  {
    title: "Additional Work",
    services: [
      { id: "safety-check", name: "Safety Check" },
      { id: "air-con", name: "Air Con Re-gas" },
      { id: "brake-fluid", name: "Brake Fluid" },
      { id: "coolant", name: "Coolant Change" },
      { id: "diagnostic", name: "Diagnostic Check" },
      { id: "wheel-alignment", name: "Wheel Alignment" },
      { id: "dpf-cleaning", name: "DPF Cleaning" }
    ],
  },
  {
    title: "Repairs",
    services: [
      { id: "general-repair", name: "General Repair" },
      { id: "front-brakes", name: "Front Brakes" },
      { id: "rear-brakes", name: "Rear Brakes" },
      { id: "clutch", name: "Clutch" },
      { id: "tyres", name: "Tyres" },
    ],
  },
]

interface ServiceSelectorProps {
  onServicesChange: (services: string[]) => void
}

export function ServiceSelector({ onServicesChange }: ServiceSelectorProps) {
  const [selectedServices, setSelectedServices] = React.useState<string[]>([])
  const [openSections, setOpenSections] = React.useState<string[]>(["MOT & Services"]) // First section open by default
  const [groupSelections, setGroupSelections] = React.useState<Record<string, number>>({})

  const handleServiceChange = (serviceId: string, checked: boolean, groupTitle: string) => {
    const newServices = checked
      ? [...selectedServices, serviceId]
      : selectedServices.filter((id) => id !== serviceId)
    
    setSelectedServices(newServices)
    onServicesChange(newServices)

    setGroupSelections(prev => ({
      ...prev,
      [groupTitle]: (prev[groupTitle] || 0) + (checked ? 1 : -1)
    }))
  }

  const toggleSection = (title: string) => {
    setOpenSections(prev => 
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  return (
    <div className="space-y-2">
      {serviceGroups.map((group) => (
        <Collapsible
          key={group.title}
          open={openSections.includes(group.title)}
          onOpenChange={() => toggleSection(group.title)}
          className="border rounded-lg"
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between bg-secondary px-4 py-2 rounded-t-lg hover:bg-secondary/80 transition-colors">
            <div className="flex items-center">
              <h3 className="font-semibold text-lg">{group.title}</h3>
              {groupSelections[group.title] > 0 && (
                <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  {groupSelections[group.title]}
                </span>
              )}
            </div>
            <ChevronDown 
              className={`h-5 w-5 transition-transform duration-200 ${
                openSections.includes(group.title) ? 'transform rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {group.services.map((service) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={(checked) => 
                      handleServiceChange(service.id, checked as boolean, group.title)
                    }
                  />
                  <label
                    htmlFor={service.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {service.name}
                  </label>
                  {service.info && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger type="button">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{service.info}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}

