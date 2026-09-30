import type { Category } from '../types'

export const category: Category = {
  id: 'lighting',
  name: 'Aydınlatma',
  eyebrow: 'Masan için doğru ışık',
  headline: 'Akşamı yumuşatan, çalışmayı kolaylaştıran masa lambaları.',
  description:
    'Küçük çalışma köşelerine sığan masa lambalarını ışık yönü, ölçü ve malzemeye göre karşılaştır. Buradaki ürünler mağaza akışını göstermek için hazırlanmış örnek ürünlerdir.',
  image: '/images/lighting/nara-dome-main.png',
  filters: [
    {
      label: 'Renk',
      field: 'color',
      options: ['Kırık beyaz / ceviz', 'Adaçayı yeşili', 'Kiremit / opal beyaz'],
    },
    {
      label: 'Malzeme',
      field: 'material',
      options: [
        'Sırlı seramik ve ceviz',
        'Toz boyalı çelik ve pirinç',
        'Seramik, opal cam ve ceviz',
      ],
    },
  ],
  products: [
    {
      id: 'lighting-nara-dome',
      categoryId: 'lighting',
      name: 'Nara Seramik Masa Lambası',
      shortDescription:
        'Geniş kubbesi ışığı masaya toplar; kırık beyaz seramik ve ceviz küçük köşelere sıcaklık katar.',
      description:
        'Yuvarlak seramik gövdesi ve geniş kubbe başlığıyla Nara, defter ya da klavye üzerinde dağılmayan yumuşak bir ışık verir. Ceviz boyun ve taban, açık renkli çalışma masasında doğal bir kontrast oluşturur.',
      price: 2890,
      image: '/images/lighting/nara-dome-main.png',
      gallery: [
        '/images/lighting/nara-dome-main.png',
        '/images/lighting/nara-dome-angle.png',
      ],
      color: 'Kırık beyaz / ceviz',
      material: 'Sırlı seramik ve ceviz',
      dimensions: 'Yükseklik 38 cm · başlık çapı 27 cm · taban çapı 16 cm',
      detail:
        'Işığı aşağı yönlendiren geniş başlık · E14 LED ampul (en çok 8 W, dahil değil) · kablo üzerinde anahtar',
    },
    {
      id: 'lighting-sera-articulated',
      categoryId: 'lighting',
      name: 'Sera Mafsallı Masa Lambası',
      shortDescription:
        'İki hareketli kolu ışığı çalışma alanına taşır; ağırlıklı tabanı masada yerini korur.',
      description:
        'Sera’nın mafsallı çelik kolları, ışığı not alırken yakına veya ekranda çalışırken uzağa yöneltmeyi kolaylaştırır. Kompakt tabanı masada az yer kaplar; adaçayı kaplama ve pirinç eklemler ceviz tonlarıyla uyum sağlar.',
      price: 3290,
      image: '/images/lighting/sera-articulated-main.png',
      gallery: [
        '/images/lighting/sera-articulated-main.png',
        '/images/lighting/sera-articulated-task.png',
      ],
      color: 'Adaçayı yeşili',
      material: 'Toz boyalı çelik ve pirinç',
      dimensions: 'Yükseklik 42–54 cm · yatay erişim 48 cm · taban çapı 17 cm',
      detail:
        'İki mafsallı kol ve ağır taban · E14 LED ampul (en çok 8 W, dahil değil) · kablo üzerinde anahtar',
    },
    {
      id: 'lighting-toprak-globe',
      categoryId: 'lighting',
      name: 'Toprak Opal Küre Masa Lambası',
      shortDescription:
        'Opal cam küre ışığı yumuşatır; kiremit seramik gövdesi masada küçük bir vurgu oluşturur.',
      description:
        'Toprak, opal cam küreden yayılan dağınık ışığı dokulu kiremit seramik gövde ve ceviz ayakla bir araya getirir. Alçak formu monitör yanına veya dar bir komodine sığar; akşamları ortam ışığı olarak kullanılabilir.',
      price: 2490,
      image: '/images/lighting/toprak-globe-main.png',
      gallery: [
        '/images/lighting/toprak-globe-main.png',
        '/images/lighting/toprak-globe-angle.png',
      ],
      color: 'Kiremit / opal beyaz',
      material: 'Seramik, opal cam ve ceviz',
      dimensions: 'Yükseklik 31 cm · küre çapı 18 cm · taban çapı 16 cm',
      detail:
        'Yumuşak ortam ışığı veren opal küre · E14 LED ampul (en çok 6 W, dahil değil) · kablo üzerinde anahtar',
    },
  ],
}
