import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  trustHost: true,
  session: {
    strategy: 'jwt',
    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 24 * 60 * 60 // ** 24 hours
  },

  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user, profile }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }

      return token
    },
  },

  providers: []

} satisfies NextAuthConfig;