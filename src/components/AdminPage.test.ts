import { describe, expect, it } from 'vitest'
import { priceToKurus, productSlug } from './AdminPage'

describe('yönetim formu veri doğrulaması', () => {
  it('Türkçe ve noktalı fiyat girişlerini aynı kuruşa çevirir', () => {
    expect(priceToKurus('1299,50')).toBe(129950)
    expect(priceToKurus('1299.50')).toBe(129950)
    expect(priceToKurus('1299,5')).toBe(129950)
  })

  it('geçersiz ya da sıfır fiyatı reddeder', () => {
    expect(priceToKurus('0')).toBeNull()
    expect(priceToKurus('12,345')).toBeNull()
    expect(priceToKurus('abc')).toBeNull()
  })

  it('Türkçe ürün adından geçerli adres kimliği üretir', () => {
    expect(productSlug('stationery', 'Çizgili Şık Defter')).toBe('stationery-cizgili-sik-defter')
  })
})
