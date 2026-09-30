# KÖŞE

Çalışma alanı ürünleri için öğretici bir mini e-ticaret sitesi. İlk sürümde dört kategori, ürün keşfi, ürün detayı, sepet ve örnek sipariş akışı bulunur. Gerçek ödeme yapılmaz.

## Klasör haritası

Her klasörün `README.md` dosyası o alanın amacını açıklar.

| Klasör | Görev |
| --- | --- |
| [`src/`](src/README.md) | Uygulama kodu |
| [`src/categories/`](src/categories/README.md) | Dört ayrı ajan tarafından geliştirilen ürün kategorileri |
| [`src/components/`](src/components/README.md) | Mağazada ortak kullanılan arayüz parçaları |
| [`src/lib/`](src/lib/README.md) | Para biçimlendirme ve sepet gibi işlevler |
| [`docs/`](docs/README.md) | UX araştırması, arayüz sözleşmesi ve kararlar |
| [`data/`](data/README.md) | Veritabanı için sürümlenen başlangıç ürünleri |
| [`public/`](public/README.md) | Tarayıcıya doğrudan sunulan dosyalar |
| [`public/images/`](public/images/README.md) | Özgün mağaza görselleri |

## Çalıştırma

```powershell
npm install
npm run dev
```

`npm test` ilgili davranışları; `npm run build` TypeScript ve üretim derlemesini kontrol eder.

## Git akışı

Her ajan yalnızca kendi kategori klasöründe, ayrı bir worktree ve dalda çalışır. Tamamladığı küçük bir adımı test ettikten sonra commit eder ve GitHub'a gönderir. Koordinatör dalları inceler ve `main` dalına birleştirir. [Git ile geri dönme](docs/git.md) notu geçmişi nasıl inceleyeceğimizi açıklar.
