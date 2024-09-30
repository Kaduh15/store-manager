import * as bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '..'
import { User } from '../schema'

export type LoginParams = {
  email: string
  password: string
}

export async function login(params: LoginParams) {
  const [result] = await db
    .select({
      id: User.id,
      email: User.email,
      password: User.password,
    })
    .from(User)
    .where(eq(User.email, params.email))

  if (!result) {
    throw new Error('Email ou senha inválida')
  }

  const { password, ...user } = result

  const passwordMatch = await bcrypt.compare(params.password, password)

  if (!passwordMatch) {
    throw new Error('Email ou senha inválida')
  }

  return user
}
