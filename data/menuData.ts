/** * Madde 3a: TypeScript interface kullanımı.
 * Mega menu yapısı için tip tanımlarını yapıyoruz.
 */
interface MenuItem {
  title: string;
  items: string[];
}

export const menuData = {
  ayakkabi: [
    { title: 'Kategoriler', items: ['Sneaker', 'Bot', 'Çizme', 'Günlük Ayakkabı', 'Topuklu Ayakkabı'] },
    { title: 'Markalar', items: ['Nike', 'Adidas', 'Puma', 'Lumberjack', 'Kinetix'] }
  ],
  spor: [
    { title: 'Spor Dalları', items: ['Koşu', 'Fitness', 'Basketbol', 'Outdoor'] },
    { title: 'Giyim', items: ['Eşofman Takımı', 'Tayt', 'Spor Şort'] }
  ],
  giyim: [
    { title: 'Üst Giyim', items: ['Mont', 'Ceket', 'Kazak', 'Hırka', 'T-Shirt'] },
    { title: 'Alt Giyim', items: ['Pantolon', 'Jean', 'Etek'] }
  ],
  canta: [
    { title: 'Çanta', items: ['Sırt Çantası', 'Omuz Çantası', 'Cüzdan'] }
  ],
  markalar: [
    { title: 'Popüler Markalar', items: ['Nike', 'Adidas', 'Puma', 'Lumberjack', 'Skechers'] }
  ],
  indirim: [
    { title: 'Fırsatlar', items: ['Son Şans', 'Sepette %50', 'Outlet'] }
  ]
};