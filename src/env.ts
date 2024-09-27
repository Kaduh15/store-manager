import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url().default('http://localhost:3000'),
  NEXTAUTH_SECRET: z.string().default('secret'),
})

export type Env = z.infer<typeof envSchema>

export const env = envSchema.parse(process.env)

process.env = {
  ...process.env,
  ...env,
}
