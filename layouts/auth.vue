<template>
  <div class="auth-layout-wrapper">
    <div class="auth-header">
      <NuxtLink to="/">
        <img src="/logo.svg" alt="FLO Logo" class="auth-logo" />
      </NuxtLink>
    </div>

    <div class="auth-content">
      <slot /> 
    </div>
  </div>
</template>

<style scoped>
.auth-layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  padding: 40px 20px;
}

.auth-header {
  margin-bottom: 30px;
}

.auth-logo {
  height: 50px; /* Logoyu belirgin yapalım */
  cursor: pointer;
}

.auth-content {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
</style>