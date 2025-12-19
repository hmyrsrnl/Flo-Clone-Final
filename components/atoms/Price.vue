<script setup lang="ts">
import { computed } from 'vue';

/** * Madde 3a: TypeScript interface kullanımı.
 * Price hem number hem string (Firestore'dan gelen veriye göre) olabilir.
 */
interface Props {
  price: number | string;
  features?: string[];
}

const props = defineProps<Props>();

/** * Madde 3b: Sadece 'use' veya Vue/Nuxt fonksiyonları.
 * Fiyat biçimlendirme mantığını computed ile yönetiyoruz.
 */
const formattedPrice = computed(() => {
  // 1. Gelen verideki gizli çift tırnakları ve boşlukları temizle
  const cleanPrice = props.price?.toString().replace(/"/g, '').trim();

  // 2. Eğer veri zaten 'TL' içeriyorsa direkt göster
  if (cleanPrice.includes('TL')) return cleanPrice;

  // 3. Sayıya çevir ve NaN kontrolü yap
  const numericPrice = Number(cleanPrice);
  if (isNaN(numericPrice) || !cleanPrice) return '0,00 TL';

  // 4. Standart Türkçe formatında döndür
  return new Intl.NumberFormat('tr-TR', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(numericPrice) + ' TL';
});
</script>

<template>
  <div class="price-display">
    <div class="current">{{ formattedPrice }}</div>
    <div v-if="features && features.length" class="features">
      <span v-for="(f, i) in features" :key="i" class="feature">{{ f }}</span>
    </div>
  </div>
</template>

<style scoped>
.price-display { 
  display:flex; 
  flex-direction:column; 
  align-items:flex-start; 
  gap:6px; 
}

.current { 
  font-size:16px; 
  font-weight:800; 
  color:#e74c3c; 
}

.features { 
  display:flex; 
  gap:6px; 
  flex-direction:column; 
  align-items:flex-end; 
}

.feature { 
  font-size:12px; 
  color:#00b14f; 
  font-weight:600; 
}
</style>
