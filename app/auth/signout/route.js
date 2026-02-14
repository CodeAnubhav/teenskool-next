import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({
        cookies: () => cookieStore
    });

    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        await supabase.auth.signOut();
    }

    return NextResponse.json({ message: 'Signed out successfully' }, { status: 200 });
}
