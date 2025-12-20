<script setup lang="ts">
const route = useRoute()
const router = useRouter();
const productStore = useProductStore()
const cartStore = useCartStore()

const selectedSize = ref<string | number | null>(null)

onMounted(async () => {
  const productId = route.params.id as string
  await productStore.fetchProductById(productId)
})

const handleAddToCart = async () => {
  if (productStore.currentProduct && selectedSize.value) {
    console.log("Sepete ekleniyor..."); 
    await cartStore.addToCart(productStore.currentProduct, selectedSize.value);
    router.push('/cart');
  } else {
    alert("Lütfen önce bir beden seçin!");
  }
};
</script>

<template>
  <div class="product-detail-page" v-if="productStore.currentProduct">
    <div class="container">
      <nav class="breadcrumb">
        <span>Anasayfa</span> / <span>{{ productStore.currentProduct.category || 'Ayakkabı' }}</span> /
        <span class="current">{{ productStore.currentProduct.name }}</span>
      </nav>

      <div class="product-detail">
        <div class="product-gallery">
          <div class="gallery-grid">
            <div class="gallery-item" v-if="productStore.currentProduct.imageUrl">
              <img :src="productStore.currentProduct.imageUrl" :alt="productStore.currentProduct.name" />
            </div>

            <div v-for="(img, idx) in productStore.currentProduct.images" :key="idx" class="gallery-item">
              <img :src="img" :alt="productStore.currentProduct.name" />
            </div>
          </div>
        </div>

        <div class="product-info">
          <h1 class="product-title">{{ productStore.currentProduct.name }}</h1>

          <div class="rating-favorite">
            <div class="rating">
              <AtomsRatingStars :rating="productStore.currentProduct.rating"
                :review-count="productStore.currentProduct.reviewCount" />
            </div>
            <div class="favorite-info">
              <span class="favorite-badge"></span>
            </div>
          </div>

          <div class="prices">
            <span class="current-price">{{ productStore.currentProduct.price }} TL</span>
          </div>

          <div class="installment-info">
            <p>Aylık Taksit Seçeneklerini İnceleyin</p>
            <div class="bank-logos">
              <span class="bank-logo">Akbank</span>
              <span class="bank-logo">World</span>
            </div>
          </div>

          <hr class="divider">

          <div v-if="productStore.currentProduct.colors && productStore.currentProduct.colors.length > 0"
            class="color-selection">
            <div class="color-header">
              <span class="color-label">Renk: <strong>{{ productStore.currentProduct.color || 'Seçiniz'
              }}</strong></span>
              <span class="variant-count">{{ productStore.currentProduct.colors.length }} farklı
                renk</span>
            </div>

            <div class="color-options-container">
              <div v-for="(variant, index) in productStore.currentProduct.colors" :key="index"
                :class="['color-variant-box', { 'selected': productStore.currentProduct.id === variant.productId }]"
                @click="navigateTo(`/product/${variant.productId}`)">
                <img :src="variant.image" :alt="variant.name" class="color-variant-img" />
              </div>
            </div>
          </div>

          <div class="selector-section">
            <AtomsSizeSelector :sizes="productStore.currentProduct.sizes" :selected-size="selectedSize"
              @size-change="(val) => selectedSize = val" />
          </div>

          <button class="add-to-cart-btn" @click="handleAddToCart" :disabled="!selectedSize">
            {{ selectedSize ? 'Sepete Ekle' : 'Beden Seçiniz' }}
          </button>

          <div class="shipping-info">
            <p>Kargo Bedava!</p>
          </div>

          <hr class="divider">
          <div class="extra-info-container">
            <div class="seller-card">
              <div class="seller-header">
                <div class="seller-brand-group">
                  <div class="flo-logo-badge">FLO</div>
                  <div class="seller-text">
                    <span class="s-name">FLO </span>
                    <span class="s-followers">305.643 Takipçi</span>
                  </div>
                </div>
                <AtomsButton class="follow-btn">Takip Et</AtomsButton>
              </div>
              <ul class="benefit-list">
                <li>Flo Plus ile harcadıkça kazan!</li>
                <li>%100 Orijinal Ürün Garantisi</li>
                <li>30 Gün İçinde İade Avantajı</li>
                <li>Mağazadan Teslimat Seçeneği</li>
                <li>Mağazadan Ücretsiz İade</li>
                <li>7/24 Müşteri Hizmetleri Desteği</li>
                <li>6 Taksit Seçeneği</li>
              </ul>
              <AtomsButton class="all-seller-btn">Satıcının Tüm Ürünleri</AtomsButton>
            </div>

            <div class="store-availability">
              <div class="store-header">
                <span>Mağaza Stok Durumu</span>
                <span class="arrow-icon">></span>
              </div>
              <p>Ürünün hangi mağazalarda olduğunu görmek için tıklayınız.</p>
            </div>
          </div>

          <div class="specs-section" v-if="productStore.currentProduct">
            <h2 class="specs-title">Ürün Özellikleri ve Açıklaması</h2>

            <div class="specs-grid">
              <div class="spec-badge">
                <span>Marka:</span> <strong>{{ productStore.currentProduct.brand }}</strong>
              </div>

              <div class="spec-badge">
                <span>Kategori:</span> <strong>{{ productStore.currentProduct.category }}</strong>
              </div>

              <div class="spec-badge">
                <span>Cinsiyet:</span>
                <strong>{{ Array.isArray(productStore.currentProduct.gender) ?
                  productStore.currentProduct.gender.join('/ ') : productStore.currentProduct.gender }}</strong>
              </div>

              <div class="spec-badge">
                <span>Renk:</span> <strong>{{ productStore.currentProduct.color }}</strong>
              </div>

              <template v-for="(featureObj, index) in productStore.currentProduct.features" :key="index">
                <div v-for="(value, key) in featureObj" :key="key" class="spec-badge">
                  {{ key }}: <strong>{{ value }}</strong>
                </div>
              </template>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.extra-info-container {
  margin-top: 25px;
  border-top: 1px solid #f0f0f0;
  padding-top: 20px;
}

.seller-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.seller-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.seller-brand-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.flo-logo-badge {
  background: #ff6000;
  color: #fff;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 10px;
}

.benefit-list {
  list-style: none;
  padding: 12px 0;
  margin: 0;
}

.benefit-list li {
  font-size: 12px;
  color: #555;
  margin-bottom: 6px;
}

.check-icon {
  color: #27ae60;
  margin-right: 5px;
  font-weight: bold;
}

.store-availability {
  border-top: 1px solid #eee;
  padding-top: 15px;
  cursor: pointer;
}

.store-header {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 13px;
}

.store-availability p {
  font-size: 11px;
  color: #888;
  margin-top: 4px;
}

.specs-section {
  margin-top: 40px;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
}

.specs-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.spec-badge {
  background: #fff3eb;
  color: #ff6000;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 12px;
}

/* Beden Klavuzu Bölümü */
.size-guide-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 30px;
}

.size-guide-card img {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 8px;
}

.color-selection {
  margin: 20px 0;
}

.color-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
}

.color-label strong {
  color: #333;
}

.variant-count {
  color: #888;
  font-size: 12px;
}

.color-options-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.color-variant-box {
  width: 70px;
  height: 90px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  cursor: pointer;
  padding: 4px;
  background: #fff;
  transition: all 0.2s ease;
}

.color-variant-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.color-variant-box.selected {
  border: 2px solid #ff6000;
  box-shadow: 0 0 4px rgba(255, 96, 0, 0.1);
}

.color-variant-box:hover:not(.selected) {
  border-color: #bbb;
}

.product-detail-page {
  padding: 20px 0;
  background: white;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumb {
  display: flex;
  gap: 8px;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 20px;
}

.breadcrumb .current {
  color: #333;
  font-weight: 500;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;
}

.product-gallery {
  display: flex;
  flex-direction: column;
}

.gallery-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15px;
}

.gallery-item {
  border: 2px solid #e5e5e5;
  border-radius: 12px;
  padding: 10px;
  background: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  min-height: 200px;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.product-info {
  padding: 20px 0;
}

.product-title {
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
  line-height: 1.3;
}

.rating-favorite {
  margin-bottom: 20px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.rating-value {
  font-weight: 700;
  color: #333;
}

.stars {
  color: #FFA500;
}

.review-count {
  color: #666;
  font-size: 0.9em;
}

.favorite-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.favorite-badge {
  color: #e74c3c;
  font-weight: 500;
}

.favorite-count {
  color: #666;
  font-size: 0.9em;
}

.prices {
  margin-bottom: 20px;
}

.original-price {
  font-size: 1.2em;
  color: #999;
  text-decoration: line-through;
  margin-right: 10px;
}

.current-price {
  font-size: 2em;
  font-weight: 700;
  color: #e74c3c;
}

.installment-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.installment-info p {
  margin: 0 0 10px 0;
  color: #333;
  font-weight: 500;
}

.bank-logos {
  display: flex;
  gap: 10px;
}

.bank-logo {
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  font-weight: 500;
  border: 1px solid #ddd;
}

.divider {
  border: none;
  border-top: 1px solid #e5e5e5;
  margin: 25px 0;
}

.color-selection {
  margin-bottom: 25px;
}

.color-selection h3 {
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.color-options {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.color-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid transparent;
}

.color-option:hover {
  transform: translateY(-2px);
}

.color-option.selected {
  border-color: #e74c3c;
  background-color: #fdf2f2;
}

.color-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e5e5e5;
  margin-bottom: 8px;
}

.color-option.selected .color-image {
  border-color: #e74c3c;
}

.color-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.color-name {
  font-size: 0.9em;
  color: #666;
  font-weight: 500;
}

.color-option.selected .color-name {
  color: #e74c3c;
  font-weight: 600;
}

.size-selection {
  margin-bottom: 25px;
}

.size-selection h3 {
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.size-options {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.size-option {
  padding: 10px 15px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.size-option:hover {
  border-color: #999;
}

.size-option.selected {
  border-color: #e74c3c;
  background: #e74c3c;
  color: white;
}

.add-to-cart-section {
  margin-bottom: 20px;
}

.add-to-cart-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  transition: background 0.3s ease;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #c0392b;
}

.add-to-cart-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.wishlist-count {
  text-align: center;
  color: #666;
  font-size: 0.9em;
  margin: 0;
}

.shipping-info {
  background: #e8f5e8;
  padding: 12px 15px;
  border-radius: 6px;
  border-left: 4px solid #27ae60;
  margin-bottom: 25px;
}

.shipping-info p {
  margin: 0;
  color: #2e7d32;
  font-weight: 500;
}

.product-tabs {
  border-top: 1px solid #e5e5e5;
  padding-top: 20px;
}

.tab-nav {
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 20px;
}

.tab-btn {
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab-btn.active {
  border-bottom-color: #e74c3c;
  color: #e74c3c;
  font-weight: 600;
}

.tab-pane {
  padding: 20px 0;
}

@media (max-width: 768px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .color-options {
    gap: 10px;
  }

  .color-image {
    width: 50px;
    height: 50px;
  }
}
</style>