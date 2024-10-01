'use client'

import { createProductAction } from '@/actions/create-product'
import { getProductsAction } from '@/actions/get-products'
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
import { storage } from '@/libs/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useServerAction } from 'zsa-react'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const formatMoney = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format

const addProductSchema = z.object({
  costPrice: z.coerce.number().min(1, 'O preço é obrigatório'),
  salePrice: z.coerce.number().min(1, 'O preço é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  image: z.instanceof(FileList).refine(files => {
    if (!files.length) {
      return false
    }

    const file = files[0]
    const fileSize = file.size

    if (fileSize > MAX_FILE_SIZE) {
      return false
    }

    const fileType = file.type
    console.log('🚀 ~ image:z.instanceof ~ fileType:', fileType)

    return ACCEPTED_IMAGE_TYPES.includes(fileType)
  }),
  stockQuantity: z.coerce.number().min(1, 'A quantidade é obrigatória'),
})

type AddProductForm = z.infer<typeof addProductSchema>

export default function Products() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddProductForm>({
    resolver: zodResolver(addProductSchema),
  })

  const { execute: handleCreateProduct } = useServerAction(
    createProductAction,
    {
      onSuccess: () => {
        toast.success('Produto criado com sucesso!')
        reset()
        setIsOpen(false)
      },
      onError: error => {
        toast.error(`Error: ${error}`)
      },
    }
  )

  const { data: products, execute: getProducts } = useServerAction(
    getProductsAction,
    {
      initialData: [],
    }
  )

  const handleSubmitForm = handleSubmit(async data => {
    const { image } = data
    if (!image) {
      return
    }

    const file = image.item(0)
    if (file) {
      try {
        const storageRef = ref(storage, `images/${file.name}-${Date.now()}`)
        const arrayBuffer = await file.arrayBuffer()
        const uploadResult = await uploadBytes(storageRef, arrayBuffer)
        const imageURL = await getDownloadURL(uploadResult.ref)

        await handleCreateProduct({
          costPrice: data.costPrice,
          salePrice: data.salePrice,
          description: data.description,
          imageUrl: imageURL,
          stockQuantity: data.stockQuantity,
        })
      } catch (error) {
        console.error(error)
      }
    }
  })

  useEffect(() => {
    getProducts()
  }, [getProducts])

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
                layout="responsive"
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
