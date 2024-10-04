import { SearchIcon, ShoppingCartIcon } from 'lucide-react'
import { AddProductDialog } from '../AddProductDialog'
import { Switch } from '../ui/switch'

export function Header() {
  return (
    <header className="flex items-center justify-between border-muted border-b p-4">
      <section className="flex items-center justify-between gap-4">
        <h1 className="font-bold text-lg">Produtos</h1>
        <div className="flex items-center space-x-4">
          <SearchIcon className="size-6" />
        </div>
      </section>
      <section className="flex items-center justify-center gap-4">
        <ShoppingCartIcon className="size-6" />
        <Switch />

        <AddProductDialog />
      </section>
    </header>
  )
}
