import { createClient } from '@/app/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const supabase = await createClient()
    const { email } = await request.json()

    const {error} = await supabase.auth.resend({
        type: "signup",
        email: email
    })

    if (error) {
        return NextResponse.json({error: error.message}, {status: 400})
    }

    return NextResponse.json( {success: true}, {status: 200})
}