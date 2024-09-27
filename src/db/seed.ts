import * as bcrypt from 'bcryptjs'
import { client, db } from '.'
import { User } from './schema'

async function seed() {
  await db.delete(User)

  const hashPassword = await bcrypt.hash('123456', 10)

  await db
    .insert(User)
    .values([{ email: 'admin@admin.com', password: hashPassword }])
}

seed().finally(() => client.end())
