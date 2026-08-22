import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname;

  // ──────────────────────────────────────────────
  // 1. UNAUTHENTICATED user trying to access /dashboard → send to /login
  // ──────────────────────────────────────────────
  if (!user && path.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // ──────────────────────────────────────────────
  // 2. AUTHENTICATED user logic
  // ──────────────────────────────────────────────
  if (user) {
    const role = user.user_metadata?.role;
    const isOnboarded = user.user_metadata?.is_onboarded === true;

    // 2a. If on /login or /register, redirect away (they're already logged in)
    if (path === '/login' || path === '/register') {
      const url = request.nextUrl.clone()
      if (!isOnboarded) {
        url.pathname = '/onboarding'
      } else {
        url.pathname = role ? `/dashboard/${role}` : '/dashboard/student'
      }
      return NextResponse.redirect(url)
    }

    // 2b. If on /dashboard and NOT onboarded → send to /onboarding
    if (path.startsWith('/dashboard') && !isOnboarded) {
      const url = request.nextUrl.clone()
      url.pathname = '/onboarding'
      return NextResponse.redirect(url)
    }

    // 2c. If on /onboarding but ALREADY onboarded → send to dashboard
    if (path === '/onboarding' && isOnboarded) {
      const url = request.nextUrl.clone()
      url.pathname = role ? `/dashboard/${role}` : '/dashboard/student'
      return NextResponse.redirect(url)
    }

    // 2d. If on exactly /dashboard (no sub-path), redirect to role dashboard
    if (path === '/dashboard' && isOnboarded) {
      const url = request.nextUrl.clone()
      url.pathname = role ? `/dashboard/${role}` : '/dashboard/student'
      return NextResponse.redirect(url)
    }

    // 2e. ALL other /dashboard/* paths (like /dashboard/orbyt-ai, /dashboard/admin/knowledge)
    //     → ALLOW through. Do NOT force-redirect to role path.
  }

  return supabaseResponse
}
