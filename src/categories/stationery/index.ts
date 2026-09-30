import type { Category } from '../types'

const imageRoot = '/images/stationery'

export const category: Category = {
  id: 'stationery',
  name: 'Kırtasiye',
  eyebrow: 'MASANA YENİ FİKİRLER',
  headline: 'Yaz, çiz, yeniden başla.',
  description:
    'Günlük notlar ve yeni taslaklar için sade masa arkadaşları. Bu vitrindeki ürün ve fiyatlar örnek veridir; gerçek sipariş alınmaz.',
  image: `${imageRoot}/akis-defter-cover.png`,
  products: [
    {
      id: 'stationery-akis-defter',
      categoryId: 'stationery',
      name: 'Akış A5 Çizgili Defter',
      shortDescription: 'Günlük notlar için iplik dikişli, 96 sayfalı defter.',
      description:
        'Toplantı notlarını, günlük planları ve ilk taslakları tek yerde tutmak için taşınabilir A5 boyutunda çizgili bir defter.',
      price: 245,
      image: `${imageRoot}/akis-defter-cover.png`,
      gallery: [`${imageRoot}/akis-defter-cover.png`, `${imageRoot}/akis-defter-open.png`],
      color: 'Adaçayı',
      material: 'Kâğıt ve karton',
      dimensions: 'A5 · 14,8 × 21 cm · 96 sayfa',
      detail: '90 g/m² çizgili iç kâğıt; mat karton kapak; iplik dikişli sırt.',
    },
    {
      id: 'stationery-kiremit-not-blok',
      categoryId: 'stationery',
      name: 'Kiremit Not Bloğu',
      shortDescription: 'El altında tutulacak kısa notlar için 80 yaprak.',
      description:
        'Telefon notları, alışveriş listeleri ve hızlı hatırlatmalar için masada kolayca erişilecek kompakt bir not bloğu.',
      price: 135,
      image: `${imageRoot}/kiremit-not-blok.png`,
      gallery: [`${imageRoot}/kiremit-not-blok.png`, `${imageRoot}/kiremit-not-blok-detail.png`],
      color: 'Kiremit',
      material: 'Kâğıt ve mukavva',
      dimensions: '10 × 15 cm · 80 yaprak',
      detail: 'Boş, 90 g/m² kâğıt yapraklar; kiremit renkli mukavva arkalık.',
    },
    {
      id: 'stationery-ceviz-kursun-kalem',
      categoryId: 'stationery',
      name: 'Ceviz Kurşun Kalem Üçlüsü',
      shortDescription: 'Eskiz ve günlük kullanım için üç adet HB kalem.',
      description:
        'Kısa çizimler ve kâğıt üzerinde hızlı fikir denemeleri için klasik altıgen gövdeli, üçlü kurşun kalem seti.',
      price: 115,
      image: `${imageRoot}/ceviz-kalem-set.png`,
      gallery: [`${imageRoot}/ceviz-kalem-set.png`, `${imageRoot}/ceviz-kalem-uc-detay.png`],
      color: 'Ceviz',
      material: 'Ahşap ve grafit',
      dimensions: '17,5 cm · 3 adet · HB uç',
      detail: 'Mat ceviz tonlu altıgen ahşap gövde; sivriltilebilir grafit uç ve silgi başlığı.',
    },
  ],
  filters: [
    { label: 'Renk', field: 'color', options: ['Adaçayı', 'Kiremit', 'Ceviz'] },
    {
      label: 'Malzeme',
      field: 'material',
      options: ['Kâğıt ve karton', 'Kâğıt ve mukavva', 'Ahşap ve grafit'],
    },
  ],
}
