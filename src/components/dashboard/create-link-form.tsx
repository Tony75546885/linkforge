'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link2, Copy, Check } from 'lucide-react'
import { createDemoLink } from '@/lib/demo-store'
import toast from 'react-hot-toast'

export function CreateLinkForm({ onCreated }: { onCreated: () => void }) {
  const [url, setUrl] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [loading, setLoading] = useState(false)
  const [shortUrl, setShortUrl] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setShortUrl('')

    try {
      new URL(url)
    } catch {
      toast.error('Please enter a valid URL')
      setLoading(false)
      return
    }

    try {
      const link = createDemoLink(url, customSlug || undefined)
      const base = window.location.origin
      setShortUrl(`${base}/${link.slug}`)
      setUrl('')
      setCustomSlug('')
      toast.success('Link created!')
      onCreated()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create link')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Link2 className="h-5 w-5 text-indigo-600" />
        Shorten a link
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/your-long-url"
          required
        />
        <Input
          id="slug"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
          placeholder="Custom slug (optional, e.g. my-link)"
        />
        <Button type="submit" loading={loading} className="w-full">
          Shorten URL
        </Button>
      </form>

      {shortUrl && (
        <div className="mt-4 flex items-center gap-2 bg-indigo-50 rounded-lg p-3">
          <span className="text-sm font-medium text-indigo-700 flex-1 truncate">{shortUrl}</span>
          <button
            onClick={handleCopy}
            className="shrink-0 p-2 rounded-lg bg-indigo-100 hover:bg-indigo-200 transition-colors"
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-indigo-600" />}
          </button>
        </div>
      )}
    </div>
  )
}
