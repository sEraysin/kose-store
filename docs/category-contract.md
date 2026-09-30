# Kategori arayüz sözleşmesi

Dört Luna ajanı şu klasörlerden yalnızca birini sahiplenir: `lighting`, `organizers`, `stationery`, `accessories`. Her kategori `src/categories/<id>/index.ts` içinde `category` adlı bir `Category` nesnesi dışa aktarır. Ortak tip `src/categories/types.ts` içinde tanımlıdır.

Her kategoride en az üç farklı ürün bulunur. Ürün ID'si kategori önekiyle başlar (`lighting-...` gibi), fiyatı TRY cinsinden pozitif sayı, görsel yolu `/images/<id>/...` biçimindedir. Ürünlerin adı, kısa açıklaması, ölçüsü, malzemesi ve rengi kullanıcıya gerçekçi karar bilgisi vermelidir. Örnek veri olduğu dürüstçe belirtilir; sahte değerlendirme puanı veya stok baskısı yazılmaz.

Her kategori kendi `README.md`, `index.ts`, en az bir `*.test.ts` ve özgün görsellerini içerir. Testler kendi kategori kimliğini, ürün ID benzersizliğini, fiyatları, görsel yollarını ve filtre seçeneklerinin ürün verisiyle ilişkisini doğrular. Commit yalnızca test ve `npm run build` geçtikten sonra atılır.

Kategoriler aynı `Category` yapısını kullanır. Ortak ürün kartı, liste, detay, sepet, menü ve tasarım sistemi koordinatörün alanıdır. Ortak sözleşmede değişiklik gerektiğinde önce koordinatöre haber verilir.
