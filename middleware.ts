import NextAuth from 'next-auth';
import { authConfig} from './auth.config';

export default NextAuth(authConfig).auth;


// initializing NextAuth with the authConfig object and exporting auth prop.

// employing middleware for this task will ensure route does not render until auth. enhancing security and performance. 

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  };

