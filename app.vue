<template>
  <div>
    <OrganismsHeader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <OrganismsFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initAuth()
})
</script>
