import type { Category } from '../types'

const walnutShelfImage = '/images/organizers/walnut-desk-shelf.png'
const sageFileOrganizerImage = '/images/organizers/sage-file-organizer.png'
const terracottaDrawerImage = '/images/organizers/terracotta-drawer-organizer.png'

export const category: Category = {
  id: 'organizers',
  name: 'Masa düzeni',
  eyebrow: 'MASANDA YER AÇ',
  headline: 'Her şeyin yeri,\nmasanın nefesi var.',
  description:
    'Küçük eşyaları toparlayan, çalışma alanına sıcaklık katan düzenleyiciler. Masana ve günlük akışına uyan parçayı ölçüleriyle karşılaştır.',
  image: walnutShelfImage,
  filters: [
    {
      label: 'Renk',
      field: 'color',
      options: ['Ceviz', 'Adaçayı', 'Kiremit'],
    },
    {
      label: 'Malzeme',
      field: 'material',
      options: ['Ceviz kaplamalı ahşap', 'Toz boyalı çelik', 'Boyalı MDF'],
    },
  ],
  products: [
    {
      id: 'organizers-walnut-monitor-shelf',
      categoryId: 'organizers',
      name: 'Ceviz masaüstü yükseltici',
      shortDescription: 'Monitöre yer açan, altında defterleri saklayan alçak raf.',
      description:
        'Monitörünü göz hizana yaklaştırırken klavye çevresindeki alanı açık bırakır. Raf altındaki bölüm birkaç ince defter ya da klavye için düzenli bir yer sunar.',
      price: 2490,
      image: walnutShelfImage,
      gallery: [walnutShelfImage],
      color: 'Ceviz',
      material: 'Ceviz kaplamalı ahşap',
      dimensions: '60 × 24 × 12 cm; raf altı açıklığı 8 cm',
      detail:
        '60 cm genişliği standart bir monitör ayağına alan bırakır. 24 cm derinliği masanın ön tarafında çalışma payı tutar; yüzey yaklaşık 15 kg yük için tasarlanmıştır.',
    },
    {
      id: 'organizers-sage-file-caddy',
      categoryId: 'organizers',
      name: 'Adaçayı evrak ve kalemlik',
      shortDescription: 'Dikey dosya bölmeleri ve önde küçük bir eşya tepsisi.',
      description:
        'Gün içinde elinin altında olmasını istediğin evrakları dik tutar; öndeki sığ tepsi not kâğıtları ve kalemler için ayrılmıştır. Açık bölmeleri içeriklerini bir bakışta görmeni sağlar.',
      price: 790,
      image: sageFileOrganizerImage,
      gallery: [sageFileOrganizerImage],
      color: 'Adaçayı',
      material: 'Toz boyalı çelik',
      dimensions: '28 × 13 × 20 cm; ön tepsi derinliği 4 cm',
      detail:
        'A4 evrakı ve ince dosyaları dik konumda tutar. 13 cm derinliği dar masalarda az yer kaplar; metal gövde nemli bezle silinebilir.',
    },
    {
      id: 'organizers-terracotta-desk-drawers',
      categoryId: 'organizers',
      name: 'Kiremit çift çekmeceli kutu',
      shortDescription: 'Masa üstünde küçük araçları göz önünden kaldıran iki çekmece.',
      description:
        'Şarj kablosu, not kartı ve sık kullandığın küçük kırtasiye parçalarını iki ayrı çekmecede toplar. Üst yüzeyini defter ya da kalemlik için kullanabilirsin.',
      price: 1290,
      image: terracottaDrawerImage,
      gallery: [terracottaDrawerImage],
      color: 'Kiremit',
      material: 'Boyalı MDF',
      dimensions: '28 × 23 × 14 cm; her çekmece içi 24 × 19 × 4 cm',
      detail:
        'İki sığ çekmece küçük masa eşyalarını türüne göre ayırır. Ahşap kulplar çekmeceleri kolay açar; nemli bezle silip kuru tutmak yeterlidir.',
    },
  ],
}
