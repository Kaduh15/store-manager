import { login } from '@/db/functions/login'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@email.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const user = await login({
          email: credentials.email,
          password: credentials.password,
        })

        return {
          id: user.email,
          email: user.email,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
