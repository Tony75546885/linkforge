'use client'

import Link from 'next/link'
import { Link2, Check, ArrowLeft } from 'lucide-react'
import { PLANS } from '@/lib/stripe'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function PricingPage() {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
        return
      }

      toast.error(data.error || 'Stripe is not configured yet. Add your Stripe keys in the Render dashboard.')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <Link2 className="h-7 w-7 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">LinkForge</span>
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Upgrade to Pro</h1>
          <p className="mt-4 text-lg text-gray-600">Unlock unlimited links, advanced analytics, and API access.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-xl font-semibold text-gray-900">{PLANS.free.name}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-5xl font-bold text-gray-900">$0</span>
              <span className="text-gray-500 ml-2 text-lg">/month</span>
            </div>
            <p className="mt-4 text-gray-600">Perfect for getting started</p>
            <div className="mt-6 py-3 px-4 rounded-lg bg-gray-100 text-center text-sm font-medium text-gray-500">
              Current Plan
            </div>
            <ul className="mt-8 space-y-4">
              {PLANS.free.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border-2 border-indigo-600 p-8 relative shadow-lg shadow-indigo-100">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
              RECOMMENDED
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{PLANS.pro.name}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-5xl font-bold text-gray-900">${PLANS.pro.price}</span>
              <span className="text-gray-500 ml-2 text-lg">/month</span>
            </div>
            <p className="mt-4 text-gray-600">For professionals and teams</p>
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="mt-6 w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25 disabled:opacity-50"
            >
              {loading ? 'Redirecting...' : 'Upgrade to Pro — $9/mo'}
            </button>
            <ul className="mt-8 space-y-4">
              {PLANS.pro.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-sm text-gray-600">Yes, you can cancel your subscription at any time. Your Pro features will remain active until the end of your billing period.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">What happens to my links if I downgrade?</h3>
              <p className="text-sm text-gray-600">Your existing links will continue to work. You just won&apos;t be able to create new ones beyond the Free plan limit.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-sm text-gray-600">Yes! Start with our Free plan — no credit card required. Upgrade when you need more features.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer team plans?</h3>
              <p className="text-sm text-gray-600">Team plans are coming soon! Contact us for early access and volume pricing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
