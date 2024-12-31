import { NextResponse } from 'next/server'
import dotenv from 'dotenv'
dotenv.config()

const DVLA_API_KEY = process.env.DVLA_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const registration = searchParams.get('registration')

  if (!registration) {
    return NextResponse.json({ error: 'Registration is required' }, { status: 400 })
  }

  try {
    const response = await fetch('https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles', {
      method: 'POST',
      headers: {
        'x-api-key': 'ZsixcBedE75xD0nmIckkF2cQfjirc6QM1QahUbsl',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ registrationNumber: registration })
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Failed to fetch vehicle data' }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching vehicle data:', error)
    return NextResponse.json({ error: 'An error occurred while fetching vehicle data' }, { status: 500 })
  }
}

