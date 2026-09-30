import { ArrowLeft, Check, Minus, Plus, RotateCcw, Truck } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '../categories/types'
import { formatPrice } from '../lib/money'

type Props = { product: Product; categoryName: string; onAdd: (id: string) => void }

export function ProductPage({ product, categoryName, onAdd }: Props) {
  const [activeImage, setActiveImage] = useState(product.image)
  const [quantity, setQuantity] = useState(1)
  const images = [product.image, ...product.gallery.filter((image) => image !== product.image)]

  return (
    <div className="content-width product-page">
      <div className="breadcrumb"><a href={`#/kategori/${product.categoryId}`}><ArrowLeft size={14} /> {categoryName}</a><span>/</span><span>{product.name}</span></div>
      <div className="product-detail-layout">
        <div className="product-gallery"><div className="product-main-image"><img src={activeImage} alt={`${product.name} - ürün görünümü`} /></div><div className="product-thumbnails">{images.map((image, index) => <button type="button" key={`${image}-${index}`} className={image === activeImage ? 'is-active' : ''} onClick={() => setActiveImage(image)} aria-label={`${product.name} görsel ${index + 1}`}><img src={image} alt="" /></button>)}</div></div>
        <div className="product-info"><span className="eyebrow">{categoryName.toLocaleUpperCase('tr-TR')}</span>{product.badge && <span className="detail-badge">{product.badge}</span>}<h1>{product.name}</h1><p className="product-lede">{product.shortDescription}</p><div className="detail-price">{formatPrice(product.price)}</div><p className="product-description">{product.description}</p>
          <div className="product-attributes"><div><span>Renk</span><strong>{product.color}</strong></div><div><span>Malzeme</span><strong>{product.material}</strong></div><div><span>Ölçü</span><strong>{product.dimensions}</strong></div></div>
          <div className="product-buy"><div className="quantity-control"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Adedi azalt"><Minus size={16} /></button><span aria-live="polite">{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Adedi artır"><Plus size={16} /></button></div><button className="primary-button" type="button" onClick={() => { for (let i = 0; i < quantity; i++) onAdd(product.id) }}>Sepete ekle <Plus size={18} /></button></div>
          <div className="delivery-notes"><p><Truck size={18} /> 900 ₺ ve üzeri alışverişlerde ücretsiz kargo</p><p><RotateCcw size={18} /> Örnek mağaza: iade koşulları temsilîdir</p><p><Check size={18} /> Gerçek ödeme veya sipariş alınmaz</p></div>
        </div>
      </div>
    </div>
  )
}
