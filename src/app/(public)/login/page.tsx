// uma pagina para com formulario de login
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

export default function Login() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })
  const router = useRouter()

  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
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

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...form.register('email')} />
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...form.register('password')} />
        <Button type="submit">Login</Button>
      </form>
    </main>
  )
}
