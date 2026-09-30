export type CategoryId = 'lighting' | 'organizers' | 'stationery' | 'accessories'

export type Product = {
  id: string
  categoryId: CategoryId
  name: string
  shortDescription: string
  description: string
  price: number
  image: string
  gallery: string[]
  color: string
  material: string
  dimensions: string
  detail: string
  badge?: string
  stockQuantity?: number
}

export type FilterFacet = {
  label: string
  field: 'color' | 'material'
  options: string[]
}

export type Category = {
  id: CategoryId
  name: string
  eyebrow: string
  headline: string
  description: string
  image: string
  products: Product[]
  filters: FilterFacet[]
}
