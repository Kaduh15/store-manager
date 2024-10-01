import { Settings, ShoppingCart, Tags } from 'lucide-react'
import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="absolute bottom-0 flex h-fit w-full items-center justify-around bg-zinc-200 p-2 dark:bg-zinc-900">
      <Link href="/products" className="flex items-center gap-2">
        <Tags />
        Produtos
      </Link>
      <Link href="/sales" className="flex items-center gap-2">
        <ShoppingCart />
        Vendas
      </Link>
      <Link href="/settings" className="flex items-center gap-2">
        <Settings />
        menu
      </Link>
    </nav>
  )
}
