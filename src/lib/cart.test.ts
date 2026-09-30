import { describe, expect, it } from 'vitest'
import { addToCart, getShipping, updateQuantity } from './cart'

describe('sepet hesapları', () => {
  it('aynı ürünü tekrar ekleyince adedi artırır', () => {
    expect(addToCart(addToCart([], 'lighting-kora'), 'lighting-kora')).toEqual([{ productId: 'lighting-kora', quantity: 2 }])
  })

  it('adet sıfır olduğunda ürünü kaldırır', () => {
    expect(updateQuantity([{ productId: 'lighting-kora', quantity: 2 }], 'lighting-kora', 0)).toEqual([])
  })

  it('kargo eşiğini doğru hesaplar', () => {
    expect(getShipping(899)).toBe(79)
    expect(getShipping(900)).toBe(0)
    expect(getShipping(0)).toBe(0)
  })
})
