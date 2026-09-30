import { describe, expect, it } from 'vitest'
import { catalogWithProducts, rowToProduct, type ProductRow } from './catalog'

const row: ProductRow = {
  id: 'lighting-test-lamp', category_id: 'lighting', name: 'Test lambası',
  short_description: 'Kısa açıklama', description: 'Uzun açıklama',
  price_kurus: 124950, image_url: '/images/lighting/test-lamp.webp',
  gallery: [], color: 'Mavi', material: 'Metal', dimensions: '30 cm',
  detail: 'Örnek ayrıntı', badge: null, stock_quantity: 4,
  status: 'published', sort_order: 0,
}

describe('dinamik katalog dönüşümü', () => {
  it('kuruş fiyatı mağazadaki lira fiyatına dönüştürür', () => {
    expect(rowToProduct(row).price).toBe(1249.5)
    expect(rowToProduct(row).stockQuantity).toBe(4)
  })

  it('filtre seçeneklerini yüklenen ürünlerden oluşturur', () => {
    const lighting = catalogWithProducts([rowToProduct(row)]).find((category) => category.id === 'lighting')
    expect(lighting?.products).toHaveLength(1)
    expect(lighting?.filters).toEqual([
      { label: 'Renk', field: 'color', options: ['Mavi'] },
      { label: 'Malzeme', field: 'material', options: ['Metal'] },
    ])
  })
})
