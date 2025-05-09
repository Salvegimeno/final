'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

type Geo = {
  lat: string
  lng: string
}

type Address = {
  street: string
  city: string
  geo: Geo
}

type User = {
  id: number
  name: string
  username: string
  email: string
  phone: string
  address: Address
}

export default function UserProfilePage() {
  const params = useParams()
  const id = params?.id as string
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data: User) => setUser(data))
  }, [id])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-indigo-900 to-blue-950 text-white">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    )
  }

  const lat = user.address.geo.lat
  const lng = user.address.geo.lng
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-indigo-900 to-blue-950 px-4 py-12 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-gray-100 tracking-tight">
        {user.name}
      </h1>

      <div className="w-full max-w-3xl bg-white text-gray-800 rounded-3xl shadow-2xl p-8">
        <div className="space-y-3 text-base md:text-lg text-gray-700">
          <p><span className="font-semibold text-gray-900">Username:</span> {user.username}</p>
          <p><span className="font-semibold text-gray-900">Email:</span> {user.email}</p>
          <p><span className="font-semibold text-gray-900">Phone:</span> {user.phone}</p>
          <p><span className="font-semibold text-gray-900">Address:</span> {user.address.street}, {user.address.city}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Location on Google Map</h2>
          <iframe
            src={mapSrc}
            width="100%"
            height="300"
            className="rounded-md border"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}

