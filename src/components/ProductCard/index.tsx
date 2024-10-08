import { ImageOffIcon, ShoppingCartIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { UpdateProductDialog } from '../UpdateProductDialog'

export type Product = {
  id: number
  costPrice: number
  salePrice: number
  description: string
  imageUrl: string | null
  stockQuantity: number
  categoryId: number
}

type ProductCardProps = {
  product: Product
}

const formatMoney = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format

const Image = dynamic(() => import('next/image'))

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      key={product.id}
      className="mb-4 flex w-full items-center justify-between gap-4 rounded-md bg-card p-4"
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
      <div className="flex flex-1 flex-col items-end gap-2 space-x-2">
        <p className="text-primary">{formatMoney(product.salePrice)}</p>
        <div className="flex items-center space-x-2">
          <ShoppingCartIcon className="h-6 w-6 text-primary" />
          <span className="text-primary">{product.stockQuantity}</span>
        </div>
      </div>
      <UpdateProductDialog id={product.id} product={product} />
    </div>
  )
}
