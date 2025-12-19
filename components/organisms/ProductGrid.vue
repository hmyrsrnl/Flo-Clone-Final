<script setup lang="ts">
/** * Madde 3a: TypeScript interface kullanımı.
 * types/index.ts dosyasındaki IProduct tipini import ediyoruz.
 */
import type { IProduct } from '~/types'

interface Props {
  products: IProduct[];
}

const props = withDefaults(defineProps<Props>(), {
  products: () => []
});

/** * Madde 3b: Nuxt 3 otomatik içe aktarma.
 * Tıklama olayını tanımlıyoruz.
 */
defineEmits<{
  (e: 'product-click', product: IProduct): void
}>();
</script>

<template>
  <div class="product-grid">
    <MoleculesProductCard 
      v-for="product in products"
      :key="product.id"
      :product="product"
      @product-click="$emit('product-click', product)"
      class="product-item"
    />
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 10px 0;
}

.product-item {
  width: 100%;
  height: 100%;
  min-width: 0;
}



@media (max-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>