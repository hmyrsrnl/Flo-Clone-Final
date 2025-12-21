<script setup lang="ts">
//Interface kullanımı.
interface LoginData {
  email: string;
  password: string;
}

const activeTab = ref('login')
const loginData = ref<LoginData>({
  email: '',
  password: '' 
})

const emit = defineEmits<{
  (e: 'login', data: LoginData): void
  (e: 'social-login', provider: string): void
}>()

const onLogin = () => emit('login', loginData.value)
const onSocialLogin = (provider: string) => emit('social-login', provider)
</script>

<template>
  <div class="login-form">
    <div class="login-header">
      <h2>Merhaba,</h2>
      <p>Giriş yap veya Hesap Oluştur, fırsatları kaçırma!</p>
    </div>

    <div class="tab-buttons">
      <button :class="['tab-button', activeTab === 'login' ? 'active' : '']" @click="activeTab = 'login'">Giriş
        Yap</button>
      <NuxtLink to="/signup" class="tab-button">Üye Ol</NuxtLink>
    </div>

    <div v-if="activeTab === 'login'" class="form-content">
      <AtomsInput v-model="loginData.email" placeholder="E-Posta Adresi" />
      <AtomsInput v-model="loginData.password" placeholder="Şifre" type="password" />
      <AtomsButton @click="onLogin" variant="primary" class="full-width">GİRİŞ YAP</AtomsButton>

      <div class="social-buttons">
        <AtomsButton @click="onSocialLogin('google')" variant="outline" class="google-button">Google</AtomsButton>
        <AtomsButton @click="onSocialLogin('apple')" variant="outline" class="apple-button">Apple</AtomsButton>
        <AtomsButton @click="onSocialLogin('facebook')" variant="outline" class="facebook-button">Facebook</AtomsButton>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.login-header {
  text-align: center;
  margin-bottom: 24px;
}

.login-header h2 {
  color: #000;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 600;
}

.login-header p {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.tab-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  border: 1px solid #e0e0e0;
}

.tab-button {
  background: #f8f8f8;
  border: none;
  padding: 14px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-button.active {
  background: white;
  color: #FF6600;
  font-weight: 600;
}

.tab-button:hover:not(.active) {
  background: #f0f0f0;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  margin-bottom: 8px;
}

.form-input {
  margin-bottom: 0;
}

.login-btn {
  margin: 8px 0;
  font-weight: 600;
  font-size: 16px;
  padding: 14px;
}

.divider {
  text-align: center;
  position: relative;
  margin: 10px 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e0e0e0;
  z-index: 1;
}

.divider span {
  background: white;
  padding: 0 16px;
  color: #666;
  font-size: 14px;
  position: relative;
  z-index: 2;
}

.privacy-note {
  font-size: 12px;
  color: #666;
  text-align: center;
  line-height: 1.5;
  margin-top: 20px;
}

.full-width {
  width: 100%;
}

.social-login {
  margin-top: 14px;
}

.social-buttons {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.social-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  height: 70px;
  font-size: 12px;
}

.google-button {
  border-color: #db4437;
  color: #db4437;
}

.google-button:hover:not(:disabled) {
  background-color: #f8eae9;
}

.apple-button {
  border-color: #000;
  color: #000;
}

.apple-button:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.facebook-button {
  border-color: #1877f2;
  color: #1877f2;
}

.facebook-button:hover:not(:disabled) {
  background-color: #eef4ff;
}
</style>