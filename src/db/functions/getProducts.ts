import { asc } from 'drizzle-orm'
import { db } from '..'
import { Product } from '../schema'

export async function getProducts() {
  const products = await db
    .select()
    .from(Product)
    .orderBy(asc(Product.description))

  return products
}
