import Link from 'next/link'
import { Link2, BarChart3, QrCode, Zap, Shield, Globe, ArrowRight, Check } from 'lucide-react'
import { PLANS } from '@/lib/stripe'

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link2 className="h-7 w-7 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">LinkForge</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2">
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-20 pb-24 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Zap className="h-4 w-4" />
          Trusted by 10,000+ marketers
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Short links, <span className="text-indigo-600">big results</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Shorten your URLs, track every click, and generate beautiful QR codes.
          The link management platform built for growth.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-lg text-base font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25"
          >
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 px-8 py-3.5 rounded-lg text-base font-semibold hover:bg-gray-50 transition-all"
          >
            See How It Works
          </a>
        </div>
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-200 p-8">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <Globe className="h-5 w-5 text-gray-400 shrink-0" />
              <span className="text-gray-400 text-sm truncate">https://example.com/very-long-url-that-nobody-wants-to-share</span>
              <ArrowRight className="h-5 w-5 text-indigo-500 shrink-0 mx-2" />
              <span className="text-indigo-600 font-semibold text-sm whitespace-nowrap">lnkf.co/abc123</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3">
                <div className="text-2xl font-bold text-gray-900">2.4M</div>
                <div className="text-xs text-gray-500 mt-1">Links created</div>
              </div>
              <div className="text-center p-3 border-x border-gray-100">
                <div className="text-2xl font-bold text-gray-900">98.7M</div>
                <div className="text-xs text-gray-500 mt-1">Clicks tracked</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl font-bold text-gray-900">150+</div>
                <div className="text-xs text-gray-500 mt-1">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: Link2,
    title: 'Smart URL Shortening',
    description: 'Create short, branded links in seconds. Custom slugs available for Pro users.',
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    description: 'Track clicks, geographic locations, devices, referrers, and more in real-time.',
  },
  {
    icon: QrCode,
    title: 'QR Code Generator',
    description: 'Generate beautiful QR codes for any link. Download as PNG or SVG.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Links redirect in under 50ms. Built on edge infrastructure for global speed.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: '99.9% uptime guarantee. All links are scanned for malware and phishing.',
  },
  {
    icon: Globe,
    title: 'API Access',
    description: 'Full REST API for Pro users. Integrate link creation into your workflows.',
  },
]

function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Everything you need to manage links</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            From simple URL shortening to advanced analytics — LinkForge has you covered.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="p-6 rounded-xl border border-gray-100 hover:border-indigo-100 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                <feature.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-gray-600">Start free. Upgrade when you need more.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h3 className="text-lg font-semibold text-gray-900">{PLANS.free.name}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
            <p className="mt-3 text-sm text-gray-600">Perfect for getting started</p>
            <Link
              href="/signup"
              className="mt-6 block w-full text-center py-3 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Get Started
            </Link>
            <ul className="mt-8 space-y-3">
              {PLANS.free.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="h-5 w-5 text-green-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border-2 border-indigo-600 p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{PLANS.pro.name}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">${PLANS.pro.price}</span>
              <span className="text-gray-500 ml-2">/month</span>
            </div>
            <p className="mt-3 text-sm text-gray-600">For professionals and teams</p>
            <Link
              href="/signup?plan=pro"
              className="mt-6 block w-full text-center py-3 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
            >
              Start Free Trial
            </Link>
            <ul className="mt-8 space-y-3">
              {PLANS.pro.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="h-5 w-5 text-indigo-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    { q: 'Is LinkForge really free?', a: 'Yes! Our Free plan includes 25 short links and basic analytics. No credit card required.' },
    { q: 'How fast are the redirects?', a: 'Links redirect in under 50ms globally thanks to our edge infrastructure.' },
    { q: 'Can I use my own domain?', a: 'Custom domains are coming soon in our Enterprise plan. Pro users can create custom slugs.' },
    { q: 'Is there an API?', a: 'Yes, Pro users get full REST API access to create, manage, and analyze links programmatically.' },
  ]

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently asked questions</h2>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-gray-200 pb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Link2 className="h-6 w-6 text-indigo-400" />
            <span className="text-lg font-bold text-white">LinkForge</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          &copy; 2024 LinkForge. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </>
  )
}
