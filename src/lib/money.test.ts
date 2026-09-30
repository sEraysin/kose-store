import { describe, expect, it } from 'vitest'
import { formatPrice } from './money'

describe('formatPrice', () => {
  it('fiyatı Türk lirası olarak gösterir', () => {
    expect(formatPrice(1250)).toContain('1.250')
    expect(formatPrice(1250)).toContain('₺')
  })

  it('geçersiz tutarları reddeder', () => {
    expect(() => formatPrice(-1)).toThrow(RangeError)
    expect(() => formatPrice(Number.NaN)).toThrow(RangeError)
  })
})
