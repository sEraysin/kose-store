import { categories as sampleCategories } from '../categories/registry'
import type { Category, Product } from '../categories/types'
import { supabase } from './supabase'

export type ProductRow = {
  id: string
  category_id: Product['categoryId']
  name: string
  short_description: string
  description: string
  price_kurus: number
  image_url: string
  gallery: string[]
  color: string
  material: string
  dimensions: string
  detail: string
  badge: string | null
  stock_quantity: number
  status: 'draft' | 'published'
  sort_order: number
}

export function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    shortDescription: row.short_description,
    description: row.description,
    price: row.price_kurus / 100,
    image: row.image_url,
    gallery: row.gallery,
    color: row.color,
    material: row.material,
    dimensions: row.dimensions,
    detail: row.detail,
    badge: row.badge ?? undefined,
    stockQuantity: row.stock_quantity,
  }
}

export function catalogWithProducts(products: Product[]): Category[] {
  return sampleCategories.map((category) => {
    const ownProducts = products.filter((product) => product.categoryId === category.id)
    return {
      ...category,
      products: ownProducts,
      filters: [
        { label: 'Renk', field: 'color', options: [...new Set(ownProducts.map((product) => product.color))] },
        { label: 'Malzeme', field: 'material', options: [...new Set(ownProducts.map((product) => product.material))] },
      ],
    }
  })
}

export async function loadCatalog(): Promise<Category[]> {
  if (!supabase) return sampleCategories
  const { data, error } = await supabase
    .from('products')
    .select('id,category_id,name,short_description,description,price_kurus,image_url,gallery,color,material,dimensions,detail,badge,stock_quantity,status,sort_order')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw new Error(`Ürünler yüklenemedi: ${error.message}`)
  return catalogWithProducts((data as ProductRow[]).map(rowToProduct))
}
