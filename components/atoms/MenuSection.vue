<script setup lang="ts">
//TypeScript interface ile props
interface Props {
  title?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="menu-section">
    <h3 v-if="title" class="section-title">{{ title }}</h3>
    <div class="section-items">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.menu-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  padding: 0 16px;
  color: #333;
}

.section-items {
  display: flex;
  flex-direction: column;
}
</style>