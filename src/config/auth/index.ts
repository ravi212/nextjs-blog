import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './config';
import { logInUser } from '@/lib/actions/user.action';
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        
        const result = await logInUser(credentials);

        if(result?.success) {
          return result?.user;
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET
});