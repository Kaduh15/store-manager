import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/helpers/auth-options'

export default async function PrivateLayout({
  children,
}: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return <>{children}</>
}
