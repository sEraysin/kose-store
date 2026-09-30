import type { Category, CategoryId, Product } from './types'
import { category as lighting } from './lighting'
import { category as organizers } from './organizers'
import { category as stationery } from './stationery'
import { category as accessories } from './accessories'

export const categories: Category[] = [lighting, organizers, stationery, accessories]

export function getCategory(id: CategoryId): Category | undefined {
  return categories.find((category) => category.id === id)
}

export function getProduct(id: string): Product | undefined {
  return categories.flatMap((category) => category.products).find((product) => product.id === id)
}
