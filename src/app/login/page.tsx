'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

type JsonUser = {
  id: number
  name: string
  username: string
  email: string
}

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      const users: JsonUser[] = await res.json()

      if (email === 'admin@admin.com' && password === 'admin123') {
        localStorage.setItem('role', 'admin')
        router.push('/posts')
        return
      }

      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (user && user.username === password) {
        localStorage.setItem('role', 'user')
        localStorage.setItem('userId', user.id.toString())
        localStorage.setItem('userName', user.name)
        router.push('/posts')
      } else {
        setError('Invalid credentials. Email must match a user and password must be the corresponding username.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-950 text-gray-900 px-4 py-10">
      <div className="w-full max-w-5xl px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-100 tracking-tight">
          Login
        </h1>

        <Card className="bg-white border-2 border-indigo-700 shadow-2xl rounded-3xl p-6 md:p-10 transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-semibold text-center text-gray-800 mb-6">
              Access Your Account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="username"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
              >
                Login
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage
