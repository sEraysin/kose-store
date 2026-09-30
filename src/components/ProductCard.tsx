import { ArrowUpRight, Plus } from 'lucide-react'
import type { Product } from '../categories/types'
import { formatPrice } from '../lib/money'

type Props = { product: Product; onAdd: (id: string) => void }

export function ProductCard({ product, onAdd }: Props) {
  const soldOut = product.stockQuantity === 0
  return (
    <article className="product-card">
      <div className="product-card-media">
        <a href={`#/urun/${product.id}`} aria-label={`${product.name} ürününü görüntüle`}><img src={product.image} alt={product.name} loading="lazy" /></a>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button type="button" className="quick-add" onClick={() => onAdd(product.id)} disabled={soldOut} aria-label={soldOut ? `${product.name} stokta yok` : `${product.name} sepete ekle`}><Plus size={19} /></button>
      </div>
      <div className="product-card-copy">
        <div><span className="product-card-category">{product.material}</span><a href={`#/urun/${product.id}`}><h3>{product.name} <ArrowUpRight size={15} /></h3></a><p>{product.shortDescription}</p></div>
        <strong>{soldOut ? 'Stokta yok' : formatPrice(product.price)}</strong>
      </div>
    </article>
  )
}
