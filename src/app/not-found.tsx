import { authOptions } from '@/helpers/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function NotFound() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/products')
  }

  redirect('/login')
}
