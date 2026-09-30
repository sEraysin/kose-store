export type CartItem = { productId: string; quantity: number }

export function addToCart(items: CartItem[], productId: string): CartItem[] {
  const existing = items.find((item) => item.productId === productId)
  if (existing) return items.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)
  return [...items, { productId, quantity: 1 }]
}

export function updateQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
  if (!Number.isInteger(quantity)) throw new RangeError('Adet tam sayı olmalı.')
  if (quantity <= 0) return items.filter((item) => item.productId !== productId)
  return items.map((item) => item.productId === productId ? { ...item, quantity } : item)
}

export function getShipping(subtotal: number): number {
  return subtotal === 0 || subtotal >= 900 ? 0 : 79
}

export function readCart(): CartItem[] {
  try {
    const value = JSON.parse(localStorage.getItem('kose-cart') || '[]') as unknown
    if (!Array.isArray(value)) return []
    return value.filter((item): item is CartItem =>
      typeof item === 'object' && item !== null &&
      typeof item.productId === 'string' &&
      Number.isInteger(item.quantity) && item.quantity > 0,
    )
  } catch {
    return []
  }
}
