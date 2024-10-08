import { db } from '..'
import { Category } from '../schema'

export async function getCategories() {
  const result = await db.select().from(Category)

  return result
}
