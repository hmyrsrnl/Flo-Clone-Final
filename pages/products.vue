<script setup lang="ts">
const route = useRoute()
const productStore = useProductStore()
onMounted(async () => {
  await productStore.fetchProducts()
})

const onFilterUpdate = async (newFilters: any) => {
  await productStore.fetchFilteredProducts({
    ...newFilters,
    gender: route.params.id || '' 
  })
}

onMounted(async () => {
  await productStore.fetchProducts()
  await productStore.fetchFilteredProducts({ 
    categories: [], 
    brands: [], 
    sizes: [] 
  })
})
</script>

<template>
  <div class="product-listing-page">
    <div class="container">
      <div class="page-layout">
        <aside class="filter-sidebar">
          <OrganismsProductFilter 
            :categories="productStore.filterCategories"
            @filter-change="onFilterUpdate" 
          />
        </aside>

        <main class="product-content">
          <div class="results-info">
            <span>{{ productStore.filteredProducts.length }} ürün listeleniyor</span>
          </div>
          
          <OrganismsProductGrid 
            :products="productStore.filteredProducts" 
          />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-listing-page {
  padding: 20px 0;
  background: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: start;
}

.filter-sidebar {
  position: sticky;
  top: 20px;
}

.product-content {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.page-title {
  font-size: 1.8em;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.results-info {
  font-size: 14px;
  color: #666;
}

@media (max-width: 768px) {
  .product-listing-page {
    padding: 15px 0;
  }
  
  .container {
    padding: 0 15px;
  }
  
  .page-layout {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .filter-sidebar {
    position: static;
    order: 2;
  }
  
  .product-content {
    order: 1;
    padding: 16px;
  }
  
  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .page-title {
    font-size: 1.5em;
  }
}
</style>