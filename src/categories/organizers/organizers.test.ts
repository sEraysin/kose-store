import { describe, expect, it } from 'vitest'
import { category } from './index'

describe('organizers category', () => {
  it('uses the assigned category identity and includes at least three products', () => {
    expect(category.id).toBe('organizers')
    expect(category.products.length).toBeGreaterThanOrEqual(3)
  })

  it('has unique category-prefixed product IDs and positive TRY prices', () => {
    const ids = category.products.map((product) => product.id)

    expect(new Set(ids).size).toBe(ids.length)
    for (const product of category.products) {
      expect(product.id).toMatch(/^organizers-/)
      expect(product.categoryId).toBe(category.id)
      expect(Number.isFinite(product.price)).toBe(true)
      expect(product.price).toBeGreaterThan(0)
    }
  })

  it('uses category-local image paths for each product and gallery', () => {
    expect(category.image).toMatch(/^\/images\/organizers\//)

    for (const product of category.products) {
      expect(product.image).toMatch(/^\/images\/organizers\//)
      expect(product.gallery.length).toBeGreaterThan(0)
      expect(product.gallery).toContain(product.image)
      for (const image of product.gallery) {
        expect(image).toMatch(/^\/images\/organizers\//)
      }
    }
  })

  it('keeps every color and material filter option in sync with product data', () => {
    for (const facet of category.filters) {
      const productValues = category.products.map((product) => product[facet.field])
      const uniqueProductValues = [...new Set(productValues)]

      expect(new Set(facet.options).size).toBe(facet.options.length)
      expect(facet.options).toEqual(uniqueProductValues)
    }
  })

  it('provides practical dimensions, material, color, and product guidance', () => {
    for (const product of category.products) {
      expect(product.dimensions.length).toBeGreaterThan(10)
      expect(product.material.length).toBeGreaterThan(3)
      expect(product.color.length).toBeGreaterThan(2)
      expect(product.description.length).toBeGreaterThan(40)
      expect(product.detail.length).toBeGreaterThan(40)
    }
  })
})
