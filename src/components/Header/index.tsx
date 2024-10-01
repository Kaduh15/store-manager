'use client'

import { ArrowLeft } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const pathName = usePathname()

  return (
    <header className="flex h-fit items-center justify-between bg-zinc-200 p-2 dark:bg-zinc-900">
      <ArrowLeft className="h-6 w-6" onClick={router.back} />
      {pathName === '/' ? (
        <h1 className="font-bold text-2xl">Produtos</h1>
      ) : (
        <h1 className="font-bold text-2xl capitalize">
          {pathName.replace('/', '')}
        </h1>
      )}
    </header>
  )
}
