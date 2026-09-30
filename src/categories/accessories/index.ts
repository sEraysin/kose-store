import type { Category } from '../types'

export const category: Category = {
  id: 'accessories',
  name: 'Masa Aksesuarları',
  eyebrow: 'MASA AKSESUARLARI',
  headline: 'Masanda küçük, düşünülmüş dokunuşlar.',
  description:
    'Çalışma aralarına eşlik eden seramik ve ahşap parçalar. Masana sığacak ölçüleri, yüzeyleri ve malzemeleri karşılaştır; sana uygun olanı seç.',
  image: '/images/accessories/stoneware-coasters.png',
  products: [
    {
      id: 'accessories-stoneware-coaster-set',
      categoryId: 'accessories',
      name: 'Duru Stoneware Bardak Altlığı Seti',
      shortDescription: 'Dört adet, benekli kırık beyaz sırla elde biçimlendirilmiş seramik altlık.',
      description:
        'Kupa ve su bardağı altında masayı koruyan, yumuşak kenarlı dört parçalık set. Hafif benekli sır her altlığa kendine özgü bir görünüm verir; mantar taban masa yüzeyini doğrudan seramik temasından ayırır.',
      price: 640,
      image: '/images/accessories/stoneware-coasters.png',
      gallery: [
        '/images/accessories/stoneware-coasters.png',
        '/images/accessories/stoneware-coasters-detail.png',
      ],
      color: 'Kırık beyaz',
      material: 'Sırlı stoneware ve mantar',
      dimensions: 'Her altlık: 10 × 10 × 0,8 cm; set: 4 adet',
      detail: 'Mantar tabanlıdır. Nemli bezle silin; elde yıkama veya bulaşık makinesi için uygun değildir.',
      badge: '4’lü set',
    },
    {
      id: 'accessories-filiz-bud-vase',
      categoryId: 'accessories',
      name: 'Filiz Mini Seramik Vazo',
      shortDescription: 'Tek dal veya küçük bir demet için dar ağızlı, mat kiremit tonlu vazo.',
      description:
        'Az yer kaplayan gövdesi küçük masalarda ve raflarda kolayca konumlanır. Dar ağız, birkaç ince dalın dağılmadan durmasına yardımcı olur; iç yüzeyi sırlıdır ve suyla kullanılabilir.',
      price: 890,
      image: '/images/accessories/bud-vase.png',
      gallery: [
        '/images/accessories/bud-vase.png',
        '/images/accessories/bud-vase-detail.png',
      ],
      color: 'Kiremit',
      material: 'Mat stoneware, içi sırlı',
      dimensions: '12 cm yükseklik × 8 cm en; ağız çapı 2 cm',
      detail: 'Tek parça seramiktir. Elde yıkayın ve masaya koymadan önce tabanını kurulayın.',
    },
    {
      id: 'accessories-no04-desk-clock',
      categoryId: 'accessories',
      name: 'No. 04 Ceviz Masa Saati',
      shortDescription: 'Kırık beyaz kadranlı, masif ceviz tabanlı kompakt analog saat.',
      description:
        'Saati ekrana bakmadan takip etmek isteyenler için sade indeksli analog masa saati. Eğik ceviz taban kadranı otururken görünür tutar; küçük gövdesi defter ve klavyenin yanında fazla alan kaplamaz.',
      price: 1_290,
      image: '/images/accessories/walnut-desk-clock.png',
      gallery: [
        '/images/accessories/walnut-desk-clock.png',
        '/images/accessories/walnut-desk-clock-detail.png',
      ],
      color: 'Ceviz ve kırık beyaz',
      material: 'Masif ceviz, cam ve metal mekanizma',
      dimensions: '12,5 × 8 × 4 cm',
      detail: 'Bir adet AA pille çalışır; pil kutuya dahil değildir. Ceviz yüzeyi kuru, yumuşak bezle temizleyin.',
    },
  ],
  filters: [
    {
      label: 'Renk',
      field: 'color',
      options: ['Kırık beyaz', 'Kiremit', 'Ceviz ve kırık beyaz'],
    },
    {
      label: 'Malzeme',
      field: 'material',
      options: [
        'Sırlı stoneware ve mantar',
        'Mat stoneware, içi sırlı',
        'Masif ceviz, cam ve metal mekanizma',
      ],
    },
  ],
}
