'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Role = 'admin' | 'courier' | 'user' | null

const Navbar = () => {
  const [role, setRole] = useState<Role>(null)

  useEffect(() => {
    //დროებით localStorage-ით
    const userRole = localStorage.getItem('role') as Role
    setRole(userRole)
  }, [])

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        📦 შავი ოქრო
      </Link>

      <div className="flex gap-4 text-sm">
        {role === 'admin' && (
          <>
            <Link href="/admin/dashboard" className="hover:underline">დეშბორდი</Link>
            <Link href="/admin/users" className="hover:underline">მომხმარებლები</Link>
          </>
        )}

        {role === 'courier' && (
          <>
            <Link href="/courier/dashboard" className="hover:underline">ჩემი ტასკები</Link>
            <Link href="/courier/profile" className="hover:underline">პროფილი</Link>
          </>
        )}

        {role === 'user' && (
          <>
            <Link href="/user/dashboard" className="hover:underline">მთავარი</Link>
            <Link href="/user/profile" className="hover:underline">პროფილი</Link>
          </>
        )}

        {!role && (
          <>
            <Link href="/login" className="hover:underline">შესვლა</Link>
            <Link href="/register" className="hover:underline">რეგისტრაცია</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
