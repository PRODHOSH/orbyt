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

  if (
    !user &&
    request.nextUrl.pathname.startsWith('/dashboard')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Role based routing
  if (user && request.nextUrl.pathname.startsWith('/dashboard')) {
      const role = user.user_metadata?.role;
      const path = request.nextUrl.pathname;
      
      // If they are on a dashboard path that doesn't match their role
      if (role && !path.startsWith(`/dashboard/${role}`)) {
          const url = request.nextUrl.clone()
          url.pathname = `/dashboard/${role}`
          return NextResponse.redirect(url)
      }
      
      // If they are just on /dashboard, redirect to their role dashboard
      if (path === '/dashboard') {
          const url = request.nextUrl.clone()
          url.pathname = role ? `/dashboard/${role}` : '/login'
          return NextResponse.redirect(url)
      }
  }

  // If user is logged in and visits login or register, redirect to dashboard
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
      const role = user.user_metadata?.role;
      const url = request.nextUrl.clone()
      url.pathname = role ? `/dashboard/${role}` : '/dashboard'
      return NextResponse.redirect(url)
  }

  return supabaseResponse
}
