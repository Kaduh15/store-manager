'use client'

import { updateProductAction } from '@/actions/update-product'
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
import { deleteImage, uploadImage } from '@/lib/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronRightIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import type { Product } from '../ProductCard'

export const MAX_FILE_SIZE = 5000000
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

type UpdateProductDialogProps = {
  id: number
  product: Partial<Product>
}

export function UpdateProductDialog({ product }: UpdateProductDialogProps) {
  const updateProductSchema = z.object({
    costPrice: z.coerce.number().optional(),
    salePrice: z.coerce.number().optional(),
    description: z.string().optional(),
    image: z.any().optional(),
    stockQuantity: z.coerce.number().optional(),
  })

  type updateProductForm = z.infer<typeof updateProductSchema>

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isCreatingProduct, setIsCreatingProduct] = useState<boolean>(false)

  const { register, handleSubmit, reset } = useForm<updateProductForm>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      costPrice: product.costPrice,
      salePrice: product.salePrice,
      description: product.description,
      stockQuantity: product.stockQuantity,
    },
  })

  const handleSubmitForm = handleSubmit(async data => {
    const { image } = data
    if (!product.id) {
      return
    }

    const file = image.item(0)
    let imageURL = product.imageUrl || undefined

    setIsCreatingProduct(true)
    if (file) {
      product.imageUrl && (await deleteImage(product.imageUrl))
      imageURL = await uploadImage(file)
    }

    const [, error] = await updateProductAction({
      id: product.id,
      costPrice: data.costPrice,
      salePrice: data.salePrice,
      description: data.description,
      imageUrl: imageURL,
      stockQuantity: data.stockQuantity,
    })

    setIsCreatingProduct(false)
    if (error) {
      toast.error(`Error: ${JSON.stringify(error, null, 2)}`)
      imageURL && (await deleteImage(imageURL))
      return
    }
    setIsOpen(false)
    reset()
    toast.success('Produto atualizado com sucesso!')
  })

  return (
    <Dialog onOpenChange={open => setIsOpen(open)} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <ChevronRightIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-9/12 max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
          <Label htmlFor="description">Descrição</Label>
          <Input
            disabled={isCreatingProduct}
            {...register('description')}
            type="text"
            placeholder="Exemplo: Camisa de banho"
          />
          <Label htmlFor="costPrice">Preço de custo</Label>
          <Input
            disabled={isCreatingProduct}
            {...register('costPrice')}
            type="number"
            placeholder="Exemplo: 100"
          />
          <Label htmlFor="salePrice">Preço de venda</Label>
          <Input
            disabled={isCreatingProduct}
            {...register('salePrice')}
            type="number"
            placeholder="Exemplo: 50"
          />
          <Label htmlFor="image">Imagem</Label>
          <Input
            disabled={isCreatingProduct}
            {...register('image')}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(',')}
          />
          <Label htmlFor="stockQuantity">Quantidade em estoque</Label>
          <Input
            disabled={isCreatingProduct}
            {...register('stockQuantity')}
            type="number"
            placeholder="Exemplo: 10"
          />

          <Button type="submit" disabled={isCreatingProduct}>
            {isCreatingProduct ? 'Atualizando...' : 'Atualizar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
