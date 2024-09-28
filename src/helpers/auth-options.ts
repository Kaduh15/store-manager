import { login } from '@/db/functions/login'
import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
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

        if (!user) {
          return null
        }

        return {
          id: user.id.toString(),
          email: user.email,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = Number(token.sub)
      return session
    },
  },
}
