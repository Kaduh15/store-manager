import { authOptions } from '@/helpers/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return children
}
