import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const requestUrl = new URL(request.url);
        const code = requestUrl.searchParams.get('code');
        const next = requestUrl.searchParams.get('next');

        if (code) {
            const cookieStore = await cookies();
            const supabase = createRouteHandlerClient({
                cookies: () => cookieStore
            });
            await supabase.auth.exchangeCodeForSession(code);
        }

        // URL to redirect to after sign in process completes
        // Prefer 'next' param if present, otherwise dashboard
        const origin = requestUrl.origin;
        const redirectTo = next || '/dashboard';
        return NextResponse.redirect(new URL(redirectTo, origin));
    } catch (error) {
        console.error('Callback error:', error);
        // Redirect to login with error details
        const origin = new URL(request.url).origin;
        const errorMessage = encodeURIComponent(error.message || 'Unknown error');
        return NextResponse.redirect(new URL(`/auth/student/login?error=AuthFailed&message=${errorMessage}`, origin));
    }
}
