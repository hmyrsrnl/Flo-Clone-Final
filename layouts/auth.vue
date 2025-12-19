<template>
  <div class="auth-layout-wrapper">
    <slot /> 
  </div>
</template>

<style scoped>
.auth-layout-wrapper {
  min-height: 100vh;
  background-color: #ffffff; /* Beyaz ekranı anlamak için burayı geçici olarak #f0f0f0 yapabilirsin */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>