import { NextResponse } from 'next/server';

export async function GET(request) {
    // STRICT: This is the root of Admin APIs.
    // Validate System Role = 'admin' here.
    return NextResponse.json({ error: 'Admin Access Only' }, { status: 403 });
}
