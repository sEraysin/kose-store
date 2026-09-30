import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react'
import type { FormEvent } from 'react'
import type { CartItem } from '../lib/cart'
import { getShipping } from '../lib/cart'
import { getProduct } from '../categories/registry'
import { formatPrice } from '../lib/money'

type Props = { items: CartItem[]; onComplete: () => void }

export function CheckoutPage({ items, onComplete }: Props) {
  const subtotal = items.reduce((sum, item) => sum + (getProduct(item.productId)?.price ?? 0) * item.quantity, 0)
  const total = subtotal + getShipping(subtotal)
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); onComplete() }
  if (!items.length) return <div className="content-width checkout-empty"><h1>Sepetin boş.</h1><a href="#/">Ürünlere dön</a></div>
  return (
    <div className="content-width checkout-page"><div className="breadcrumb"><a href="#/sepet"><ArrowLeft size={14} /> Sepete dön</a></div><div className="page-heading"><span className="eyebrow">SON ADIM</span><h1>Örnek sipariş</h1><p>Bu sayfa yalnızca alışveriş akışını göstermek içindir. Bilgilerin gönderilmez, gerçek ödeme yapılmaz.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><h2>İletişim bilgileri</h2><div className="form-row"><label>Ad soyad<input name="name" autoComplete="name" placeholder="Adın ve soyadın" required minLength={2} /></label><label>E-posta<input name="email" type="email" autoComplete="email" placeholder="ornek@eposta.com" required /></label></div><h2>Teslimat adresi</h2><label>Adres<input name="address" autoComplete="street-address" placeholder="Mahalle, sokak ve kapı numarası" required minLength={8} /></label><div className="form-row"><label>Şehir<input name="city" autoComplete="address-level1" placeholder="Şehir" required /></label><label>Posta kodu<input name="postal" autoComplete="postal-code" inputMode="numeric" placeholder="Posta kodu" required /></label></div><div className="demo-notice"><LockKeyhole size={18} /><span>Bu bir demo. Yazdığın bilgiler kaydedilmez veya gönderilmez.</span></div><button className="primary-button" type="submit">Örnek siparişi tamamla <ArrowRight size={18} /></button></form><aside className="cart-summary"><h2>Özet</h2>{items.map((item) => { const product = getProduct(item.productId); return product && <div key={item.productId}><span>{product.name} × {item.quantity}</span><strong>{formatPrice(product.price * item.quantity)}</strong></div> })}<div><span>Kargo</span><strong>{getShipping(subtotal) ? formatPrice(getShipping(subtotal)) : 'Ücretsiz'}</strong></div><div className="summary-total"><span>Toplam</span><strong>{formatPrice(total)}</strong></div></aside></div></div>
  )
}
