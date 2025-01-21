import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { error } from 'console';
import { NextRequest, NextResponse } from "next/server";
export default async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    const supabase = createMiddlewareClient({
        req,
        res,
    });

    try{


    const {data: {session}} = await supabase.auth.getSession();

    console.log("URL", req.nextUrl.pathname);
    console.log('Session Status: ', session ? 'valid' : 'null');

    if (error){
        console.error("Session error: ", error)
    }

    if (req.nextUrl.pathname.startsWith('/dashboard')) {
        if (!session)
            return NextResponse.redirect(new URL('/login', req.url));
    }
    
    if (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith
    ('/signup')) {
        console.log("Session", session)
        if (session)
            return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    }catch(error: any){
        console.log(error.message)
        return res
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}