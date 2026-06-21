'use client'

import { useCallback, useEffect, useState } from 'react'
import { CreateLinkForm } from '@/components/dashboard/create-link-form'
import { LinksTable } from '@/components/dashboard/links-table'
import { getUserLinks } from '@/lib/demo-store'
import { Link2, BarChart3, MousePointerClick } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

interface LinkItem {
  id: string
  slug: string
  original_url: string
  clicks: number
  created_at: string
}

export default function DashboardPage() {
  const [links, setLinks] = useState<LinkItem[]>([])

  const fetchLinks = useCallback(() => {
    setLinks(getUserLinks())
  }, [])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0)

  function handleDelete(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your short links and track performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50">
              <Link2 className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(links.length)}</p>
              <p className="text-xs text-gray-500">Total Links</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50">
              <MousePointerClick className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(totalClicks)}</p>
              <p className="text-xs text-gray-500">Total Clicks</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {links.length > 0 ? (totalClicks / links.length).toFixed(1) : '0'}
              </p>
              <p className="text-xs text-gray-500">Avg. Clicks/Link</p>
            </div>
          </div>
        </div>
      </div>

      <CreateLinkForm onCreated={fetchLinks} />
      <LinksTable links={links} onDelete={handleDelete} />
    </div>
  )
}
