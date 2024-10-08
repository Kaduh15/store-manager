import { getCategoriesAction } from '@/actions/get-categories'
import { getProductsAction } from '@/actions/get-products'
import { ProductCard } from '@/components/ProductCard'
import { ButtonCategory } from '@/components/button-category'
import { Separator } from '@/components/ui/separator'

type ProductsProps = {
  searchParams: { filterByCategory?: string }
}

export default async function Products({ searchParams }: ProductsProps) {
  const { filterByCategory } = searchParams
  const [products] = await getProductsAction()
  const [categories] = await getCategoriesAction()

  let filteredProducts = products

  if (filterByCategory && products) {
    filteredProducts = products.filter(
      product => product.categoryId === Number(filterByCategory)
    )
  }

  return (
    <main className="flex h-full flex-1 flex-col justify-between gap-4 p-2 pb-7">
      <div className="flex w-2/1 flex-1 items-center justify-start gap-4 overflow-y-scroll p-4">
        {categories?.map(category => (
          <ButtonCategory
            key={category.id}
            category={category}
            filterByCategory={Number(filterByCategory)}
          />
        ))}
      </div>

      <Separator />

      <div className="flex w-2/1 flex-1 flex-col flex-wrap items-start justify-start gap-4 overflow-y-scroll p-4">
        {!filteredProducts?.length && <p>Nenhum produto encontrado</p>}
        {filteredProducts?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
