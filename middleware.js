import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    // 1. Get Session
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const url = req.nextUrl.clone();

    // 2. Protected Routes (Dashboard)
    if (req.nextUrl.pathname.startsWith('/dashboard')) {

        // A. Not Logged In -> Login
        if (!session) {
            url.pathname = '/auth/login';
            return NextResponse.redirect(url);
        }

        // B. Role Check
        // We need to fetch the user's role.
        // NOTE: In high-scale apps, you might store role in App Metadata to avoid a DB hit on every nav.
        // For now, a DB hit is secure and acceptable.
        const { data: profile } = await supabase
            .from('profiles')
            .select('system_role')
            .eq('id', session.user.id)
            .single();

        const role = profile?.system_role || 'student';

        // C. Admin Route Guard
        if (req.nextUrl.pathname.startsWith('/dashboard/admin')) {
            if (role !== 'admin' && role !== 'super_admin') {
                // Unauthorized access to admin panel
                url.pathname = '/dashboard/student';
                return NextResponse.redirect(url);
            }
        }

        // D. Root Dashboard Redirect (Convenience)
        if (req.nextUrl.pathname === '/dashboard') {
            if (role === 'admin') {
                url.pathname = '/dashboard/admin';
            } else {
                url.pathname = '/dashboard/student';
            }
            return NextResponse.redirect(url);
        }
    }

    // 3. Auth Redirect (If logged in, don't show login page)
    if (
        req.nextUrl.pathname.startsWith('/auth/student/login') ||
        req.nextUrl.pathname.startsWith('/auth/student/signup') ||
        req.nextUrl.pathname.startsWith('/auth/admin/login')
    ) {
        if (session) {
            // Smart redirect (Role Aware)
            const { data: profile } = await supabase
                .from('profiles')
                .select('system_role')
                .eq('id', session.user.id)
                .single();
            const role = profile?.system_role || 'student';

            if (role === 'admin') url.pathname = '/dashboard/admin';
            else url.pathname = '/dashboard/student';

            return NextResponse.redirect(url);
        }
    }

    // 4. Legacy Redirects (If user tries old paths)
    if (req.nextUrl.pathname === '/auth/login') {
        url.pathname = '/auth/student/login';
        return NextResponse.redirect(url);
    }
    if (req.nextUrl.pathname === '/auth/signup') {
        url.pathname = '/auth/student/signup';
        return NextResponse.redirect(url);
    }
    if (req.nextUrl.pathname === '/admin/login') {
        url.pathname = '/auth/admin/login';
        return NextResponse.redirect(url);
    }

    return res;
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/:path*', '/admin/:path*'],
};
