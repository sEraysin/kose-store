# Masa düzeni kategorisi

Bu modül, masaüstü yükseltici, evrak düzenleyici ve çekmeceli saklama kutusu örneklerini KÖŞE'nin ortak `Category` tipinde sunar. Ürün ölçüleri, malzemeleri ve açıklamaları; masasında ne kadar yer olduğunu ve hangi eşyaları düzenlemek istediğini karşılaştırmaya yardım eder.

## Dosyalar

- `index.ts`, kategori metnini, üç örnek ürünü ve kategoriye özel filtreleri dışa aktarır.
- `organizers.test.ts`, kategori kimliğini, ürün kimliklerini, pozitif fiyatları, görsel yollarını, filtre seçeneklerini ve karar bilgilerini doğrular.
- `/public/images/organizers/` içindeki her PNG, ilgili ürün için özel hazırlanmış editoryal görseldir.

## Filtreler

- **Renk:** Ceviz, adaçayı ve kiremit seçenekleri masanın mevcut tonlarıyla uyumlu parçayı bulmayı kolaylaştırır.
- **Malzeme:** Kaplamalı ahşap, boyalı çelik ve MDF arasında görünüm ve günlük temizlik tercihlerine göre seçim yapmayı sağlar.

Filtre değerleri ürün kayıtlarından türetilmiş seçeneklerle eşleşir; yeni bir ürün eklenirken ilgili seçeneğin de veriyle tutarlı tutulması testte kontrol edilir.

Ürünler, fiyatlar ve görseller örnek mağaza verisidir; gerçek stok, müşteri değerlendirmesi veya satın alma vaadi içermez.
