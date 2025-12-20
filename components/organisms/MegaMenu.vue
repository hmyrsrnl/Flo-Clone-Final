<template>
  <div 
    class="mega-menu" 
    @mouseenter="openMenu"
    @mouseleave="closeMenu"
  >
    <div class="menu-trigger">
      <slot name="trigger">
        <span>{{ title }}</span>
      </slot>
    </div>

    <div 
      v-if="isOpen && menuData" 
      class="mega-menu-content"
    >
      <div class="menu-grid">
        <div 
          class="menu-column" 
          v-for="(group, index) in menuData" 
          :key="`group-${index}`"
          :class="{ 'brands-section': group.title === 'Markalar' || group.title === 'Popüler Markalar' }"
        >
          <h4 class="column-title">{{ group.title }}</h4>
          
          <div v-if="group.title !== 'Markalar'" class="column-items">
            <NuxtLink 
              v-for="(item, itemIndex) in group.items" 
              :key="itemIndex"
              :to="`/category/${item.toLowerCase()}`" 
              class="menu-item"
            >
              {{ item }}
            </NuxtLink>
          </div>

          <div v-else class="brands-grid">
            <NuxtLink 
              v-for="(brand, brandIndex) in group.items" 
              :key="brandIndex"
              :to="`/brand/${brand.toLowerCase()}`"
              class="brand-item"
            >
              {{ brand }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  menuData: { type: Array, required: true } 
})

const isOpen = ref(false)
let closeTimeout = null

const openMenu = () => {
  if (closeTimeout) clearTimeout(closeTimeout)
  isOpen.value = true
}

const closeMenu = () => {
  closeTimeout = setTimeout(() => {
    isOpen.value = false
  }, 150)
}
</script>

<style scoped>

.mega-menu { position: relative; display: inline-block; }
.mega-menu-content {
  position: absolute;
  top: 100%;
  left: -150px; 
  background: white;
  border: 1px solid #e8e8e8;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  width: 1000px;
  z-index: 1000;
  padding: 24px;
  display: block;
}
.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 32px;
}
.column-title {
  font-size: 14px;
  font-weight: 700;
  border-bottom: 2px solid #FF6600;
  margin-bottom: 15px;
  padding-bottom: 5px;
}
.menu-item { display: block; padding: 5px 0; color: #666; font-size: 14px; }
.menu-item:hover { color: #FF6600; }

.brands-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.brand-item {
  background: #f8f8f8;
  padding: 8px;
  text-align: center;
  border-radius: 4px;
  font-size: 12px;
}
</style>