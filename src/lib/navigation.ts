import type { CategoryId } from '../categories/types'

export type Route =
  | { type: 'home' }
  | { type: 'category'; id: CategoryId }
  | { type: 'product'; id: string }
  | { type: 'search'; query: string }
  | { type: 'cart' }
  | { type: 'checkout' }
  | { type: 'confirmation' }
  | { type: 'admin' }

const categoryIds: CategoryId[] = ['lighting', 'organizers', 'stationery', 'accessories']

export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#\/?/, '')
  if (!path) return { type: 'home' }
  if (path === 'sepet') return { type: 'cart' }
  if (path === 'odeme') return { type: 'checkout' }
  if (path === 'tesekkurler') return { type: 'confirmation' }
  if (path === 'yonetim') return { type: 'admin' }
  if (path.startsWith('kategori/')) {
    const id = path.slice('kategori/'.length)
    if (categoryIds.includes(id as CategoryId)) return { type: 'category', id: id as CategoryId }
  }
  if (path.startsWith('urun/')) return { type: 'product', id: decodeURIComponent(path.slice('urun/'.length)) }
  if (path.startsWith('ara/')) return { type: 'search', query: decodeURIComponent(path.slice('ara/'.length)) }
  return { type: 'home' }
}
