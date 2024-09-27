import { timestamp } from 'drizzle-orm/pg-core'
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core'

export const User = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
})

export const Category = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
})

export const Product = pgTable('products', {
  id: serial('id').primaryKey(),
  costPrice: integer('cost_price').notNull(),
  salePrice: integer('sale_price').notNull(),
  description: text('description').notNull(),
  image_url: text('image'),
  stock_quantity: integer('stock_quantity').notNull(),
  categoryId: serial('category_id').references(() => Category.id),
})

export const Customer = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phoneNumber: text('phone_number'),
  cpf: text('cpf').unique(),
})

export const Sale = pgTable('sales', {
  id: serial('id').primaryKey(),
  sale_date: timestamp('sale_date', { withTimezone: true }).notNull(),
  customerId: serial('customer_id').references(() => Customer.id),
})

export const SalesItems = pgTable('sales_items', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => Product.id),
  quantity: integer('quantity').notNull(),
  saleId: serial('sale_id').references(() => Sale.id),
})
