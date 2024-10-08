import { db } from '..'
import { Product } from '../schema'

type CreateProductParams = {
  costPrice: number
  salePrice: number
  description: string
  imageUrl: string
  stockQuantity: number
  categoryId: number
}

export async function createProduct({
  costPrice,
  salePrice,
  description,
  imageUrl,
  stockQuantity,
  categoryId,
}: CreateProductParams) {
  const [result] = await db
    .insert(Product)
    .values({
      costPrice,
      salePrice,
      description,
      imageUrl,
      stockQuantity,
      categoryId,
    })
    .returning()

  return result
}
