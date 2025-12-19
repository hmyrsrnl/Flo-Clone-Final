<script setup lang="ts">
/** * Madde 3b: Sadece 'use' ile başlayan importlar.
 * onMounted gibi Vue core fonksiyonları Nuxt 3'te otomatik import edilir.
 */
const authStore = useAuthStore()

// Sayfa yüklendiğinde mevcut kullanıcı verilerini Firestore'dan çek
onMounted(async () => {
  await authStore.fetchUserProfile()
})

const handleUpdateProfile = async () => {
  const success = await authStore.updateUserProfile()
  if (success) {
    alert('Bilgileriniz başarıyla güncellendi!')
  }
}

const handleLogout = () => {
  authStore.logout()
  navigateTo('/login') // Madde 2a: Çıkış sonrası yönlendirme
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-container">
      <div class="profile-header">
        <h1>Kullanıcı Bilgilerim</h1>
      </div>

      <div class="profile-content">
        <div class="profile-sidebar">
          <nav class="sidebar-menu">
            <div class="menu-item active">Kullanıcı Bilgilerim</div>
            <div class="menu-item">Tüm Siparişlerim</div>
            <div class="menu-item">FLO Plus</div>
            <div class="menu-item">Adres Bilgilerim</div>
            <div class="menu-item logout" @click="handleLogout">Çıkış</div>
          </nav>
        </div>

        <div class="profile-main">
          <div v-if="authStore.userProfile" class="two-column-layout">
            <div class="column-left">
              <div class="user-info-section">
                <h2>Kullanıcı Bilgilerim</h2>
                <div class="info-card">
                  <div class="info-row">
                    <div class="info-label-group">
                      <label class="info-label">Ad</label>
                      <input type="text" v-model="authStore.userProfile.firstName" class="info-input">
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="info-label-group">
                      <label class="info-label">Soyad</label>
                      <input type="text" v-model="authStore.userProfile.lastName" class="info-input">
                    </div>
                  </div>
                  <div class="info-row">
                    <label class="info-label">Cinsiyet</label>
                    <div class="gender-selection">
                      <button 
                        type="button"
                        :class="['gender-btn', authStore.userProfile.gender === 'female' ? 'active' : '']"
                        @click="authStore.userProfile.gender = 'female'"
                      >Kadın</button>
                      <button 
                        type="button"
                        :class="['gender-btn', authStore.userProfile.gender === 'male' ? 'active' : '']"
                        @click="authStore.userProfile.gender = 'male'"
                      >Erkek</button>
                    </div>
                  </div>
                  <button class="update-btn" @click="handleUpdateProfile">GÜNCELLE</button>
                </div>
              </div>
            </div>

            <div class="column-right">
              <div class="user-info-section">
                <h2>İletişim Bilgileri</h2>
                <div class="info-card">
                  <div class="info-row">
                    <div class="info-label-group">
                      <label class="info-label">E-Mail</label>
                      <input type="email" v-model="authStore.userProfile.email" class="info-input" disabled>
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="info-label-group">
                      <label class="info-label">Telefon</label>
                      <input type="text" v-model="authStore.userProfile.phone" class="info-input">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="loading-state">
            <p>Bilgileriniz Firestore'dan getiriliyor...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 40px 0;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.profile-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
}

.profile-content {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
}

.profile-sidebar {
  background: white;
  border-radius: 8px;
  padding: 20px 0;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  padding: 12px 20px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background: #f8f8f8;
  color: #FF6600;
}

.menu-item.active {
  background: #fff5f0;
  color: #FF6600;
  border-left-color: #FF6600;
  font-weight: 600;
}

.menu-item.logout {
  color: #666;
  margin-top: 10px;
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.profile-main {
  background: white;
  border-radius: 8px;
  padding: 30px;
}

.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.column-left,
.column-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-info-section h2,
.password-section h2 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.info-card {
  background: #fafafa;
  border-radius: 8px;
  padding: 24px;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 15px;
}

.info-label-group {
  display: flex;
  align-items: center;
  flex: 1;
}

.info-label {
  width: 120px;
  font-weight: 500;
  color: #666;
  flex-shrink: 0;
}

.info-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
}

.info-input:focus {
  outline: none;
  border-color: #FF6600;
}

.gender-selection {
  display: flex;
  gap: 12px;
  flex: 1;
}

.gender-btn {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.gender-btn.active {
  background: #FF6600;
  color: white;
  border-color: #FF6600;
}

.verify-btn {
  padding: 8px 16px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.verify-btn:hover {
  background: #e0e0e0;
}

.password-info {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.password-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.password-label {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.password-input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
}

.password-input:focus {
  outline: none;
  border-color: #FF6600;
}

.update-btn {
  background: #FF6600;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  margin-top: 10px;
}

.update-btn:hover:not(:disabled) {
  background: #E55A00;
}

.update-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.kvkk-section {
  margin: 20px 0;
}

.kvkk-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
}

.kvkk-checkbox input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kvkk-checkbox input[type="checkbox"]:checked + .checkmark {
  background: #FF6600;
  border-color: #FF6600;
}

.kvkk-checkbox input[type="checkbox"]:checked + .checkmark::after {
  content: '✓';
  color: white;
  font-size: 12px;
  font-weight: bold;
}

@media (max-width: 1024px) {
  .two-column-layout {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .profile-content {
    grid-template-columns: 250px 1fr;
  }
}

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
  }
  
  .profile-sidebar {
    display: none; 
  }
}
</style>