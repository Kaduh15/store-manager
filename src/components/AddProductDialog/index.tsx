'use client'

import { createProductAction } from '@/actions/create-product'
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
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export const MAX_FILE_SIZE = 5000000
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export function AddProductDialog() {
  const addProductSchema = z.object({
    costPrice: z.coerce.number().min(1, 'O preço é obrigatório'),
    salePrice: z.coerce.number().min(1, 'O preço é obrigatório'),
    description: z.string().min(1, 'A descrição é obrigatória'),
    image: z.any().refine(files => {
      return files && typeof files.length === 'number' && files.length > 0
    }, 'Arquivo é obrigatório'),
    stockQuantity: z.coerce.number().min(1, 'A quantidade é obrigatória'),
  })

  type AddProductForm = z.infer<typeof addProductSchema>

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isCreatingProduct, setIsCreatingProduct] = useState<boolean>(false)

  const { register, handleSubmit, reset } = useForm<AddProductForm>({
    resolver: zodResolver(addProductSchema),
  })

  const handleSubmitForm = handleSubmit(async data => {
    const { image } = data
    if (!image) {
      return
    }

    const file = image.item(0)
    if (file) {
      const imageURL = await uploadImage(file)
      setIsCreatingProduct(true)
      const [, error] = await createProductAction({
        costPrice: data.costPrice,
        salePrice: data.salePrice,
        description: data.description,
        imageUrl: imageURL,
        stockQuantity: data.stockQuantity,
      })
      setIsCreatingProduct(false)
      if (error) {
        toast.error(`Error: ${JSON.stringify(error, null, 2)}`)
        await deleteImage(imageURL)
        return
      }

      setIsOpen(false)
      reset()
      toast.success('Produto criado com sucesso!')
    }
  })

  return (
    <Dialog onOpenChange={open => setIsOpen(open)} open={isOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
        </Button>
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

            <Button type="submit" disabled={isCreatingProduct}>
              {isCreatingProduct ? 'Criando...' : 'Adicionar'}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
