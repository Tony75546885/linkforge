'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getDemoUser } from '@/lib/demo-store'
import { DashboardNav } from '@/components/dashboard/nav'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const user = getDemoUser()
    if (!user) {
      router.push('/login')
      return
    }
    setEmail(user.email)
    setReady(true)
  }, [router])

  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav userEmail={email ?? ''} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
