import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    console.log(url.pathname);
    if(url.pathname === '/adminstrations'){
        url.pathname = '/adminstrations/dashboard/overview';
        return NextResponse.redirect(url);
    }
    if(url.pathname === '/profile'){
        url.pathname = '/profile/infor';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)',]
}