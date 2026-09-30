import { ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react'
import type { CartItem } from '../lib/cart'
import { getShipping } from '../lib/cart'
import { formatPrice } from '../lib/money'
import { getCategory, getProduct } from '../categories/registry'

type Props = { items: CartItem[]; onQuantity: (id: string, quantity: number) => void }

export function CartPage({ items, onQuantity }: Props) {
  const lines = items.map((item) => ({ item, product: getProduct(item.productId) })).filter((line) => line.product !== undefined)
  const subtotal = lines.reduce((sum, line) => sum + line.product!.price * line.item.quantity, 0)
  const shipping = getShipping(subtotal)
  return (
    <div className="content-width cart-page"><div className="breadcrumb"><a href="#/"><ArrowLeft size={14} /> Alışverişe dön</a></div><div className="page-heading"><span className="eyebrow">ALIŞVERİŞİN</span><h1>Sepetin</h1><p>{lines.length ? `${lines.length} farklı ürün seçtin.` : 'Sepetin şu anda boş.'}</p></div>
      {lines.length ? <div className="cart-layout"><div className="cart-lines">{lines.map(({ item, product }) => product && <article className="cart-line" key={item.productId}><a href={`#/urun/${product.id}`}><img src={product.image} alt={product.name} /></a><div className="cart-line-main"><span>{getCategory(product.categoryId)?.name}</span><a href={`#/urun/${product.id}`}><h2>{product.name}</h2></a><p>{product.color} · {product.material}</p><button type="button" className="remove-line" onClick={() => onQuantity(item.productId, 0)}><Trash2 size={14} /> Kaldır</button></div><div className="cart-line-end"><strong>{formatPrice(product.price * item.quantity)}</strong><div className="quantity-control"><button type="button" aria-label={`${product.name} adedini azalt`} onClick={() => onQuantity(item.productId, item.quantity - 1)}><Minus size={15} /></button><span>{item.quantity}</span><button type="button" aria-label={`${product.name} adedini artır`} onClick={() => onQuantity(item.productId, item.quantity + 1)}><Plus size={15} /></button></div></div></article>)}</div><aside className="cart-summary"><h2>Sipariş özeti</h2><div><span>Ara toplam</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Kargo</span><strong>{shipping ? formatPrice(shipping) : 'Ücretsiz'}</strong></div><div className="summary-total"><span>Toplam</span><strong>{formatPrice(subtotal + shipping)}</strong></div><p>{shipping ? `${formatPrice(900 - subtotal)} daha ekleyerek ücretsiz kargo kazan.` : 'Ücretsiz kargo hakkın hazır.'}</p><a className="primary-button" href="#/odeme">Örnek siparişe devam et <ArrowRight size={17} /></a><small>Bu demo gerçek ödeme veya sipariş oluşturmaz.</small></aside></div> : <div className="empty-cart"><span aria-hidden="true">✳</span><h2>Masanda yer var.</h2><p>Sevdiğin parçaları keşfedip buraya ekleyebilirsin.</p><a className="primary-button" href="#/">Kategorileri keşfet <ArrowRight size={17} /></a></div>}
    </div>
  )
}
