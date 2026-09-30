# KÖŞE

Çalışma alanı ürünleri için öğretici bir mini e-ticaret sitesi. Dört kategoride 40 örnek ürün Supabase'den yüklenir. Ürün keşfi, detay, sepet ve örnek sipariş akışı bulunur. Gerçek ödeme yapılmaz.

## Klasör haritası

Her klasörün `README.md` dosyası o alanın amacını açıklar.

| Klasör | Görev |
| --- | --- |
| [`src/`](src/README.md) | Uygulama kodu |
| [`src/categories/`](src/categories/README.md) | Kategori bilgileri ve ilk örnek ürünler |
| [`src/components/`](src/components/README.md) | Mağazada ortak kullanılan arayüz parçaları |
| [`src/lib/`](src/lib/README.md) | Para biçimlendirme ve sepet gibi işlevler |
| [`docs/`](docs/README.md) | UX araştırması, arayüz sözleşmesi ve kararlar |
| [`data/`](data/README.md) | Veritabanı için sürümlenen başlangıç ürünleri |
| [`supabase/`](supabase/README.md) | Veritabanı şeması ve başlangıç yükleme SQL'i |
| [`scripts/`](scripts/README.md) | Başlangıç verisini üreten araç |
| [`public/`](public/README.md) | Tarayıcıya doğrudan sunulan dosyalar |
| [`public/images/`](public/images/README.md) | Özgün mağaza görselleri |

## Çalıştırma

```powershell
npm install
npm run dev
```

`npm test` ilgili davranışları; `npm run build` TypeScript ve üretim derlemesini kontrol eder.

Canlı katalog için `.env.example` içindeki iki değeri `.env.local` dosyasına kopyala. Kurulum ve `#/yonetim` ekranının çalışma biçimi [dinamik katalog belgesinde](docs/dynamic-catalog.md) açıklanır. `.env.local` Git'e gönderilmez.

## Git akışı

İki Luna ajanı kendilerine ayrılmış kategori dosyaları ve görsellerde, ayrı worktree ve dallarda çalıştı. Her biri kendi değişikliklerini test edip commit ve push yaptı. Koordinatör commitleri inceleyerek `main` dalına aldı. [Git ile geri dönme](docs/git.md) notu geçmişi nasıl inceleyeceğimizi açıklar.
