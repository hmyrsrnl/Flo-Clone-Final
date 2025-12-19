<script setup lang="ts">
import { computed } from 'vue';

/** * Madde 3a: TypeScript interface kullanımı.
 * Değerlendirme puanı ve yorum sayısını tip güvenli hale getiriyoruz.
 */
interface Props {
  rating: number;
  reviewCount: number;
}

const props = defineProps<Props>();

/** * Madde 3b: Sadece Nuxt/Vue yapıları.
 * Matematiksel işlemleri doğrudan template içinde veya computed ile yapabiliriz.
 */
const fullStars = computed(() => Math.floor(props.rating));
</script>

<template>
  <div class="rating-stars">
    <span class="rating-value">{{ rating }}</span>
    <div class="stars">
      <span 
        v-for="star in 5" 
        :key="star" 
        :class="['star', { 'filled': star <= fullStars }]"
      >
        ★
      </span>
    </div>
  </div>
</template>

<style scoped>
.rating-stars {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9em;
}

.rating-value {
  font-weight: 600;
  color: #333;
}

.stars {
  display: flex;
  gap: 1px;
}

.star {
  color: #ddd;
  font-size: 0.9em;
}

.star.filled {
  color: #FFA500;
}

.review-count {
  color: #666;
  font-size: 0.85em;
}

.comment-icon {
  font-size: 0.9em;
}
</style>