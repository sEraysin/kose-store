import { Search } from 'lucide-react'
import type { Category } from '../categories/types'
import { ProductCard } from './ProductCard'

type Props = { query: string; categories: Category[]; onAdd: (id: string) => void }

export function SearchPage({ query, categories, onAdd }: Props) {
  const normalized = query.toLocaleLowerCase('tr-TR')
  const products = categories.flatMap((category) => category.products).filter((product) => [product.name, product.shortDescription, product.description, product.color, product.material].some((text) => text.toLocaleLowerCase('tr-TR').includes(normalized)))
  return <div className="content-width search-page"><div className="page-heading"><span className="eyebrow">ARAMA SONUÇLARI</span><h1>“{query}”</h1><p>{products.length} ürün bulundu.</p></div>{products.length ? <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div> : <div className="empty-state"><Search size={32} /><h2>Aradığını bulamadık.</h2><p>Başka bir ürün adı, renk veya malzeme deneyebilirsin.</p><a href="#/">Kategorilere dön</a></div>}</div>
}
