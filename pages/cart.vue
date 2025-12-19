<script setup lang="ts">
// 1. Sadece 'use' ile başlayan importlar (Madde 3b)
const cartStore = useCartStore()
const productStore = useProductStore()
const orderStore = useOrderStore()

// 2. Verileri başlatma
onMounted(() => {
  productStore.fetchProducts() // Firebase'den indirimli ürünleri çek
})

// 3. Sayfa içi fonksiyonlar (Sadece store'u tetikler)
const handleCheckout = async () => {
  const isSuccess = await cartStore.checkout() // Store'daki checkout'u çağır
  if (isSuccess) {
    alert('Siparişiniz başarıyla alındı!')
    navigateTo('/') // Siparişten sonra anasayfaya dön
  }
}
</script>

<template>
  <div class="cart-page">
    <div class="cart-container" v-if="cartStore.cartItems.length > 0">
      <div class="left-column">
        <OrganismsCartItems 
          :items="cartStore.cartItems" 
          @update-quantity="(payload: any) => {
            const item = cartStore.cartItems.find((i: any) => i.id === payload.itemId);
            if (item) {
              const newQty = payload.type === 'increase' ? item.quantity + 1 : item.quantity - 1;
              cartStore.updateQuantity(item.id, item.selectedSize, newQty);
            }
          }" 
          @remove-item="(itemId: any) => {
            const item = cartStore.cartItems.find((i: any) => i.id === itemId);
            if (item) cartStore.removeFromCart(item.id, item.selectedSize);
          }"
          @update-size="(payload: any) => {
            // Dropdown'dan gelen yeni bedeni Store'a yazar
            cartStore.updateSize(payload.itemId, payload.size);
          }" 
        />

        <OrganismsSpecialDiscounts 
          :products="productStore.products.slice(0, 4)" 
          @add-to-cart="(product: any) => {
            // Seçili bedenle sepete ekle
            cartStore.addToCart(product, product.selectedSize || '38');
          }"
          @size-change="(payload: any) => {
            // Slider içindeki ürünün seçili bedenini store'da anlık güncelle
            const product = productStore.products.find(p => p.id === payload.productId);
            if (product) product.selectedSize = payload.size;
          }"
        />
      </div>

      <div class="right-column">
        <OrganismsCartSummary 
          :summary-data="{
            subtotal: cartStore.cartTotal,
            shipping: cartStore.cartTotal > 1750 ? 0 : 69.99,
            discount: 0,
            total: cartStore.cartTotal + (cartStore.cartTotal > 1750 ? 0 : 69.99)
          }" 
          :item-count="cartStore.totalItems" 
          :loading="cartStore.loading" 
          @checkout="handleCheckout" 
        />
      </div>
    </div>

    <div v-else class="empty-cart-state">
       <p>Sepetinizde ürün bulunmamaktadır.</p>
       <NuxtLink to="/" class="go-home-btn">Alışverişe Devam Et</NuxtLink>
    </div>
  </div>
</template>

<style scoped>

.empty-cart-container {
  text-align: center;
  padding: 60px 0;
}
.shopping-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 30px;
  background: #ff6000;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 700;
}

.cart-page {
  max-width: 2000px;
  margin: 0 auto;
  padding: 20px;
}

.cart-container {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  align-items: start;
}

.left-column {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  width: 1500px;
  gap: 20px;
}

.right-column {
  grid-column: 2;
  position: sticky;
  top: 20px;
}

@media (max-width: 1024px) {
  .cart-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .left-column,
  .right-column {
    grid-column: 1;
  }

  .right-column {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-page {
    padding: 16px;
  }

  .cart-container {
    gap: 16px;
  }
}
</style>