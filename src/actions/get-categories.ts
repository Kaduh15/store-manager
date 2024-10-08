'use server'

import { getCategories } from '@/db/functions/getCategories'
import { createServerAction } from 'zsa'

export const getCategoriesAction = createServerAction().handler(async () => {
  const categories = await getCategories()

  return categories
})
