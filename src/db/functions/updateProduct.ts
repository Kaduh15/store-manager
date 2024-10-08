import { eq } from 'drizzle-orm'
import { db } from '..'
import { Product } from '../schema'

type UpdateProductParams = {
  costPrice?: number
  salePrice?: number
  description?: string
  imageUrl?: string
  stockQuantity?: number
}

export async function updateProduct(id: number, params: UpdateProductParams) {
  const { costPrice, salePrice, description, imageUrl, stockQuantity } = params
  const [result] = await db
    .update(Product)
    .set({
      costPrice,
      salePrice,
      description,
      imageUrl,
      stockQuantity,
    })
    .where(eq(Product.id, id))
    .returning()

  return result
}
