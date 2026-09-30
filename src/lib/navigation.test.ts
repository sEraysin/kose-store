import { describe, expect, it } from 'vitest'
import { parseRoute } from './navigation'

describe('sayfa adresleri', () => {
  it('geçerli kategori bağlantısını çözer', () => {
    expect(parseRoute('#/kategori/lighting')).toEqual({ type: 'category', id: 'lighting' })
  })

  it('bilinmeyen adreste ana sayfaya döner', () => {
    expect(parseRoute('#/kategori/bilinmeyen')).toEqual({ type: 'home' })
  })
})
