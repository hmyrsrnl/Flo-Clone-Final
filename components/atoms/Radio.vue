<script setup lang="ts">
import { computed } from 'vue';

/** * Madde 3a: TypeScript interface kullanımı.
 * Değerlerin tipi string, number veya boolean olabilir.
 */
interface Props {
  value: string | number | boolean;
  modelValue?: string | number | boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false
});

/** * Madde 3b: Sadece Nuxt/Vue yapıları.
 * v-model desteği ve kontrol mantığı.
 */
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | boolean): void
}>();

const isChecked = computed(() => props.modelValue === props.value);

const handleChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value);
  }
};
</script>

<template>
  <label :class="['radio-container', { disabled }]">
    <input
      type="radio"
      :value="value"
      :checked="isChecked"
      @change="handleChange"
      :disabled="disabled"
      class="radio-input"
    />
    <span :class="['radio-custom', { checked: isChecked }]"></span>
    <span class="radio-label">
      <slot />
    </span>
  </label>
</template>

<style scoped>
.radio-container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
}

.radio-container.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.radio-input {
  display: none;
}

.radio-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.radio-custom.checked {
  border-color: #FF6600;
  background-color: #FF6600;
}

.radio-custom.checked::after {
  content: '';
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
}

.radio-label {
  color: #333;
}

.radio-container:hover 
.radio-custom:not(.checked) {
  border-color: #ccc;
}

.radio-container.disabled 
.radio-custom {
  background-color: #f5f5f5;
  border-color: #eee;
}
</style>