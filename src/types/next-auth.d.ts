// biome-ignore lint/correctness/noUnusedImports: <explanation>
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
    }
  }
}
