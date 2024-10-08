'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from './ui/badge'

type Category = {
  id: number
  name: string
}

type ButtonCategoryProps = {
  category: Category
  filterByCategory?: number
}

export function ButtonCategory({
  category,
  filterByCategory,
}: ButtonCategoryProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('filterByCategory')

  async function handleFilterByCategory(categoryId: number) {
    if (Number(categoryFilter) === categoryId) {
      return router.push('/products')
    }
    if (categoryId) {
      return router.push(`/products?filterByCategory=${categoryId}`)
    }
    return router.push('/products')
  }

  return (
    <Badge
      data-active={filterByCategory === category.id}
      className="capitalize"
      onClick={() => handleFilterByCategory(category.id)}
    >
      {category.name}
    </Badge>
  )
}
