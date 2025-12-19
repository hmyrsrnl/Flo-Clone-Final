<script setup lang="ts">
import { computed } from 'vue';

/** * Madde 3b: Nuxt 3 otomatik içe aktarma özelliği sayesinde ref ve computed import edilmez.
 * Madde 3a: Form verileri için TypeScript tip tanımı yapıyoruz.
 */
const form = ref({
  phonePart1: '',
  phonePart2: '',
  email: '',
  password: '',
  gender: '',
  kvkk1: false,
  kvkk2: false
});

const activeTab = ref('register');

/** * Madde 3a: Form geçerlilik kontrolünü computed ile yönetiyoruz.
 */
const isFormValid = computed(() => {
  const valid = !!(form.value.phonePart1 && form.value.phonePart2 && form.value.email && 
                 form.value.password && form.value.gender && form.value.kvkk1 && form.value.kvkk2);
  console.log("Form Geçerli mi?:", valid, form.value); // Konsolda eksik alanı görebilirsin
  return valid;
});

// Madde 3a: Emit tanımlarını tip güvenli hale getiriyoruz.
const emit = defineEmits<{
  (e: 'submit', data: any): void
}>();

const handleSubmit = () => {
  if (isFormValid.value) {
    const fullPhone = `0 (${form.value.phonePart1}) ${form.value.phonePart2}`;
    emit('submit', { ...form.value, phone: fullPhone });
  } else {
    // Hangi alanın boş olduğunu bulmak için:
    alert("Lütfen tüm alanları (Cinsiyet ve KVKK dahil) doldurunuz!");
    console.log("Form Durumu:", form.value);
  }
};
</script>

<template>
  <form class="signup-form" @submit.prevent="handleSubmit">
    <div class="login-header">
      <h2>Merhaba,</h2>
      <p>Giriş yap veya Hesap Oluştur, fırsatları kaçırma!</p>
    </div>

    <div class="tab-buttons">
      <NuxtLink to="/login" class="tab-button">Giriş Yap</NuxtLink>
      <button type="button" class="tab-button active">Üye Ol</button>
    </div>

    <div class="form-group">
      <label class="form-label">Telefon Numarası</label>
      <div class="phone-input-group">
        <div class="country-code">0 (</div>
        <AtomsInput v-model="form.phonePart1" placeholder="___" maxlength="3" class="phone-part" />
        <div class="country-code">)</div>
        <AtomsInput v-model="form.phonePart2" placeholder="______" maxlength="6" class="phone-part" />
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">E-Posta Adresi</label>
      <AtomsInput type="email" v-model="form.email" placeholder="E-posta adresinizi giriniz" />
    </div>

    <div class="form-group">
      <label class="form-label">Şifre</label>
      <AtomsInput type="password" v-model="form.password" placeholder="Şifrenizi giriniz" />
    </div>

    <div class="form-group">
      <label class="form-label">Cinsiyet</label>
      <div class="gender-group">
        <AtomsButton type="button" :class="{ active: form.gender === 'female' }" @click="form.gender = 'female'"
          class="gender-button">KADIN</AtomsButton>
        <AtomsButton type="button" :class="{ active: form.gender === 'male' }" @click="form.gender = 'male'"
          class="gender-button">ERKEK</AtomsButton>
      </div>
    </div>

    <div class="checkbox-group">
      <AtomsCheckbox v-model="form.kvkk1">Ticari ileti gönderilmesini kabul ediyorum.</AtomsCheckbox>
      <AtomsCheckbox v-model="form.kvkk2" class="complex-checkbox">Pazarlama ve CRM süreçlerini kabul ediyorum.
      </AtomsCheckbox>
    </div>

    <AtomsButton type="submit" variant="primary" size="large" :disabled="!isFormValid"
      @click="handleSubmit" :fullWidth="true">ÜYE OL</AtomsButton>

      
  </form>

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

.signup-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.phone-input-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.country-code {
  color: #666;
  font-size: 14px;
  white-space: nowrap;
}

.phone-part {
  flex: 1;
}

.password-hint {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  line-height: 1.4;
}

.gender-group {
  display: flex;
  gap: 16px;
}

.gender-button {
  flex: 5;
  padding: 12px;
  border: 1px solid #ddd;
  background: #f8f8f8;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease;
}

.gender-button.active {
  background: #FF6600;
  background-color: #FF6600;
  color: white;
  font-weight: 600;
}

.gender-button:hover:not(.active) {
  background: #f0f0f0;
  border-color: #ccc;
}

.checkbox-group {
  margin-bottom: 24px;
}

.complex-checkbox {
  margin-top: 12px;
}

.checkbox-content {
  line-height: 1.4;
}

.checkbox-text {
  font-size: 14px;
  color: #333;
}

.kvkk-info {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
  margin-top: 16px;
  padding: 12px;
  background-color: #f8f8f8;
  border-radius: 4px;
}

.kvkk-link {
  color: #FF6600;
  text-decoration: none;
}

.kvkk-link:hover {
  text-decoration: underline;
}

.submit-button {
  margin-bottom: 14px;
}

.social-signup {
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