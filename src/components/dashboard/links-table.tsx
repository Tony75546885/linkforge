'use client'

import { useState } from 'react'
import { ExternalLink, Copy, QrCode, Trash2, BarChart3 } from 'lucide-react'
import { formatNumber } from '@/lib/utils'
import { deleteDemoLink } from '@/lib/demo-store'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'
import QRCode from 'qrcode'

interface LinkItem {
  id: string
  slug: string
  original_url: string
  clicks: number
  created_at: string
}

export function LinksTable({
  links,
  onDelete,
}: {
  links: LinkItem[]
  onDelete: (id: string) => void
}) {
  async function copyLink(slug: string) {
    const base = window.location.origin
    await navigator.clipboard.writeText(`${base}/${slug}`)
    toast.success('Link copied!')
  }

  async function downloadQR(slug: string) {
    try {
      const base = window.location.origin
      const dataUrl = await QRCode.toDataURL(`${base}/${slug}`, {
        width: 400,
        margin: 2,
        color: { dark: '#4f46e5' },
      })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `qr-${slug}.png`
      a.click()
      toast.success('QR code downloaded!')
    } catch {
      toast.error('Failed to generate QR code')
    }
  }

  function handleDelete(id: string) {
    deleteDemoLink(id)
    onDelete(id)
    toast.success('Link deleted')
  }

  if (links.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No links yet</h3>
        <p className="text-sm text-gray-500 mt-1">Create your first short link above!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Short Link</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Original URL</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Clicks</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Created</th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {links.map((link) => (
              <tr key={link.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-indigo-600">/{link.slug}</span>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span className="text-sm text-gray-600 truncate block max-w-xs">{link.original_url}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">{formatNumber(link.clicks)}</span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(link.created_at), { addSuffix: true })}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => copyLink(link.slug)} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100" title="Copy">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button onClick={() => downloadQR(link.slug)} className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100" title="QR Code">
                      <QrCode className="h-4 w-4" />
                    </button>
                    <a href={link.original_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100" title="Visit">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button onClick={() => handleDelete(link.id)} className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
