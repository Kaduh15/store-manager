import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'O email é obrigatório',
      description: 'O email do usuário',
    })
    .email({
      message: 'O email é inválido',
    }),
  password: z
    .string({
      required_error: 'A senha é obrigatória',
      description: 'A senha do usuário',
    })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

type LoginForm = z.infer<typeof loginSchema>

export function useLoginPage() {
  const {
    register,
    handleSubmit: submit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })
  const router = useRouter()

  const handleSubmit = submit(async ({ email, password }) => {
    const user = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    if (!user || user.error) {
      toast.error(`${user?.error}`)
      return
    }

    router.replace('/')
    toast.success('Login bem sucedido!')
  })

  return {
    register,
    handleSubmit,
    errors,
  }
}
