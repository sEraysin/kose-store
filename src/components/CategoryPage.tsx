import { ArrowLeft, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Category, Product } from '../categories/types'
import { ProductCard } from './ProductCard'

type Props = { category: Category; onAdd: (id: string) => void }
type Selected = { color: string[]; material: string[] }

export function filterProducts(products: Product[], selected: Selected): Product[] {
  return products.filter((product) =>
    (selected.color.length === 0 || selected.color.includes(product.color)) &&
    (selected.material.length === 0 || selected.material.includes(product.material)),
  )
}

export function CategoryPage({ category, onAdd }: Props) {
  const [selected, setSelected] = useState<Selected>({ color: [], material: [] })
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const products = useMemo(() => {
    const result = filterProducts(category.products, selected)
    if (sort === 'price-low') return [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') return [...result].sort((a, b) => b.price - a.price)
    return result
  }, [category.products, selected, sort])
  const selectedCount = selected.color.length + selected.material.length

  function toggle(field: 'color' | 'material', value: string) {
    setSelected((current) => ({ ...current, [field]: current[field].includes(value) ? current[field].filter((item) => item !== value) : [...current[field], value] }))
  }

  return (
    <div className="catalog-page">
      <div className="content-width breadcrumb"><a href="#/"><ArrowLeft size={14} /> Ana sayfa</a><span>/</span><span>{category.name}</span></div>
      <section className="category-hero content-width">
        <div className="category-hero-copy"><span className="eyebrow">{category.eyebrow}</span><h1>{category.headline}</h1><p>{category.description}</p><span className="category-count">{category.products.length} özenle seçilmiş parça</span></div>
        <img src={category.image} alt={`${category.name} kategorisinden ürünler`} />
      </section>
      <section className="catalog-content content-width" aria-label={`${category.name} ürünleri`}>
        <div className="catalog-topline"><div><span className="eyebrow">KOLEKSİYON</span><h2>{category.name}</h2></div><div className="catalog-controls"><button className="filter-toggle" type="button" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={17} /> Filtrele {selectedCount > 0 && <b>{selectedCount}</b>}</button><label>Sırala <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Ürünleri sırala"><option value="featured">Önerilen</option><option value="price-low">Fiyat: artan</option><option value="price-high">Fiyat: azalan</option></select></label></div></div>
        <div className="catalog-layout">
          <aside className={`filter-panel ${filtersOpen ? 'is-open' : ''}`} aria-label="Ürün filtreleri"><div className="filter-panel-title"><span>FİLTRELER</span><button type="button" onClick={() => setFiltersOpen(false)} aria-label="Filtreleri kapat"><X size={18} /></button></div>{category.filters.map((facet) => <fieldset key={facet.field}><legend>{facet.label}</legend>{facet.options.map((option) => <label key={option}><input type="checkbox" checked={selected[facet.field].includes(option)} onChange={() => toggle(facet.field, option)} /><span>{option}</span></label>)}</fieldset>)}{selectedCount > 0 && <button className="clear-filters" type="button" onClick={() => setSelected({ color: [], material: [] })}>Tüm filtreleri temizle</button>}</aside>
          <div className="catalog-results">
            {selectedCount > 0 && <div className="active-filters">{(['color', 'material'] as const).flatMap((field) => selected[field].map((value) => <button key={`${field}-${value}`} type="button" onClick={() => toggle(field, value)}>{value} <X size={13} /></button>))}</div>}
            <p className="results-count">{products.length} ürün gösteriliyor</p>
            {products.length ? <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div> : <div className="empty-state"><h3>Bu filtrelerle ürün bulunamadı.</h3><p>Başka bir renk veya malzeme deneyebilirsin.</p><button type="button" onClick={() => setSelected({ color: [], material: [] })}>Filtreleri temizle</button></div>}
          </div>
        </div>
      </section>
    </div>
  )
}
