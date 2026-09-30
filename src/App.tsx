import { ArrowRight, Camera, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'

const categoryTiles = [
  { id: 'lighting', name: 'Aydınlatma', sub: 'Işığın en güzel hâli', mark: '01', className: 'tile-lighting' },
  { id: 'organizers', name: 'Masa düzeni', sub: 'Her şey yerli yerinde', mark: '02', className: 'tile-organizers' },
  { id: 'stationery', name: 'Kırtasiye', sub: 'Yeni fikirlere alan aç', mark: '03', className: 'tile-stationery' },
  { id: 'accessories', name: 'Aksesuarlar', sub: 'Küçük, iyi düşünülmüş', mark: '04', className: 'tile-accessories' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="site-shell">
      <div className="announcement">900 ₺ ve üzeri alışverişlerde kargo bizden <span aria-hidden="true">↗</span></div>
      <header className="site-header">
        <button className="icon-button mobile-menu" type="button" aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <a className="brand" href="#top" aria-label="KÖŞE ana sayfa">KÖŞE<span className="brand-dot">.</span></a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Ürün kategorileri">
          {categoryTiles.map((tile) => <a key={tile.id} href={`#${tile.id}`} onClick={() => setMenuOpen(false)}>{tile.name}</a>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" aria-label="Ürün ara"><Search size={20} strokeWidth={1.75} /></button>
          <button className="icon-button bag-button" type="button" aria-label="Sepeti aç"><ShoppingBag size={20} strokeWidth={1.75} /><span>0</span></button>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-image" />
          <div className="hero-content">
            <span className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> DAHA İYİ BİR GÜNÜN KÖŞESİ</span>
            <h1 id="hero-heading">Alan senin.<br /><em>Hikâye senin.</em></h1>
            <p>İlham veren masalar, iyi düşünülmüş küçük detaylarla başlar. Kendine ait bir köşe kurmanın tam zamanı.</p>
            <a className="primary-button" href="#kategoriler">Koleksiyonu keşfet <ArrowRight size={18} /></a>
          </div>
          <div className="hero-index"><span>01</span> / 04 <i /></div>
          <div className="hero-side-note">KÖŞE KOLEKSİYONU · 2026</div>
        </section>

        <section className="intro-strip" aria-label="Mağaza yaklaşımı">
          <span>İYİ TASARIM, İYİ HİSSETTİRİR.</span>
          <span className="intro-star" aria-hidden="true">✳</span>
          <span>HER DETAYDA BİRAZ DAHA SEN.</span>
          <span className="intro-star" aria-hidden="true">✳</span>
          <span>MASANDA GÜZEL ŞEYLER OLSUN.</span>
        </section>

        <section className="categories-section content-width" id="kategoriler" aria-labelledby="categories-heading">
          <div className="section-heading">
            <div><span className="eyebrow">KÖŞE'Yİ KEŞFET</span><h2 id="categories-heading">Her köşenin<br /><em>bir hikâyesi var.</em></h2></div>
            <p>Günlük rutinine eşlik eden, bakınca da kullanınca da iyi hissettiren parçalar.</p>
          </div>
          <div className="category-grid">
            {categoryTiles.map((tile) => (
              <a className={`category-tile ${tile.className}`} id={tile.id} key={tile.id} href={`#/kategori/${tile.id}`}>
                <span className="tile-number">{tile.mark} / 04</span>
                <div className="tile-bottom"><div><span>{tile.sub}</span><h3>{tile.name}</h3></div><span className="tile-arrow"><ArrowRight size={20} /></span></div>
              </a>
            ))}
          </div>
        </section>

        <section className="manifesto content-width">
          <span className="eyebrow">KÜÇÜK BİR NOT</span>
          <p>En iyi fikirler, <em>kendin gibi hissettiğin</em> yerlerde doğar.</p>
          <span className="manifesto-icon" aria-hidden="true">✳</span>
        </section>

        <section className="newsletter" aria-labelledby="newsletter-heading">
          <div className="content-width newsletter-inner">
            <div><span className="eyebrow">KÖŞE'DEN HABERLER</span><h2 id="newsletter-heading">Güzel şeylerden<br /><em>haberin olsun.</em></h2></div>
            <p>Yeni ürünler ve küçük ilhamlar için bizi takip et.</p>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram'da gör <Camera size={19} /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="content-width footer-inner"><div><div className="brand footer-brand">KÖŞE<span className="brand-dot">.</span></div><p>Çalışma alanına iyi gelen şeyler.</p></div><div className="footer-links"><a href="#kategoriler">Kategoriler</a><a href="#top">Başa dön</a><span>Örnek mağaza · Gerçek sipariş alınmaz</span></div></div></footer>
    </div>
  )
}
