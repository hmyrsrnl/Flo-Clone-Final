<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
const authStore = useAuthStore()
const router = useRouter()

const handleRegister = async (formData: any) => {
  const userData = {
    email: formData.email,
    password: formData.password,
    firstName: formData.firstName || "Kullanıcı", 
    lastName: formData.lastName || "Soyadı",
    phone: `0 (${formData.phonePart1}) ${formData.phonePart2}`,
    gender: formData.gender
  };

  const success = await authStore.register(userData);
  
  if (success) {
    alert('Üyelik başarıyla oluşturuldu!');
    navigateTo('/profile');
  }
};
</script>

<template>
  <div class="signup-page">
    <div class="signup-container">
      <MoleculesSignupForm @submit="handleRegister" />
    </div>
  </div>
</template>

<style scoped>
.signup-page {
  min-height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.signup-container {
  width: 100%;
  max-width: 400px;
}
</style>