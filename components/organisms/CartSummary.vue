<script setup lang="ts">
/** * Madde 3a: TypeScript interface kullanımı.
 * Sepet özeti verileri için yapısal tip tanımı.
 */
interface ISummaryData {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

interface Props {
  summaryData: ISummaryData;
  itemCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  itemCount: 0
});

/** * Madde 3b: Nuxt 3 otomatik içe aktarma.
 * Fiyat formatlama ve emit tanımı.
 */
defineEmits<{
  (e: 'checkout'): void
}>();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('tr-TR', { 
    minimumFractionDigits: 2 
  }).format(price) + ' TL';
};
</script>

<template>
  <div class="cart-summary">
    <h3 class="summary-title">Sepetin Özeti</h3>

    <div class="order-table">
      <div class="row">
        <span>Ürünler</span>
        <span>{{ formatPrice(summaryData.subtotal) }}</span>
      </div>
      <div class="row">
        <span>İndirim</span>
        <span>- {{ formatPrice(summaryData.discount) }}</span>
      </div>
      <div class="row shipping-info">
        <span>1750 TL Üzeri Kargo Bedava</span>
        <span>{{ formatPrice(summaryData.shipping) }}</span>
      </div>
    </div>

    <div class="total">
      <span>Toplam</span>
      <span class="total-price">{{ formatPrice(summaryData.total) }}</span>
    </div>

    <button class="checkout-btn" @click="$emit('checkout')">
      SEPETİ ONAYLA
    </button>
  </div>
</template>
<style scoped>
.cart-summary { 
  background: #fff; 
  border-radius: 12px; 
  padding: 20px; 
  border: 1px solid #e5e5e5; 
}

.summary-title { 
  margin: 0 0 16px 0; 
  font-size: 1.1em; 
  font-weight: 700;
  color: #333; 
  border-bottom: 1px solid #f0f0f0; 
  padding-bottom: 12px; 
}

.order-table { 
  margin: 16px 0; 
  font-size: 14px; 
}

.row { 
  display: flex; 
  justify-content: space-between; 
  padding: 8px 0; 
  color: #555; 
}

.row.shipping-info { 
  font-size: 13px; 
  color: #777;
  border-top: 1px solid #f0f0f0;
  margin-top: 8px;
  padding-top: 12px;
}

.total { 
  display: flex; 
  justify-content: space-between; 
  margin-top: 12px; 
  padding-top: 16px; 
  border-top: 2px solid #f0f0f0; 
  font-weight: 800; 
  font-size: 1.2em; 
  color: #222; 
}

.total-price { 
  color: #e74c3c; 
}

.checkout-btn { 
  width: 100%; 
  margin-top: 16px;
  background: #FF6600;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
}

.checkout-btn:hover {
  background: #E55A00;
}

.flo-section {
  margin-top: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
}

.flo-brand {
  font-weight: 700;
  font-size: 1.1em;
  color: #333;
  margin-bottom: 8px;
}

.flo-product {
  color: #666;
  font-size: 0.95em;
  line-height: 1.4;
  margin-bottom: 8px;
}

.flo-prices {
  display: flex;
  gap: 12px;
}

.flo-price {
  font-weight: 700;
  color: #e74c3c;
  font-size: 1em;
}
</style>