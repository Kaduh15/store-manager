import { Header } from '@/components/Header'
import { Navbar } from '@/components/Navbar'
import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex h-full w-screen flex-col pb-10">
      <Header />
      {children}
      <Navbar />
    </div>
  )
}
