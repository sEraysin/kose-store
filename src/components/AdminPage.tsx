import { useEffect, useState, type FormEvent } from 'react'
import type { CategoryId } from '../categories/types'
import type { ProductRow } from '../lib/catalog'
import { supabase } from '../lib/supabase'

type Props = { onCatalogChange: () => Promise<void> }
type AdminState = 'checking' | 'login' | 'forbidden' | 'ready'
type ProductDraft = {
  id: string
  category_id: CategoryId
  name: string
  short_description: string
  description: string
  price: string
  color: string
  material: string
  dimensions: string
  detail: string
  badge: string
  stock_quantity: string
  status: 'draft' | 'published'
  image_url: string
  gallery: string[]
  sort_order: number
}

const categoryLabels: Record<CategoryId, string> = {
  lighting: 'Aydınlatma',
  organizers: 'Masa düzeni',
  stationery: 'Kırtasiye',
  accessories: 'Aksesuarlar',
}

function emptyDraft(): ProductDraft {
  return {
    id: '', category_id: 'lighting', name: '', short_description: '', description: '',
    price: '', color: '', material: '', dimensions: '', detail: '', badge: '',
    stock_quantity: '0', status: 'draft', image_url: '', gallery: [], sort_order: 1000,
  }
}

export function productSlug(category: CategoryId, name: string): string {
  const simple = name.toLocaleLowerCase('tr-TR')
    .replaceAll('ı', 'i').replaceAll('ğ', 'g').replaceAll('ü', 'u')
    .replaceAll('ş', 's').replaceAll('ö', 'o').replaceAll('ç', 'c')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `${category}-${simple}`
}

export function priceToKurus(value: string): number | null {
  const normalized = value.trim().replace(',', '.')
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null
  const [lira, kurus = ''] = normalized.split('.')
  const total = Number(lira) * 100 + Number(kurus.padEnd(2, '0'))
  return Number.isSafeInteger(total) && total > 0 ? total : null
}

function rowToDraft(row: ProductRow): ProductDraft {
  return {
    id: row.id, category_id: row.category_id, name: row.name,
    short_description: row.short_description, description: row.description,
    price: (row.price_kurus / 100).toFixed(2), color: row.color,
    material: row.material, dimensions: row.dimensions, detail: row.detail,
    badge: row.badge ?? '', stock_quantity: String(row.stock_quantity),
    status: row.status, image_url: row.image_url, gallery: row.gallery,
    sort_order: row.sort_order,
  }
}

export function AdminPage({ onCatalogChange }: Props) {
  const [state, setState] = useState<AdminState>('checking')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState<ProductRow[]>([])
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft)
  const [editing, setEditing] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  async function loadProducts() {
    if (!supabase) return
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (error) throw error
    setProducts(data as ProductRow[])
  }

  async function checkStaff() {
    if (!supabase) return
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) { setState('login'); return }
    const { data, error } = await supabase.rpc('current_user_is_store_staff')
    if (error || data !== true) { setState('forbidden'); return }
    try {
      await loadProducts()
      setState('ready')
    } catch {
      setMessage('Ürünler yüklenemedi. Yetkileri veya bağlantıyı kontrol et.')
      setState('forbidden')
    }
  }

  useEffect(() => { void checkStaff() }, [])

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return
    setBusy(true); setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setPassword('')
    if (error) setMessage('Giriş yapılamadı. Bilgileri kontrol edip yeniden dene.')
    else await checkStaff()
    setBusy(false)
  }

  async function signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
    setProducts([]); setDraft(emptyDraft()); setEditing(false); setState('login')
  }

  function changeDraft(field: keyof ProductDraft, value: string) {
    setDraft((current) => {
      const next = { ...current, [field]: value }
      if (!editing && (field === 'name' || field === 'category_id'))
        next.id = productSlug(next.category_id, next.name)
      return next
    })
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase || state !== 'ready') return
    const priceKurus = priceToKurus(draft.price)
    const quantity = Number(draft.stock_quantity)
    if (!priceKurus || !Number.isInteger(quantity) || quantity < 0) {
      setMessage('Fiyatı ve stok adedini kontrol et. Fiyat için 1299,50 yazabilirsin.')
      return
    }
    if (!draft.id || draft.id === `${draft.category_id}-`) {
      setMessage('Ürün için geçerli bir ad yaz.')
      return
    }
    if (!draft.image_url && !imageFile) {
      setMessage('Ürünü yayınlamak için bir görsel seç.')
      return
    }
    setBusy(true); setMessage('')
    let imageUrl = draft.image_url
    let uploadedPath: string | null = null
    try {
      if (imageFile) {
        const extensions: Record<string, string> = {
          'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp',
        }
        const extension = extensions[imageFile.type]
        if (!extension || imageFile.size > 10 * 1024 * 1024) throw new Error('JPG, PNG veya WebP türünde en fazla 10 MB görsel seç.')
        uploadedPath = `${draft.category_id}/${draft.id}-${crypto.randomUUID()}.${extension}`
        const { error } = await supabase.storage.from('product-images').upload(uploadedPath, imageFile, { contentType: imageFile.type })
        if (error) throw error
        imageUrl = supabase.storage.from('product-images').getPublicUrl(uploadedPath).data.publicUrl
      }
      const payload = {
        id: draft.id, category_id: draft.category_id, name: draft.name.trim(),
        short_description: draft.short_description.trim(), description: draft.description.trim(),
        price_kurus: priceKurus, image_url: imageUrl,
        gallery: imageFile ? [imageUrl] : draft.gallery,
        color: draft.color.trim(), material: draft.material.trim(),
        dimensions: draft.dimensions.trim(), detail: draft.detail.trim(),
        badge: draft.badge.trim() || null, stock_quantity: quantity,
        status: draft.status, sort_order: draft.sort_order, updated_at: new Date().toISOString(),
      }
      const { error } = editing
        ? await supabase.from('products').update(payload).eq('id', draft.id)
        : await supabase.from('products').insert(payload)
      if (error) throw error
      setMessage(editing ? 'Ürün güncellendi.' : 'Ürün eklendi.')
      setImageFile(null)
      setDraft(emptyDraft())
      setEditing(false)
      await loadProducts()
      await onCatalogChange()
    } catch (error) {
      if (uploadedPath) await supabase.storage.from('product-images').remove([uploadedPath])
      setMessage(error instanceof Error ? error.message : 'Ürün kaydedilemedi.')
    } finally {
      setBusy(false)
    }
  }

  if (!supabase) return <div className="content-width admin-page"><h1>Yönetim paneli hazır değil.</h1><p>Supabase proje bilgileri henüz ayarlanmadı.</p></div>
  if (state === 'checking') return <div className="content-width admin-page" role="status">Yönetim yetkisi kontrol ediliyor…</div>
  if (state === 'login') return <div className="content-width admin-page admin-login"><span className="eyebrow">KÖŞE YÖNETİMİ</span><h1>Mağaza girişi</h1><p>Bu alan yalnızca yetkili mağaza hesabına açıktır.</p><form onSubmit={signIn}><label>E-posta<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Şifre<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label><button className="primary-button" type="submit" disabled={busy}>Giriş yap</button></form>{message && <p role="alert">{message}</p>}</div>
  if (state === 'forbidden') return <div className="content-width admin-page"><h1>Bu alana erişim yetkin yok.</h1><p>{message || 'Ürün yönetimi yalnızca mağaza yetkililerine açıktır.'}</p><button type="button" onClick={() => void signOut()}>Çıkış yap</button></div>

  return <div className="content-width admin-page"><div className="admin-top"><div><span className="eyebrow">KÖŞE YÖNETİMİ</span><h1>Ürün yönetimi</h1><p>Ürünleri taslakta tutabilir veya müşterilere yayınlayabilirsin.</p></div><button type="button" onClick={() => void signOut()}>Çıkış yap</button></div>
    <div className="admin-layout"><section className="admin-list" aria-label="Katalog ürünleri"><div className="admin-list-title"><h2>Ürünler <span>{products.length}</span></h2><button type="button" onClick={() => { setDraft(emptyDraft()); setEditing(false); setImageFile(null); setMessage('') }}>Yeni ürün</button></div>{products.map((product) => <button type="button" className="admin-product" key={product.id} onClick={() => { setDraft(rowToDraft(product)); setEditing(true); setImageFile(null); setMessage('') }}><img src={product.image_url} alt="" /><span><strong>{product.name}</strong><small>{categoryLabels[product.category_id]} · {product.status === 'published' ? 'Yayında' : 'Taslak'}</small></span></button>)}</section>
    <section className="admin-editor" aria-label={editing ? 'Ürünü düzenle' : 'Yeni ürün ekle'}><h2>{editing ? 'Ürünü düzenle' : 'Yeni ürün ekle'}</h2><form onSubmit={(event) => void saveProduct(event)}><div className="admin-form-grid"><label>Kategori<select value={draft.category_id} onChange={(event) => changeDraft('category_id', event.target.value)} disabled={editing}>{Object.entries(categoryLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label><label>Durum<select value={draft.status} onChange={(event) => changeDraft('status', event.target.value)}><option value="draft">Taslak</option><option value="published">Yayında</option></select></label></div><label>Ürün adı<input required maxLength={140} value={draft.name} onChange={(event) => changeDraft('name', event.target.value)} /></label><p className="admin-slug">Ürün kodu: {draft.id || 'Ürün adını yazınca oluşur'}</p><label>Kısa açıklama<input required maxLength={180} value={draft.short_description} onChange={(event) => changeDraft('short_description', event.target.value)} /></label><label>Açıklama<textarea required rows={4} value={draft.description} onChange={(event) => changeDraft('description', event.target.value)} /></label><div className="admin-form-grid"><label>Fiyat (₺)<input required inputMode="decimal" placeholder="1299,50" value={draft.price} onChange={(event) => changeDraft('price', event.target.value)} /></label><label>Stok adedi<input required type="number" min="0" step="1" value={draft.stock_quantity} onChange={(event) => changeDraft('stock_quantity', event.target.value)} /></label></div><div className="admin-form-grid"><label>Renk<input required value={draft.color} onChange={(event) => changeDraft('color', event.target.value)} /></label><label>Malzeme<input required value={draft.material} onChange={(event) => changeDraft('material', event.target.value)} /></label></div><label>Ölçü<input required value={draft.dimensions} onChange={(event) => changeDraft('dimensions', event.target.value)} /></label><label>Ürün ayrıntısı<input required value={draft.detail} onChange={(event) => changeDraft('detail', event.target.value)} /></label><label>Etiket (isteğe bağlı)<input value={draft.badge} onChange={(event) => changeDraft('badge', event.target.value)} /></label><label>Ürün fotoğrafı<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setImageFile(event.target.files?.[0] ?? null)} /></label>{draft.image_url && <img className="admin-preview" src={draft.image_url} alt="Ürünün mevcut görseli" />}<button className="primary-button" type="submit" disabled={busy}>{busy ? 'Kaydediliyor…' : editing ? 'Değişiklikleri kaydet' : 'Ürünü ekle'}</button>{message && <p className="admin-message" role="status">{message}</p>}</form></section></div></div>
}
