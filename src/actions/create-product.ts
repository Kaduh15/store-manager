'use server'

import { createProduct } from '@/db/functions/createProduct'
import z from 'zod'
import { createServerAction } from 'zsa'

const createProductSchema = z.object({
  costPrice: z.coerce.number().min(1, 'O preço é obrigatório'),
  salePrice: z.coerce.number().min(1, 'O preço é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  imageUrl: z.string().url('Url inválida'),
  stockQuantity: z.coerce.number().min(1, 'A quantidade é obrigatória'),
  categoryId: z.coerce.number().min(1, 'A categoria é obrigatória'),
})

export const createProductAction = createServerAction()
  .input(createProductSchema)
  .handler(async ({ input }) => {
    const {
      costPrice,
      salePrice,
      description,
      imageUrl,
      stockQuantity,
      categoryId,
    } = input
    return await createProduct({
      costPrice,
      salePrice,
      description,
      imageUrl,
      stockQuantity,
      categoryId,
    })
  })
