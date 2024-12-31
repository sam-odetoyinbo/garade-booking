import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const postcode = searchParams.get('postcode')

  if (!postcode) {
    return NextResponse.json({ error: 'Postcode is required' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}`)
    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.error || 'Invalid postcode' }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error validating postcode:', error)
    return NextResponse.json({ error: 'An error occurred while validating the postcode' }, { status: 500 })
  }
}

