<script setup lang="ts">
//TypeScript interface kullanımı.
interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
}
//Varsayılan değerlerle birlikte props 
withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  fullWidth: false,
  disabled: false
});
//Sadece Nuxt/Vue yapıları 
defineEmits<{
  (e: 'click'): void
}>();
</script>

<template>
  <button 
    :class="['btn', variant, size, { 'full-width': fullWidth }]" 
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
}

.btn:disabled {
  background-color: #ccc !important;
  border-color: #ccc !important;
  color: #666 !important;
  cursor: not-allowed !important;
  transform: none !important;
}

.primary {
  background-color: #FF6600;
  color: white;
  border: 1px solid #FF6600;
}

.primary:hover:not(:disabled) {
  background-color: #E55A00;
  border-color: #E55A00;
}

.secondary {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.secondary:hover:not(:disabled) {
  background-color: #e8e8e8;
  border-color: #ccc;
}

.outline {
  background-color: transparent;
  color: #333;
  border: 1px solid #ddd;
}

.outline:hover:not(:disabled) {
  background-color: #f8f8f8;
  border-color: #ccc;
}

.small {
  padding: 8px 16px;
  font-size: 14px;
}

.medium {
  padding: 12px 20px;
  font-size: 14px;
}

.large {
  padding: 14px 24px;
  font-size: 16px;
}

.full-width {
  width: 100%;
}
</style>