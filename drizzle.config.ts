import { envParsed } from '@/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  out: './.migrations',
  dbCredentials: {
    url: envParsed.DATABASE_URL,
  },
})
