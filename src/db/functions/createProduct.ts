import { db } from '..'
import { Product } from '../schema'

type CreateProductParams = {
  costPrice: number
  salePrice: number
  description: string
  imageUrl: string
  stockQuantity: number
}

export async function createProduct(params: CreateProductParams) {
  const { costPrice, salePrice, description, imageUrl, stockQuantity } = params
  const [result] = await db
    .insert(Product)
    .values({
      costPrice,
      salePrice,
      description,
      imageUrl: imageUrl,
      stockQuantity: stockQuantity,
      categoryId: 1,
    })
    .returning()

  return result
}
