# Aydınlatma kategorisi

`index.ts`, mağazanın ortak `Category` sözleşmesine uyan üç örnek masa lambasını dışa aktarır. Ürün açıklamalarında lamba başlığı veya mafsalın ışığı nasıl yönlendirdiği, ampul duy bilgisi ve masada kaplayacağı ölçüler yer alır. Fiyatlar örnek veridir; stok baskısı veya sahte değerlendirme içermez.

Renk filtresi kırık beyaz-ceviz, adaçayı ve kiremit-opal seçenekleriyle masanın renk paletine göre aramayı daraltır. Malzeme filtresi seramiği, mafsallı çeliği veya opal camı tercih edenlerin uygun lambayı bulmasına yardımcı olur. Her ürünün iki özgün fotoğrafı ürün detayındaki görsel galeride kullanılır.

`index.test.ts`, kategori ve ürün kimliklerini, pozitif fiyatları, ölçüleri, görsel dosyalarının varlığını ve filtre seçeneklerinin ürün verisiyle eşleşmesini doğrular. Görseller `public/images/lighting/` içinde bulunur.
