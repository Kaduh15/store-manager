import { getProductsAction } from '@/actions/get-products'
import { ProductCard } from '@/components/ProductCard'

export default async function Products() {
  const [products] = await getProductsAction()

  return (
    <main className="flex h-full flex-1 flex-col justify-between gap-4 p-2 pb-7">
      <div className="flex w-2/1 flex-1 flex-col flex-wrap items-start justify-start gap-4 overflow-y-scroll">
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
