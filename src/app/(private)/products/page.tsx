'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import dynamic from 'next/dynamic'
import { ACCEPTED_IMAGE_TYPES, useProductsPage } from './useProductsPage'

const formatMoney = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format

const Image = dynamic(() => import('next/image'))

export default function Products() {
  const { isOpen, setIsOpen, handleSubmitForm, products, register } =
    useProductsPage()

  return (
    <main className="flex h-full flex-1 flex-col justify-between gap-4 p-2">
      <div className="flex w-2/1 flex-1 flex-wrap items-center justify-center gap-4 overflow-x-scroll">
        {products?.map(product => (
          <div
            key={product.id}
            className="flex max-w-32 flex-col gap-2 rounded-md border p-2"
          >
            <h1 className="truncate text-xl">{product.description}</h1>
            <h2 className="text-sm">{formatMoney(product.costPrice)}</h2>
            <h2 className="text-sm">{formatMoney(product.salePrice)}</h2>
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.description}
                width={100}
                height={100}
              />
            )}
            <p>Quantidade: {product.stockQuantity}</p>
          </div>
        ))}
      </div>

      <Dialog onOpenChange={open => setIsOpen(open)} open={isOpen}>
        <DialogTrigger asChild>
          <Button>Adicionar produto</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Produto</DialogTitle>
            <form onSubmit={handleSubmitForm}>
              <Label htmlFor="description">Descrição</Label>
              <Input
                {...register('description')}
                type="text"
                placeholder="Exemplo: Camisa de banho"
              />
              <Label htmlFor="costPrice">Preço de custo</Label>
              <Input
                {...register('costPrice')}
                type="number"
                placeholder="Exemplo: 100"
              />
              <Label htmlFor="salePrice">Preço de venda</Label>
              <Input
                {...register('salePrice')}
                type="number"
                placeholder="Exemplo: 50"
              />
              <Label htmlFor="image">Imagem</Label>
              <Input
                {...register('image')}
                type="file"
                accept={ACCEPTED_IMAGE_TYPES.join(',')}
              />
              <Label htmlFor="stockQuantity">Quantidade em estoque</Label>
              <Input
                {...register('stockQuantity')}
                type="number"
                placeholder="Exemplo: 10"
              />

              <Button type="submit">Adicionar</Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  )
}
