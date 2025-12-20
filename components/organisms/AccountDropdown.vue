<script setup lang="ts">
//Nuxt 3 otomatik içe 
const authStore = useAuthStore() 
const isOpen = ref(false)
let closeTimeout: ReturnType<typeof setTimeout> | null = null

const openDropdown = () => {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  isOpen.value = true
}

const closeDropdown = () => {
  closeTimeout = setTimeout(() => {
    isOpen.value = false
  }, 150)
}

const handleLogout = () => {
  authStore.logout() 
  isOpen.value = false
  navigateTo('/login') 
}
</script>

<template>
  <div 
    class="account-dropdown" 
    @mouseenter="openDropdown" 
    @mouseleave="closeDropdown"
  >
    <div class="dropdown-trigger">
      <slot name="trigger">
        <div class="nav-item">
          <span>{{ authStore.user ? 'Hesabım' : 'Giriş Yap' }}</span>
        </div>
      </slot>
    </div>

    <div v-if="isOpen" class="dropdown-menu">
      <div class="menu-item campaign">
        <div class="campaign-title">Flo Plus ile Hızlı Öde Harcadıkça Kazan!</div>
        <div class="campaign-subtitle">Doğum Gününe Özel Fırsatlar</div>
      </div>
      <div class="menu-divider"></div>
      <div class="menu-section">
        <div class="menu-item">Tüm Siparişlerim</div>
        
        <NuxtLink to="/profile" class="menu-item" @click="closeDropdown">
          Kullanıcı Bilgilerim
        </NuxtLink>
        
        <div class="menu-divider"></div>
        <div class="menu-item" @click="handleLogout">Çıkış</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  cursor: pointer;
}

.nav-item {
  padding: 8px 16px;
  color: #444;
  font-size: 13px;
}

.nav-item:hover {
  color: #FF6600;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 280px;
  z-index: 1000;
  margin-top: 8px;
  animation: fadeIn 0.2s ease;
}

.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -8px;
  right: 20px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
  z-index: 1001;
}

.menu-item {
  padding: 12px 16px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f8f8f8;
  color: #FF6600;
}

.menu-item.campaign {
  background-color: #fff5f0;
  cursor: default;
}

.campaign-title {
  font-weight: 600;
  color: #FF6600;
  font-size: 14px;
  margin-bottom: 4px;
}

.campaign-subtitle {
  color: #666;
  font-size: 13px;
}

.menu-divider {
  height: 1px;
  background-color: #e8e8e8;
  margin: 8px 0;
}

.section-title {
  padding: 12px 16px 8px;
  color: #666;
  font-size: 13px;
  font-weight: 600;
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