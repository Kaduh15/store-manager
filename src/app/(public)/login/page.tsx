'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoginPage } from './useLoginPage'

export default function Login() {
  const { register, handleSubmit, errors } = useLoginPage()

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label htmlFor="email">Email</Label>
        <Input
          data-error={!!errors.email}
          id="email"
          type="email"
          placeholder="Digite seu email"
          className="data-[error=true]:border-red-500 data-[error=true]:text-red-500"
          {...register('email')}
        />
        <Label htmlFor="password">Senha</Label>
        <Input
          data-error={!!errors.password}
          id="password"
          type="password"
          placeholder="Digite sua senha"
          className="data-[error=true]:border-red-500 data-[error=true]:text-red-500"
          {...register('password')}
        />
        <Button type="submit">Login</Button>
      </form>
    </main>
  )
}
