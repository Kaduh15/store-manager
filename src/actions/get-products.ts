'use server'

import { getProducts } from '@/db/functions/getProducts'
import { createServerAction } from 'zsa'

export const getProductsAction = createServerAction().handler(async () => {
  const products = await getProducts()

  return products
})
