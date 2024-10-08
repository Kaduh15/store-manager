'use server'

import { updateProduct } from '@/db/functions/updateProduct'
import z from 'zod'
import { createServerAction } from 'zsa'

const updateProductSchema = z.object({
  id: z.coerce.number().min(1, 'O id é obrigatório'),
  costPrice: z.coerce.number().optional(),
  salePrice: z.coerce.number().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url('Url inválida').optional(),
  stockQuantity: z.coerce.number().optional(),
})

export const updateProductAction = createServerAction()
  .input(updateProductSchema)
  .handler(async ({ input }) => {
    const { costPrice, salePrice, description, imageUrl, stockQuantity, id } =
      input
    return await updateProduct(id, {
      costPrice,
      salePrice,
      description,
      imageUrl,
      stockQuantity,
    })
  })
