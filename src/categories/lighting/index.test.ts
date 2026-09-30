import { describe, expect, it } from 'vitest'
import { category } from './index'

describe('lighting category sample catalog', () => {
  it('uses its own category ID and unique category-prefixed product IDs', () => {
    expect(category.id).toBe('lighting')
    const ids = category.products.map((product) => product.id)

    expect(category.products.length).toBeGreaterThanOrEqual(3)
    expect(ids.every((id) => id.startsWith('lighting-'))).toBe(true)
    expect(new Set(ids).size).toBe(ids.length)
    expect(category.products.every((product) => product.categoryId === category.id)).toBe(true)
  })

  it('provides a positive TRY price and complete measurements for every product', () => {
    expect(category.products.every((product) => Number.isFinite(product.price) && product.price > 0)).toBe(
      true,
    )
    expect(category.products.every((product) => product.dimensions.trim().length > 0)).toBe(true)
    expect(category.products.every((product) => product.description.trim().length > 0)).toBe(true)
  })

  it('points each product and gallery entry to the lighting image path', () => {
    for (const product of category.products) {
      const images = [product.image, ...product.gallery]

      expect(product.image).toMatch(/^\/images\/lighting\/[\w-]+\.png$/)
      expect(product.gallery.length).toBeGreaterThanOrEqual(2)
      expect(new Set(product.gallery).size).toBe(product.gallery.length)
      expect(product.gallery).toContain(product.image)

      for (const image of images) {
        expect(image).toMatch(/^\/images\/lighting\/[\w-]+\.png$/)
      }
    }
  })

  it('keeps color and material filter options aligned with the product data', () => {
    expect(category.filters.map((facet) => facet.field).sort()).toEqual(['color', 'material'])

    for (const facet of category.filters) {
      const productValues = category.products.map((product) => product[facet.field])

      expect(new Set(facet.options).size).toBe(facet.options.length)
      expect(new Set(facet.options)).toEqual(new Set(productValues))
    }
  })
})
