export interface DemoLink {
  id: string
  slug: string
  original_url: string
  clicks: number
  created_at: string
  user_id: string
}

const STORAGE_KEY = 'linkforge_links'
const USER_KEY = 'linkforge_user'

function getLinks(): DemoLink[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

function saveLinks(links: DemoLink[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
}

export function getDemoUser(): { id: string; email: string } | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

export function setDemoUser(email: string) {
  const user = { id: crypto.randomUUID(), email }
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  return user
}

export function clearDemoUser() {
  localStorage.removeItem(USER_KEY)
}

export function getUserLinks(): DemoLink[] {
  const user = getDemoUser()
  if (!user) return []
  return getLinks()
    .filter((l) => l.user_id === user.id)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export function createDemoLink(url: string, customSlug?: string): DemoLink {
  const user = getDemoUser()
  if (!user) throw new Error('Not logged in')

  const slug = customSlug || generateSlug()
  const links = getLinks()

  if (links.some((l) => l.slug === slug)) {
    throw new Error('Slug already taken')
  }

  const link: DemoLink = {
    id: crypto.randomUUID(),
    slug,
    original_url: url,
    clicks: Math.floor(Math.random() * 50),
    created_at: new Date().toISOString(),
    user_id: user.id,
  }

  saveLinks([...links, link])
  return link
}

export function deleteDemoLink(id: string) {
  const links = getLinks().filter((l) => l.id !== id)
  saveLinks(links)
}

export function getDemoLinkBySlug(slug: string): DemoLink | null {
  return getLinks().find((l) => l.slug === slug) ?? null
}

export function incrementDemoClicks(slug: string) {
  const links = getLinks()
  const link = links.find((l) => l.slug === slug)
  if (link) {
    link.clicks += 1
    saveLinks(links)
  }
}

function generateSlug(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let slug = ''
  for (let i = 0; i < 7; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return slug
}
