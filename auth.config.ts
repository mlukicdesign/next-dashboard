import type { NextAuthConfig } from 'next-auth';


// auth to prevent users accessing the dashboard without being logged in

// callback is used to verify if the request is authorized to access a page via next.js middleware. 

// the auth property contains the user's session and the request property contain incoming request

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
         },
    },
    providers: [],
} satisfies NextAuthConfig;

