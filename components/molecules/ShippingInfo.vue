<script setup lang="ts">
/** * Madde 3a: TypeScript interface kullanımı.
 */
interface Props {
  title: string;
  description: string;
  deliveryDate: string;
  price: number | string;
}

const props = defineProps<Props>();

/** * Madde 3b: Sadece Nuxt/Vue yapıları.
 * Tip uyuşmazlığı hatasını (image_842c2a.png) önlemek için beden tipini esnek tutuyoruz.
 */
const selectedSize = ref<string | number>('37');
const availableSizes = ['36', '37', '38', '39', '40', '41'];
</script>

<template>
  <div class="shipping-info">
    <div class="shipping-header">
      <h5>{{ title }}</h5>
      <span class="delivery-date">{{ deliveryDate }}</span>
    </div>
    <p class="shipping-description">{{ description }}</p>
    
    <div class="size-selector">
      <span>Beden:</span>
      <AtomsSizeSelector 
        :sizes="availableSizes"
        v-model:selectedSize="selectedSize"
      />
    </div>

    <div class="price-section">
      <AtomsPrice :price="price" />
    </div>
  </div>
</template>

<style scoped>
.shipping-info { 
  font-size:13px; 
  color:#444; 
}

.shipping-header { 
  display:flex; 
  justify-content:space-between; 
  align-items:center; 
  margin-bottom:6px; 
}

.shipping-header h5 { 
  margin:0; 
  font-size:14px; 
}

.delivery-date { 
  color:#888; 
  font-size:12px; 
}

.shipping-description { 
  color:#777; 
  margin:6px 0; 
}

.size-selector { 
  display:flex; 
  gap:8px; 
  align-items:center; 
  margin-bottom:8px; 
}

.size-dropdown { 
  padding:6px; 
  border-radius:6px; 
  border:1px solid #ddd; 
  background:#fff; 
}

.price { 
  color:#e74c3c; 
  font-weight:700; 
}
</style>
