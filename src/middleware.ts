import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    const supabase = createMiddlewareClient({
        req,
        res,
    });

 
    try{
        const {data: {session}} = await supabase.auth.getSession();
        const {data: userProfile} = await supabase
            .from('profiles').select().eq('user_id', session?.user.id).single()
        // if (!session) return NextResponse.rewrite(new URL('/login', req.url));
    
        // console.log(session)
        if (req.nextUrl.pathname === '/') return res;


        if (req.nextUrl.pathname.startsWith('/dashboard')) {
            if (!session)
                return NextResponse.rewrite(new URL('/login', req.url));
        }
        
        if (req.nextUrl.pathname.startsWith('/login') ) {
            if (!session) return res;
            
            if (userProfile?.username === null) {
                return NextResponse.redirect(new URL('/profile-setup', req.url))
            }
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        if (req.nextUrl.pathname.startsWith('/sign-up')){

            if (session) return NextResponse.redirect(new URL('/profile-setup', req.url));
        }

        if (req.nextUrl.pathname.startsWith('/sign-out')){
            return NextResponse.rewrite(new URL('/login', req.url));
        }


        
        return res

    }catch (error) {
        return res
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}