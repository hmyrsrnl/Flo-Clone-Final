<script setup lang="ts">
interface Category {
  label: string;
  value: string;
}

interface Props {
  categories: Category[];
}

const props = defineProps<Props>();

// Filtre durumu
const selectedFilters = reactive({
  categories: [] as string[],
  brands: [] as string[],
  sizes: [] as string[],
  priceRange: { min: 0, max: 10000 }
});

const sizes = ['36', '37', '38', '39', '40', '41', '42', '43'];
const brands = ['Lumberjack', 'Nike', 'Adidas', 'Puma', 'Kinetix', 'Reebok', 'Butigo'];

const emit = defineEmits<{
  (e: 'filter-change', filters: typeof selectedFilters): void
}>();

const handleFilterChange = () => {
  emit('filter-change', { ...selectedFilters });
};

const toggleSize = (size: string) => {
  const index = selectedFilters.sizes.indexOf(size);
  if (index > -1) selectedFilters.sizes.splice(index, 1);
  else selectedFilters.sizes.push(size);
  handleFilterChange();
};

const clearAllFilters = () => {
  selectedFilters.categories = [];
  selectedFilters.brands = [];
  selectedFilters.sizes = [];
  selectedFilters.priceRange = { min: 0, max: 10000 };
  handleFilterChange();
};
</script>

<template>
  <div class="product-filter">
    <div class="filter-header-main">
      <h3 class="main-title">Filtrele</h3>
      <button @click="clearAllFilters" class="clear-all-btn">Temizle</button>
    </div>

    <div class="filter-section">
      <h4 class="filter-title">Kategori</h4>
      <div class="filter-options">
        <label v-for="category in categories" :key="category.value" class="filter-option">
          <input type="checkbox" :value="category.value" v-model="selectedFilters.categories"
            @change="handleFilterChange">
          <span class="checkmark"></span>
          {{ category.label }}
        </label>
      </div>
    </div>

    <div class="filter-section">
      <h4 class="filter-title">Marka</h4>
      <div class="filter-options">
        <label v-for="brand in brands" :key="brand" class="filter-option">
          <input type="checkbox" :value="brand" v-model="selectedFilters.brands" @change="handleFilterChange">
          <span class="checkmark"></span>
          {{ brand }}
        </label>
      </div>
    </div>

    <div class="filter-section">
      <h4 class="filter-title">Beden</h4>
      <div class="size-options">
        <button v-for="size in sizes" :key="size"
          :class="['size-option', { active: selectedFilters.sizes.includes(size) }]" @click="toggleSize(size)">
          {{ size }}
        </button>
      </div>
    </div>

    <div class="filter-section">
      <h4 class="filter-title">Fiyat Aralığı</h4>
      <div class="price-inputs">
        <input type="number" v-model.number="selectedFilters.priceRange.min" placeholder="Min" class="price-input"
          @change="handleFilterChange">
        <span class="price-separator">-</span>
        <input type="number" v-model.number="selectedFilters.priceRange.max" placeholder="Max" class="price-input"
          @change="handleFilterChange">
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-filter {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.filter-header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.main-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
}

.clear-all-btn {
  font-size: 12px;
  color: #FF6600;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}

.filter-section {
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.filter-title {
  font-size: 13px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #555;
}

.filter-option input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 4px;
  position: relative;
  transition: 0.2s;
}

.filter-option input:checked+.checkmark {
  background: #FF6600;
  border-color: #FF6600;
}

.filter-option input:checked+.checkmark::after {
  content: '✓';
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 11px;
}

.size-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.size-option {
  height: 36px;
  border: 1px solid #eee;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  transition: 0.2s;
}

.size-option.active {
  background: #FF6600;
  color: white;
  border-color: #FF6600;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
}

.price-input:focus {
  border-color: #FF6600;
}
</style>