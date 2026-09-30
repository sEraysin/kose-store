# Dinamik katalog ve mağaza yönetimi

## Veri akışı

Ürünler Supabase `public.products` tablosundan yüklenir. Mağaza yalnızca `published` durumundaki ürünleri gösterir; taslakları yetkili hesap görür. Dört kategorinin başlığı ve kapak alanı şimdilik uygulamada tanımlıdır. Ürün adı, fiyatı, stok adedi, görseli ve açıklaması veritabanından gelir. Başlangıçtaki 40 örnek ürünü `data/seed` ve mevcut kategori dosyaları üretir.

`.env.example` dosyasındaki değerleri yerel `.env.local` içine koy. Yalnızca **publishable key** tarayıcıya verilir. Secret veya service role anahtarı hiçbir zaman `VITE_` değişkenine yazılmaz. Bu değerler olmadan uygulama eski 12 ürünlük örnek kataloğu gösterir; yönetim girişi devre dışıdır.

## Veritabanını kurma

1. `supabase/migrations` içindeki SQL'i projeye uygula. Bu işlem ürün tablosunu, yetki kurallarını ve ürün görseli alanını oluşturur.
2. `npm run seed:build` ile `supabase/seed.sql` üret. Bu dosya dört kategoriden toplam 40 örnek ürün içerir. Supabase CLI yerel `db reset` sırasında bu dosyayı kullanır. Uzak projede aynı SQL'i bir kez güvenilir yönetici bağlantısıyla çalıştır.
3. Supabase Auth üzerinde mağazayı yönetecek hesabı oluştur. Hesabın `auth.users.id` değerini güvenilir SQL editöründe şu komutla yetkilendir: `insert into private.store_staff (user_id) values ('KULLANICI_UUID');`. Bu tablo tarayıcı API'sine açık değildir.

## Yönetim akışı

`#/yonetim` adresi giriş ekranını gösterir. Bu adres gizli tutulması gereken bir güvenlik anahtarı değildir; koruma Supabase Auth, özel personel tablosu ve veritabanı RLS kurallarıyla sağlanır. Yetkili kişi ürün ekleyebilir, düzenleyebilir, taslakta tutabilir veya yayınlayabilir. Görseller Supabase Storage `product-images` alanına yüklenir. Herkese açık görsel URL'si yalnızca yayınlanan ürünün görüntülenmesi için kullanılır.

İlk sürümde yönetim oturumu yalnızca sekme belleğinde tutulur; sayfa yenilenince yeniden giriş gerekir. Müşteri hesabı ve gerçek sipariş/ödeme akışı yoktur. Stok sayısı ürünün sepete eklenmesini sınırlar, fakat demo ödeme sonunda veritabanı stoku azalmaz.

## Dosya haritası

- `supabase/migrations`: tablo, depolama ve yetki kuralları.
- `src/lib/catalog.ts`: veritabanı satırını mağaza ürününe dönüştürür.
- `src/components/AdminPage.tsx`: yetkili giriş ve ürün düzenleme arayüzü.
- `data/seed`: dört kategori için eklenen örnek ürünler.
- `scripts/build-seed.ts`: başlangıç SQL'ini yeniden üretir.
