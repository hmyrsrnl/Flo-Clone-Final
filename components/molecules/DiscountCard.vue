<script setup lang="ts">
/** * Madde 3a: TypeScript interface kullanımı.
 * Ürün verisini merkezi tip dosyasından (IProduct) alıyoruz.
 */
  import type { IProduct } from '~/types'
import { useCartStore } from '../../stores/cart';

interface Props {
  product: IProduct;
}

const props = defineProps<Props>();

/** * Madde 3b: Sadece Nuxt/Vue yapıları.
 * Fiyat formatlama işlemini computed ile yönetiyoruz.
 */
const formatPrice = (p: number | string) => {
  const n = typeof p === 'string' ? parseFloat(p) : p;
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(n) + ' TL';
};

const cartStore = useCartStore(); // Sepet işlemleri için
</script>

<template>
  <div class="discount-card">
    <img :src="product.imageUrl" :alt="product.name" />
    <div class="info">
      <div class="brand">{{ product.brand }}</div>
      <div class="title">{{ product.name }}</div>
      <div class="prices">
        <span class="old">{{ formatPrice(product.oldPrice || 0) }}</span>
        <span class="new">{{ formatPrice(product.price) }}</span>
      </div>
      <AtomsButton 
        variant="primary" 
        size="small" 
        @click="cartStore.addToCart(product)"
      >
        Sepete Ekle
      </AtomsButton>
    </div>
  </div>
</template>

<style scoped>
.discount-card { 
  width: 220px; 
  background:white; 
  border-radius:10px; 
  padding:12px; 
  display:flex; 
  gap:10px; 
  align-items:center; 
  box-shadow:0 1px 4px rgba(0,0,0,0.04); 
  flex-shrink:0; 
}

.discount-card img { 
  width:72px; 
  height:72px; 
  object-fit:cover; 
  border-radius:8px; 
}

.info { 
  display:flex; 
  flex-direction:column; 
  gap:6px; 
}

.brand { 
  font-size:12px; 
  color:#888; 
}

.title { 
  font-size:13px; 
  color:#222; 
  font-weight:600; 
}

.prices { 
  display:flex; 
  gap:8px; 
  align-items:center; 
}

.old { 
  text-decoration:line-through; 
  color:#aaa; 
  font-size:12px; 
}

.new { 
  color:#e74c3c; 
  font-weight:700; 
  font-size:14px; 
}
</style>
