<script setup lang="ts">
/** * Madde 3a: TypeScript interface kullanımı.
 * Görsel URL'si, ürün adı ve eklenme sayısı için tipleri tanımlıyoruz.
 */
interface Props {
  imageUrl: string;
  productName: string;
  addedCount?: number;
}

// Propsları varsayılan değerlerle tanımlıyoruz
withDefaults(defineProps<Props>(), {
  addedCount: 0
});

/** * Madde 3b: Sadece Nuxt/Vue yapıları.
 * Manuel importları (ref, onMounted vb. gerekirse) sildik, Nuxt otomatik tanır.
 */
</script>

<template>
  <div class="product-image">
    <img :src="imageUrl" :alt="productName" class="image" />
    <div v-if="addedCount" class="added-badge">
      {{ addedCount }} günde {{ addedCount * 24 }} kişi ekledi
    </div>
  </div>
</template>

<style scoped>
.product-image {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  height: 500px;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.added-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75em;
  font-weight: 500;
}

</style>