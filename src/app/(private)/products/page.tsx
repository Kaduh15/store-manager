import { getProductsAction } from '@/actions/get-products'
import { ImageOffIcon, ShoppingCartIcon } from 'lucide-react'
import dynamic from 'next/dynamic'

const formatMoney = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format

const Image = dynamic(() => import('next/image'))

export default async function Products() {
  const [products] = await getProductsAction()

  return (
    <main className="flex h-full flex-1 flex-col justify-between gap-4 p-2 pb-7">
      <div className="flex w-2/1 flex-1 flex-col flex-wrap items-start justify-start gap-4 overflow-y-scroll">
        {products?.map(product => (
          <div
            key={product.id}
            className="mb-4 flex w-full items-center justify-between rounded-md bg-card p-4"
          >
            <div className="flex items-center space-x-4">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.description}
                  width={40}
                  height={40}
                  className="size-10 rounded-md"
                />
              )}

              {!product.imageUrl && (
                <ImageOffIcon className="size-10 text-muted-foreground" />
              )}
              <div className="flex w-full flex-col">
                <h2 className="truncate font-semibold text-lg">
                  {product.description}
                </h2>
                <p className="text-muted-foreground text-sm">{product.id}</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 space-x-2">
              <p className="text-primary">{formatMoney(product.salePrice)}</p>
              <div className="flex items-center space-x-2">
                <ShoppingCartIcon className="h-6 w-6 text-primary" />
                <span className="text-primary">{product.stockQuantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
