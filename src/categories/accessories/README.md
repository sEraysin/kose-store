# Masa Aksesuarları

`index.ts` KÖŞE'nin masa aksesuarları kategorisini ortak `Category` sözleşmesiyle tanımlar. Ürün açıklamaları yüzey, malzeme ve kullanım biçimini; ölçüler ise küçük çalışma alanlarına sığma kararını destekler. Fiyatlar örnek mağaza verisidir, gerçek satış veya stok bilgisi değildir.

Renk filtresi parçanın masa üzerindeki görünümünü, malzeme filtresi ise dokunuşu ve bakım yaklaşımını karşılaştırmaya yardım eder. İki filtre de yalnızca ürün kayıtlarında bulunan seçenekleri listeler.

`accessories.test.ts` kategori kimliğini, ürün ID'lerinin benzersizliğini ve önekini, pozitif fiyatları, tüm galeri dosyalarının yerel görsel karşılığını ve filtre seçeneklerinin ürün verileriyle eşleşmesini doğrular. `public/images/accessories/` altında her ürün için iki ayrı özgün ürün fotoğrafı bulunur.
