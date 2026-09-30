import type { Category, CategoryId, Product } from './types'
import { category as lighting } from './lighting'
import { category as organizers } from './organizers'
import { category as stationery } from './stationery'
import { category as accessories } from './accessories'

export const categories: Category[] = [lighting, organizers, stationery, accessories]

export function getCategory(id: CategoryId, catalog: Category[] = categories): Category | undefined {
  return catalog.find((category) => category.id === id)
}

export function getProduct(id: string, catalog: Category[] = categories): Product | undefined {
  return catalog.flatMap((category) => category.products).find((product) => product.id === id)
}
