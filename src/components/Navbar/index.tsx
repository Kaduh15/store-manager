'use client'

import {
  BarChartIcon,
  MenuIcon,
  ShoppingCartIcon,
  TagIcon,
  UserIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathName = usePathname()

  const isProducts = pathName === '/products'
  const isSales = pathName === '/sales'
  const isClients = pathName === '/clients'
  const isReport = pathName === '/report'
  const isMenu = pathName === '/menu'

  return (
    <footer className="fixed right-0 bottom-0 left-0 bg-card p-4">
      <nav className="flex justify-around">
        <Link
          data-active={isProducts}
          href="/products"
          className="flex flex-col items-center data-[active=false]:text-secondary data-[active=true]:text-primary"
        >
          <TagIcon />
          <span className=" text-xs">Produtos</span>
        </Link>
        <Link
          data-active={isSales}
          href="/sales"
          className="flex flex-col items-center data-[active=false]:text-secondary data-[active=true]:text-primary"
        >
          <ShoppingCartIcon />
          <span className=" text-xs">Vendas</span>
        </Link>
        <Link
          data-active={isClients}
          href="/clients"
          className="flex flex-col items-center data-[active=false]:text-secondary data-[active=true]:text-primary"
        >
          <UserIcon />
          <span className=" text-xs">Clientes</span>
        </Link>
        <Link
          data-active={isReport}
          href="/report"
          className="flex flex-col items-center data-[active=false]:text-secondary data-[active=true]:text-primary"
        >
          <BarChartIcon />
          <span className=" text-xs">Relatórios</span>
        </Link>
        <Link
          data-active={isMenu}
          href="/menu"
          className="flex flex-col items-center data-[active=false]:text-secondary data-[active=true]:text-primary"
        >
          <MenuIcon />
          <span className=" text-xs">Menu</span>
        </Link>
      </nav>
    </footer>
  )
}
