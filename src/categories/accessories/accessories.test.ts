import { describe, expect, it } from 'vitest'
import { category } from './index'

describe('accessories category contract', () => {
  it('has the assigned category identity and unique prefixed product IDs', () => {
    expect(category.id).toBe('accessories')
    expect(category.products.length).toBeGreaterThanOrEqual(3)

    const ids = category.products.map((product) => product.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.every((id) => id.startsWith('accessories-'))).toBe(true)
    expect(category.products.every((product) => product.categoryId === category.id)).toBe(true)
  })

  it('uses positive TRY prices and category-local image paths', () => {
    for (const product of category.products) {
      expect(product.price).toBeGreaterThan(0)
      expect(product.image).toMatch(/^\/images\/accessories\/.+\.png$/)
      expect(product.gallery.length).toBeGreaterThanOrEqual(2)
      expect(product.gallery).toContain(product.image)
      expect(new Set(product.gallery).size).toBe(product.gallery.length)

      for (const image of [product.image, ...product.gallery]) {
        expect(image).toMatch(/^\/images\/accessories\/.+\.png$/)
      }
    }
  })

  it('offers only color and material facets whose options map to product data', () => {
    expect(category.filters.map((filter) => filter.field)).toEqual(['color', 'material'])

    for (const filter of category.filters) {
      const values = category.products.map((product) => product[filter.field])
      expect(new Set(filter.options).size).toBe(filter.options.length)
      expect(filter.options.every((option) => values.includes(option))).toBe(true)
      expect(values.every((value) => filter.options.includes(value))).toBe(true)
    }
  })
})
