<script setup lang="ts">
// Madde 3a: Gelen verinin tipini tanımlayın
interface MenuItem {
  title: string;
  items: string[];
}

defineProps<{
  title: string;
  menuData: MenuItem[];
}>();
</script>

<template>
  <div class="mega-menu-item">
    <span class="menu-title">{{ title }}</span>
    <div class="mega-menu-dropdown">
      <div v-for="group in menuData" :key="group.title" class="menu-group">
        <h4>{{ group.title }}</h4>
        <ul>
          <li v-for="item in group.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mega-menu {
  position: relative;
  display: inline-block;
}

.menu-trigger {
  padding: 8px 16px;
  cursor: pointer;
  color: #333;
  font-weight: 600;
  font-size: 15px;
  transition: color 0.2s;
}

.menu-trigger:hover {
  color: #FF6600;
}

.mega-menu-content {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  width: calc(1200px - 40px);
  min-width: 1000px;
  z-index: 1000;
  padding: 24px;
  animation: fadeIn 0.2s ease;
  text-align: left; 
}
.mega-menu-dropdown {
  display: none; /* Varsayılan olarak gizle */
  position: absolute;
  top: 100%;
  left: 0;
  width: 800px; /* Genişliği sabitle ki yazılar üst üste binmesin */
  background: white;
  z-index: 999;
  display: flex; /* İçerikleri yan yana diz */
  gap: 30px;
  padding: 20px;
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  visibility: hidden; /* Hover yokken gizli tut */
  opacity: 0;
}

.mega-menu-container:hover .mega-menu-dropdown {
  visibility: visible;
  opacity: 1;
  display: flex; /* Üzerine gelince göster */
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 32px;
}

.menu-column {
  display: flex;
  flex-direction: column;
}

.column-title {
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #FF6600;
}

.column-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  padding: 4px 0;
  line-height: 1.4;
}

.menu-item:hover {
  color: #FF6600;
}

.brands-section {
  grid-column: span 2;
}

.brands-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  grid-auto-rows: auto;
  gap: 8px;
}

.brand-item {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  padding: 8px 12px;
  background: #f8f8f8;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
}

.brand-item:hover {
  color: #FF6600;
  background: #fff5f0;
  border-color: #FF6600;
  transform: translateY(-1px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>