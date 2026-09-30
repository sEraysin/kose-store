const formatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })

export function formatPrice(amount: number): string {
  if (!Number.isFinite(amount) || amount < 0) throw new RangeError('Tutar sıfır veya pozitif olmalı.')
  return formatter.format(amount)
}
