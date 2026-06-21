import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { nanoid } from 'nanoid'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: links, error } = await supabase
    .from('links')
    .select('id, slug, original_url, clicks, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ links })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { url, customSlug } = body

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    new URL(url)
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  const slug = customSlug || nanoid(7)

  if (customSlug) {
    const { data: existing } = await supabase
      .from('links')
      .select('id')
      .eq('slug', customSlug)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Slug already taken' }, { status: 409 })
    }
  }

  const { data: linkCount } = await supabase
    .from('links')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const plan = profile?.plan || 'free'
  const limit = plan === 'pro' ? Infinity : 25
  const count = (linkCount as unknown as number) ?? 0

  if (count >= limit) {
    return NextResponse.json(
      { error: 'Link limit reached. Upgrade to Pro for unlimited links.' },
      { status: 403 }
    )
  }

  const { data: link, error } = await supabase
    .from('links')
    .insert({
      user_id: user.id,
      slug,
      original_url: url,
      clicks: 0,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(link, { status: 201 })
}

export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Link ID required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
