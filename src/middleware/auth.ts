import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/integrations/supabase/client';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { data: { session }, error } = await supabase.auth.getSession();

  // Öffentliche Routen
  if (['/', '/login', '/leistungen'].includes(pathname)) {
    return NextResponse.next();
  }

  // Geschützte Routen
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Rollenbasierte Zugriffskontrolle
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (pathname.startsWith('/admin') && profile?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname.startsWith('/mitarbeiter') && profile?.role !== 'mitarbeiter') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}