import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const reserved = ['login', 'signup', 'dashboard', 'api', 'pricing']
  if (reserved.includes(slug)) {
    return NextResponse.next()
  }

  const supabase = getSupabase()

  const { data: link, error } = await supabase
    .from('links')
    .select('id, original_url')
    .eq('slug', slug)
    .single()

  if (error || !link) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  await supabase.rpc('increment_clicks', { link_id: link.id })

  return NextResponse.redirect(link.original_url, { status: 301 })
}
