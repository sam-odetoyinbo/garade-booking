"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Loader2 } from 'lucide-react'
import { format, isPast } from 'date-fns'
import { ServiceSelector } from "./service-selector"

const formSchema = z.object({
  registration: z.string().min(2).max(10),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  postcode: z.string().min(5).max(8),
})

export function SearchForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [vehicleInfo, setVehicleInfo] = useState<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registration: "",
      services: [],
      postcode: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // Validate postcode
      const postcodeResponse = await fetch(`/api/validate-postcode?postcode=${values.postcode}`)
      const postcodeData = await postcodeResponse.json()
      
      if (!postcodeData.result) {
        form.setError("postcode", { message: "Invalid postcode" })
        return
      }

      // Lookup vehicle
      const vehicleResponse = await fetch(`/api/vehicle-lookup?registration=${values.registration}`)
      const vehicleData = await vehicleResponse.json()

      if (vehicleData.error) {
        form.setError("registration", { message: vehicleData.error })
        return
      }

      setVehicleInfo(vehicleData)
      
      console.log("Form submitted:", values)
      console.log("Vehicle info:", vehicleData)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="registration"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Vehicle Registration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Postcode" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ServiceSelector 
                  onServicesChange={(services) => form.setValue('services', services)} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Find now"
          )}
        </Button>
      </form>
      {vehicleInfo && (
        <div className="mt-4 p-4 bg-secondary rounded-md">
          <h2 className="text-center font-semibold">Vehicle Information</h2>
          <p>Registration: {vehicleInfo.registrationNumber}</p>
          <p>Make: {vehicleInfo.make}</p>
          <p>Color: {vehicleInfo.colour}</p>
          <p>Fuel Type: {vehicleInfo.fuelType}</p>
          <p>Year: {vehicleInfo.yearOfManufacture}</p>
          <p className={`font-semibold ${isPast(new Date(vehicleInfo.motExpiryDate)) ? 'text-red-500' : 'text-green-500'}`}>
            MOT Status: {vehicleInfo.motExpiryDate ? format(new Date(vehicleInfo.motExpiryDate), 'dd/MM/yyyy') : 'N/A'}
            {vehicleInfo.motExpiryDate && (
              <span className="ml-2">
                ({isPast(new Date(vehicleInfo.motExpiryDate)) ? 'Expired' : 'Valid'})
              </span>
            )}
          </p>
          <Button className="w-full mt-4" onClick={() => console.log("Compare services for", vehicleInfo.registrationNumber)}>
            Compare now
          </Button>
        </div>
      )}
    </Form>
  )
}

