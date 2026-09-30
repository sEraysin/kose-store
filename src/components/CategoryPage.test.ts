import { describe, expect, it } from 'vitest'
import { filterProducts } from './CategoryPage'
import type { Product } from '../categories/types'

const products = [
  { color: 'Krem', material: 'Seramik' },
  { color: 'Yeşil', material: 'Metal' },
] as Product[]

describe('kategori filtreleri', () => {
  it('renk ve malzemeyi birlikte uygular', () => {
    expect(filterProducts(products, { color: ['Krem'], material: ['Seramik'] })).toHaveLength(1)
    expect(filterProducts(products, { color: ['Krem'], material: ['Metal'] })).toHaveLength(0)
  })
})
