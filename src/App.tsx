import { ArrowRight, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { categories, getCategory, getProduct } from './categories/registry'
import type { CategoryId } from './categories/types'
import { CartPage } from './components/CartPage'
import { CategoryPage } from './components/CategoryPage'
import { CheckoutPage } from './components/CheckoutPage'
import { ProductCard } from './components/ProductCard'
import { ProductPage } from './components/ProductPage'
import { SearchPage } from './components/SearchPage'
import { addToCart, readCart, updateQuantity, type CartItem } from './lib/cart'
import { parseRoute, type Route } from './lib/navigation'

const tiles: { id: CategoryId; name: string; sub: string; className: string }[] = [
  { id: 'lighting', name: 'Aydınlatma', sub: 'Işığın en güzel hâli', className: 'tile-lighting' },
  { id: 'organizers', name: 'Masa düzeni', sub: 'Her şey yerli yerinde', className: 'tile-organizers' },
  { id: 'stationery', name: 'Kırtasiye', sub: 'Yeni fikirlere alan aç', className: 'tile-stationery' },
  { id: 'accessories', name: 'Aksesuarlar', sub: 'Küçük, iyi düşünülmüş', className: 'tile-accessories' },
]

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash))
  const [cart, setCart] = useState<CartItem[]>(readCart)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [notice, setNotice] = useState('')
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    function changeRoute() { setRoute(parseRoute(window.location.hash)); setMenuOpen(false); setSearchOpen(false); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', changeRoute)
    return () => window.removeEventListener('hashchange', changeRoute)
  }, [])
  useEffect(() => { localStorage.setItem('kose-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { if (!notice) return; const timeout = window.setTimeout(() => setNotice(''), 2800); return () => window.clearTimeout(timeout) }, [notice])

  function addItem(id: string) {
    setCart((items) => addToCart(items, id))
    setNotice('Ürün sepetine eklendi')
  }

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = searchText.trim()
    if (query) window.location.hash = `#/ara/${encodeURIComponent(query)}`
  }

  function content() {
    if (route.type === 'home') return <HomePage onAdd={addItem} />
    if (route.type === 'category') { const category = getCategory(route.id); return category ? <CategoryPage key={category.id} category={category} onAdd={addItem} /> : <MissingPage /> }
    if (route.type === 'product') { const product = getProduct(route.id); return product ? <ProductPage key={product.id} product={product} categoryName={getCategory(product.categoryId)?.name ?? ''} onAdd={addItem} /> : <MissingPage /> }
    if (route.type === 'cart') return <CartPage items={cart} onQuantity={(id, quantity) => setCart((items) => updateQuantity(items, id, quantity))} />
    if (route.type === 'checkout') return <CheckoutPage items={cart} onComplete={() => { setCart([]); window.location.hash = '#/tesekkurler' }} />
    if (route.type === 'search') return <SearchPage query={route.query} onAdd={addItem} />
    return <div className="content-width confirmation"><span aria-hidden="true">✳</span><h1>Güzel seçim!</h1><p>Örnek sipariş akışı tamamlandı. Bu bir demo olduğu için ödeme alınmadı ve sipariş oluşturulmadı.</p><a className="primary-button" href="#/">Mağazaya dön <ArrowRight size={18} /></a></div>
  }

  return (
    <div className="site-shell">
      <div className="announcement">900 ₺ ve üzeri alışverişlerde kargo bizden <span aria-hidden="true">↗</span></div>
      <header className="site-header">
        <button className="icon-button mobile-menu" type="button" aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        <a className="brand" href="#/" aria-label="KÖŞE ana sayfa">KÖŞE<span className="brand-dot">.</span></a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Ürün kategorileri">{tiles.map((tile) => <a key={tile.id} href={`#/kategori/${tile.id}`} onClick={() => setMenuOpen(false)}>{tile.name}</a>)}</nav>
        <div className="header-actions"><button className="icon-button" type="button" aria-label={searchOpen ? 'Aramayı kapat' : 'Ürün ara'} onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? <X size={20} /> : <Search size={20} strokeWidth={1.75} />}</button><a className="icon-button bag-button" href="#/sepet" aria-label={`Sepet, ${cartCount} ürün`}><ShoppingBag size={20} strokeWidth={1.75} /><span>{cartCount}</span></a></div>
        {searchOpen && <form className="search-bar" role="search" onSubmit={search}><label htmlFor="site-search">Ne arıyorsun?</label><input id="site-search" autoFocus value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Lamba, defter, düzenleyici..." /><button type="submit" aria-label="Ara"><Search size={20} /></button></form>}
      </header>
      {notice && <div className="cart-toast" role="status">{notice} <a href="#/sepet">Sepete git →</a></div>}
      <main>{content()}</main>
      <footer className="site-footer"><div className="content-width footer-inner"><div><a className="brand footer-brand" href="#/">KÖŞE<span className="brand-dot">.</span></a><p>Çalışma alanına iyi gelen şeyler.</p></div><div className="footer-links"><a href="#/">Ana sayfa</a><a href="#/sepet">Sepet</a><span>Örnek mağaza · Gerçek sipariş alınmaz</span></div></div></footer>
    </div>
  )
}

function HomePage({ onAdd }: { onAdd: (id: string) => void }) {
  const featured = categories.flatMap((category) => category.products.slice(0, 1))
  return <>
    <section className="hero" aria-labelledby="hero-heading"><div className="hero-image" /><div className="hero-content"><span className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> DAHA İYİ BİR GÜNÜN KÖŞESİ</span><h1 id="hero-heading">Alan senin.<br /><em>Hikâye senin.</em></h1><p>İlham veren masalar, iyi düşünülmüş küçük detaylarla başlar. Kendine ait bir köşe kurmanın tam zamanı.</p><button className="primary-button" type="button" onClick={() => document.getElementById('kategoriler')?.scrollIntoView({ behavior: 'smooth' })}>Koleksiyonu keşfet <ArrowRight size={18} /></button></div><div className="hero-index"><span>01</span> / 04 <i /></div><div className="hero-side-note">KÖŞE KOLEKSİYONU · 2026</div></section>
    <section className="intro-strip" aria-label="Mağaza yaklaşımı"><span>İYİ TASARIM, İYİ HİSSETTİRİR.</span><span className="intro-star" aria-hidden="true">✳</span><span>HER DETAYDA BİRAZ DAHA SEN.</span><span className="intro-star" aria-hidden="true">✳</span><span>MASANDA GÜZEL ŞEYLER OLSUN.</span></section>
    <section className="categories-section content-width" id="kategoriler" aria-labelledby="categories-heading"><div className="section-heading"><div><span className="eyebrow">KÖŞE'Yİ KEŞFET</span><h2 id="categories-heading">Her köşenin<br /><em>bir hikâyesi var.</em></h2></div><p>Günlük rutinine eşlik eden, bakınca da kullanınca da iyi hissettiren parçalar.</p></div><div className="category-grid">{tiles.map((tile, index) => <a className={`category-tile ${tile.className}`} style={getCategory(tile.id) ? { backgroundImage: `url(${getCategory(tile.id)!.image})` } : undefined} key={tile.id} href={`#/kategori/${tile.id}`}><span className="tile-number">0{index + 1} / 04</span><div className="tile-bottom"><div><span>{tile.sub}</span><h3>{tile.name}</h3></div><span className="tile-arrow"><ArrowRight size={20} /></span></div></a>)}</div></section>
    {featured.length > 0 && <section className="featured-section content-width"><div className="section-heading"><div><span className="eyebrow">KÖŞE'DEN SEÇKİLER</span><h2>Masana iyi<br /><em>gelecek parçalar.</em></h2></div><p>Her kategoriden özenle seçilmiş bir başlangıç.</p></div><div className="product-grid">{featured.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div></section>}
    <section className="manifesto content-width"><span className="eyebrow">KÜÇÜK BİR NOT</span><p>En iyi fikirler, <em>kendin gibi hissettiğin</em> yerlerde doğar.</p><span className="manifesto-icon" aria-hidden="true">✳</span></section>
    <section className="newsletter" aria-labelledby="approach-heading"><div className="content-width newsletter-inner"><div><span className="eyebrow">KÖŞE YAKLAŞIMI</span><h2 id="approach-heading">Az ama<br /><em>tam yerinde.</em></h2></div><p>Ölçüsü, malzemesi ve kullanım amacı anlaşılır ürünler seçmeyi kolaylaştırır.</p><a href="#/kategori/lighting">Keşfet <ArrowRight size={19} /></a></div></section>
  </>
}

function MissingPage() { return <div className="content-width missing-page"><h1>Bu sayfayı bulamadık.</h1><p>Aradığın ürün veya kategori artık burada olmayabilir.</p><a href="#/">Ana sayfaya dön</a></div> }
