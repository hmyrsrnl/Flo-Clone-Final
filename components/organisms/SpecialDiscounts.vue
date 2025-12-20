<script setup lang="ts">
import type { IProduct } from '~/types'

interface Props {
  products: IProduct[];
  itemsPerSlide?: number;
}

const props = withDefaults(defineProps<Props>(), {
  products: () => [],
  itemsPerSlide: 2
});

const currentSlide = ref(0);
const activeDropdownId = ref<string | number | null>(null);

const emit = defineEmits<{
  (e: 'add-to-cart', product: IProduct): void;
  (e: 'size-change', payload: { productId: string | number, size: string | number }): void;
}>();

const chunkedProducts = computed(() => {
  const chunks = [];
  const limitedProducts = props.products.slice(0, 4); 

  for (let i = 0; i < limitedProducts.length; i += props.itemsPerSlide) {
    chunks.push(limitedProducts.slice(i, i + props.itemsPerSlide));
  }
  return chunks;
});

const totalSlides = computed(() => chunkedProducts.value.length);

const formatPrice = (price: number | string) => {
  return new Intl.NumberFormat('tr-TR', { 
    minimumFractionDigits: 2 
  }).format(Number(price)) + ' TL';
};

const handleSizeChange = (productId: string | number, size: string | number) => {
  emit('size-change', { productId, size });
  activeDropdownId.value = null;
};

const toggleDropdown = (productId: string | number) => {
  activeDropdownId.value = activeDropdownId.value === productId ? null : productId;
};

const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) currentSlide.value++;
};

const prevSlide = () => {
  if (currentSlide.value > 0) currentSlide.value--;
};
</script>

<template>
  <div class="special-discounts">
    <div class="section-header">
      <h2 class="section-title">Sepetine Özel İndirimler</h2>
      <div class="slider-controls">
        <button @click="prevSlide" class="slider-btn prev" :disabled="currentSlide === 0">‹</button>
        <span class="slide-indicator">{{ currentSlide + 1 }}/{{ totalSlides }}</span>
        <button @click="nextSlide" class="slider-btn next" :disabled="currentSlide === totalSlides - 1">›</button>
      </div>
    </div>
    
    <div class="slider-container">
      <div class="slider-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div v-for="(slide, slideIndex) in chunkedProducts" :key="slideIndex" class="slide">
          <div class="discount-products-grid">
            <div v-for="product in slide" :key="product.id" class="discount-product-card">
              <div class="product-brand">{{ product.brand }}</div>
              
              <div class="product-content">
                <div class="product-image-section special-discount-image">
                  <AtomsProductImage :image-url="product.imageUrl" :product-name="product.name" />
                </div>
                
                <div class="product-details">
                  <p class="product-name">{{ product.name }}</p>
                  <p class="discount-badge">Sepetine Özel İndirim</p>
                  
                  <div class="price-section">
                    <span class="old-price" v-if="product.oldPrice">{{ formatPrice(product.oldPrice) }}</span>
                    <span class="current-price">{{ formatPrice(product.price) }}</span>
                  </div>
                </div>
                
                <div class="product-actions">
                  <div class="size-section">
                    <div class="custom-dropdown">
                      <div class="dropdown-header" @click="toggleDropdown(product.id)">
                        <span class="selected-label">Beden: {{ product.selectedSize || 'Seç' }}</span>
                        <span class="chevron" :class="{ 'rotate': activeDropdownId === product.id }">⌄</span>
                      </div>
                      <transition name="fade">
                        <ul v-if="activeDropdownId === product.id" class="dropdown-list">
                          <li 
                            v-for="size in (product.sizes || [])" 
                            :key="size"
                            :class="{ 'active': size === product.selectedSize }"
                            @click="handleSizeChange(product.id, size)"
                          >
                            {{ size }}
                          </li>
                        </ul>
                      </transition>
                    </div>
                  </div>
                  
                  <AtomsButton variant="primary" size="small" @click="$emit('add-to-cart', product)">
                    Sepete Ekle
                  </AtomsButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.special-discounts {
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  position: relative;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.section-title {
  margin: 0;
  font-size: 1.3em;
  font-weight: 700;
  color: #333;
}

.slider-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.slider-btn:hover:not(:disabled) {
  background: #f5f5f5;
  border-color: #ccc;
}

.slider-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.slide-indicator {
  font-size: 0.9em;
  color: #666;
  font-weight: 600;
}

.slider-container {
  overflow: hidden;
  border-radius: 8px;
  padding: 0 16px;
}

.slider-track {
  display: flex;
  transition: transform 0.3s ease;
}

.slide {
  flex: 0 0 100%;
  min-width: 100%;
}

.discount-products-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
}

.discount-product-card {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 16px;
  background: #fafafa;
}

.product-brand {
  font-weight: 700;
  font-size: 1.1em;
  color: #333;
  margin-bottom: 8px;
}

.product-content {
  display: flex;
  gap: 1px;
  align-items: flex-start;
}

.special-discount-image {
  flex-shrink: 0;
  width: 100px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.special-discount-image .product-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.special-discount-image .image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 6px;
  background: #f8f8f8;
}

.product-details {
  flex: 1;
}

.product-name {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 0.9em;
  line-height: 1.4;
}

.discount-badge {
  color: #e67e22;
  font-size: 0.8em;
  font-weight: 600;
  margin-bottom: 8px;
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.85em;
}

.current-price {
  font-weight: 700;
  color: #e74c3c;
  font-size: 1em;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 100px;
}

.size-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.size-label {
  font-size: 0.8em;
  color: #666;
  font-weight: 500;
}

.size-selector {
  width: 100%;
  padding: 6px 8px;
  font-size: 12px;
}

.add-to-cart-btn {
  width: 100%;
  font-size: 0.85em;
  padding: 8px 12px;
}

.slider-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.slider-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: #ddd;
  cursor: pointer;
  transition: background 0.3s ease;
}

.slider-dot.active {
  background: #FF6600;
}

.slider-dot:hover {
  background: #ccc;
}

@media (max-width: 768px) {
  .discount-products-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .section-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .slider-controls {
    align-self: flex-end;
  }

  .product-content {
    flex-direction: column;
    gap: 10px;
  }

  .product-actions {
    flex-direction: row;
    width: 100%;
  }

  .size-section {
    flex: 1;
  }

  .add-to-cart-btn {
    flex: 1;
  }

  .special-discount-image {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .special-discounts {
    padding: 16px;
  }

  .discount-product-card {
    padding: 12px;
  }
}

.custom-dropdown {
  position: relative;
  width: 100%;
  user-select: none;
  margin-bottom: 8px;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  background: #fdfdfd;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.selected-label {
  color: #ff6000;
  font-weight: 600;
}

.chevron {
  transition: transform 0.2s;
  color: #ff6000;
  font-weight: bold;
}

.chevron.rotate {
  transform: rotate(180deg);
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 100;
  padding: 0;
  list-style: none;
  margin-top: 2px;
  max-height: 150px;
  overflow-y: auto;
}

.dropdown-list li {
  padding: 8px 12px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  border-bottom: 1px solid #f9f9f9;
}

.dropdown-list li:hover, .dropdown-list li.active {
  background: #fff5f0;
  color: #ff6000;
  font-weight: 600;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>