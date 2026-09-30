# Kırtasiye kategorisi

Bu modül, KÖŞE vitrini için defter, not kâğıdı ve kurşun kalem örnek ürünlerini tanımlar. Ürün adları, ölçüler, sayfa miktarları, uç sertliği, kâğıt ve gövde malzemeleri satın alma kararına yardımcı olacak şekilde açıklanır. Fiyatlar örnek veridir; mağaza gerçek sipariş almaz.

## Dosyalar

- `index.ts`, ortak `Category` biçimindeki kategori ve ürün verisini dışa aktarır.
- `stationery.test.ts`, kimlikleri, fiyatları, kategoriye ait görsel yolu biçimini ve filtre seçeneklerinin ürün verisiyle eşleşmesini doğrular.
- `/public/images/stationery/`, her ürün için ayrı ana fotoğrafı ve ürün detayında kullanılacak ikinci açıyı içerir.

## Filtreler

- **Renk:** Adaçayı, Kiremit ve Ceviz; kullanıcıya masadaki renk düzenine uyan ürünü buldurur.
- **Malzeme:** Kâğıt ve karton, Kâğıt ve mukavva, Ahşap ve grafit; ürünün el hissi ve kullanım biçimi hakkında hızlı karşılaştırma sağlar.

Filtre seçenekleri mevcut ürünlerin `color` ve `material` değerleriyle birebir eşleşir. Yeni ürün eklendiğinde ilgili seçenekler ve kategori testi birlikte güncellenmelidir.
