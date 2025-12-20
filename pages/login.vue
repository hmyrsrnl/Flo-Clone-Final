<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const authStore = useAuthStore() 
const router = useRouter()

const handleLogin = async (credentials: any) => {
  const success = await authStore.login(credentials)
  if (success) {
    await authStore.fetchUserProfile(); 
    navigateTo('/profile'); 
  } else {
    alert('Hatalı giriş!');
  }
}

const handleSocialLogin = async (provider: string) => {
  const success = await authStore.socialLogin(provider)
  if (success) router.push('/profile')
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <MoleculesLoginForm 
        @login="handleLogin" 
        @social-login="handleSocialLogin" 
      />
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}
</style>