'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name is required')
    .regex(/^[A-Z][a-z]+$/, 'Start with uppercase and use letters only'),
  lastName: z
    .string()
    .min(2, 'Last name is required')
    .regex(/^[A-Z][a-z]+$/, 'Start with uppercase and use letters only'),
  email: z
    .string()
    .email('Invalid email')
    .regex(/^[a-z0-9]+@gmail\.com$/, 'Use lowercase letters/numbers only and end with @gmail.com'),
  phone: z
    .string()
    .regex(/^09\d{9}$/, 'Phone must be 11 digits and start with 09'),
  coordinates: z
    .string()
    .regex(/^(-?\d{1,3}(\.\d+)?),\s*(-?\d{1,3}(\.\d+)?)$/, 'Use format like 13.3603,123.7104'),
})

type FormData = z.infer<typeof formSchema>

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) })

  const coordinates = watch('coordinates')
  const [embedLink, setEmbedLink] = useState('')

  useEffect(() => {
    const isValidCoords = /^-?\d{1,3}(\.\d+)?,\s*-?\d{1,3}(\.\d+)?$/.test(coordinates || '')
    if (isValidCoords) {
      setEmbedLink(`https://www.google.com/maps?q=${coordinates}&output=embed`)
    } else {
      setEmbedLink('')
    }
  }, [coordinates])

  const onSubmit = (data: FormData) => {
    alert('Registration successful!')
    console.log('Registered:', data)
    reset()
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-950 px-4 py-10 text-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 tracking-tight">
          Register
        </h1>

        <Card className="bg-white border-2 border-indigo-700 shadow-2xl rounded-3xl p-6 md:p-10 transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Create an Account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {[
                { label: 'First Name', name: 'firstName', placeholder: 'e.g. Juan' },
                { label: 'Last Name', name: 'lastName', placeholder: 'e.g. DelaCruz' },
                { label: 'Email', name: 'email', placeholder: 'e.g. juan01@gmail.com' },
                { label: 'Phone Number', name: 'phone', placeholder: 'e.g. 09123456789' },
                { label: 'Coordinates', name: 'coordinates', placeholder: 'e.g. 13.3603,123.7104' },
              ].map(({ label, name, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    {...register(name as keyof FormData)}
                    placeholder={placeholder}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                  {errors[name as keyof FormData] && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors[name as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}

              {embedLink && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Google Map Preview</h2>
                  <iframe
                    src={embedLink}
                    width="100%"
                    height="300"
                    loading="lazy"
                    allowFullScreen
                    className="rounded-xl border border-gray-300"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 mt-6"
              >
                Register
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
