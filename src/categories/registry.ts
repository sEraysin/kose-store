import type { Category, CategoryId, Product } from './types'

// Kategori ajanlarının modülleri incelendikten sonra bu listeye eklenir.
export const categories: Category[] = []

export function getCategory(id: CategoryId): Category | undefined {
  return categories.find((category) => category.id === id)
}

export function getProduct(id: string): Product | undefined {
  return categories.flatMap((category) => category.products).find((product) => product.id === id)
}
