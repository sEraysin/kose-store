import { describe, expect, it } from 'vitest'
import { category } from './index'

describe('Kırtasiye kategorisi', () => {
  it('kategori kimliğini ve benzersiz, pozitif fiyatlı ürünleri sunar', () => {
    expect(category.id).toBe('stationery')
    expect(category.products.length).toBeGreaterThanOrEqual(3)

    const productIds = category.products.map((product) => product.id)
    expect(new Set(productIds).size).toBe(productIds.length)

    for (const product of category.products) {
      expect(product.id.startsWith('stationery-')).toBe(true)
      expect(product.categoryId).toBe('stationery')
      expect(Number.isFinite(product.price) && product.price > 0).toBe(true)
    }
  })

  it('ürün ve galeri görselleri için kategoriye ait yerel yollar kullanır', () => {
    for (const product of category.products) {
      expect(product.image).toMatch(/^\/images\/stationery\/[a-z0-9-]+\.png$/)
      expect(product.gallery.length).toBeGreaterThanOrEqual(2)
      expect(product.gallery).toContain(product.image)
      expect(new Set(product.gallery).size).toBe(product.gallery.length)

      for (const imagePath of product.gallery) {
        expect(imagePath).toMatch(/^\/images\/stationery\/[a-z0-9-]+\.png$/)
      }
    }
  })

  it('renk ve malzeme filtrelerinin her seçeneği ürün verisinde bulunur', () => {
    expect(category.filters.map((filter) => filter.field)).toEqual(['color', 'material'])

    for (const filter of category.filters) {
      const productValues = new Set(category.products.map((product) => product[filter.field]))

      expect(filter.options.length).toBe(new Set(filter.options).size)
      expect(new Set(filter.options)).toEqual(productValues)
      for (const option of filter.options) {
        expect(category.products.some((product) => product[filter.field] === option)).toBe(true)
      }
    }
  })
})
