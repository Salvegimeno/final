'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type User = {
  id: number
  name: string
  username: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data))
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-indigo-900 to-blue-950 px-4 py-12 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-100 tracking-tight">
        Users
      </h1>

      <div className="w-full max-w-5xl bg-white text-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <li key={user.id}>
              <Link
                href={`/users/${user.id}`}
                className="block bg-gray-50 p-5 rounded-2xl shadow-md transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-1 hover:bg-blue-50"
              >
                <div className="text-lg sm:text-xl font-semibold text-blue-800">
                  {user.name}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  @{user.username}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
