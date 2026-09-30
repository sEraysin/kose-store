# Kategori başlangıç ürünleri

Her kategori dosyası, mevcut üç ürüne **eklenen yedi** yeni ürünü taşır. Kategori ajanları yalnızca kendilerine atanmış JSON dosyalarını ve aynı kategoriye ait görselleri değiştirir. Ortak başlangıç yükleme aracı bu dosyaları mevcut ürünlerle birleştirerek kategori başına on ürün oluşturur.

Her kayıt şu alanları içerir: `id`, `categoryId`, `name`, `shortDescription`, `description`, `priceKurus`, `image`, `gallery`, `color`, `material`, `dimensions`, `detail`, `stockQuantity`. `badge` isteğe bağlıdır. Fiyat kuruş cinsinden pozitif tam sayı; stok negatif olmayan tam sayı; `image` ve `gallery` yolları `/images/<category>/...` biçimindedir. Kimlikler kategori adıyla başlar ve tüm katalogda benzersizdir. Bu ürünlerin tümü demo katalog için örnektir; doğrulanmamış teknik veya güvenlik iddiası yazılmamalıdır.
