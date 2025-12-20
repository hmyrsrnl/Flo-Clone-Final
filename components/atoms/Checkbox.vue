<script setup lang="ts">
//TypeScript interface
interface Props {
  modelValue?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false
});

//Sadece Nuxt/Vue yapıları.
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};
</script>

<template>
  <label :class="['checkbox-container', { disabled }]">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="handleChange"
      :disabled="disabled"
      class="checkbox-input"
    />
    <span :class="['checkbox-custom', { checked: modelValue }]">
      <svg v-if="modelValue" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="checkbox-label">
      <slot />
    </span>
  </label>
</template>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
  line-height: 1.4;
}

.checkbox-container.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-custom.checked {
  border-color: #FF6600;
  background-color: #FF6600;
}

.checkbox-label {
  color: #333;
  flex: 1;
}

.checkbox-container:hover 
.checkbox-custom:not(.checked) {
  border-color: #ccc;
}

.checkbox-container.disabled 
.checkbox-custom {
  background-color: #f5f5f5;
  border-color: #eee;
}
</style>