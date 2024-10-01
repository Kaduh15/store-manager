'use client'

import { createProductAction } from '@/actions/create-product'
import { getProductsAction } from '@/actions/get-products'
import { storage } from '@/libs/firebase'
import { zodResolver } from '@hookform/resolvers/zod'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useServerAction } from 'zsa-react'

export const MAX_FILE_SIZE = 5000000
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export function useProductsPage() {
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

      return ACCEPTED_IMAGE_TYPES.includes(fileType)
    }),
    stockQuantity: z.coerce.number().min(1, 'A quantidade é obrigatória'),
  })

  type AddProductForm = z.infer<typeof addProductSchema>

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

  return {
    isOpen,
    setIsOpen,
    handleSubmitForm,
    products,
    register,
    errors,
    handleCreateProduct,
  }
}
