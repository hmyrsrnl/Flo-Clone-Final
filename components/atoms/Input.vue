<script setup lang="ts">
/** * Madde 3a: TypeScript interface kullanımı.
 * Propsları 'defineProps' ile tanımlayarak input tipini ve model değerini kontrol ediyoruz.
 */
interface Props {
  type?: string;
  placeholder?: string;
  modelValue?: string | number;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  modelValue: ''
});

/** * Madde 3b: Sadece Nuxt/Vue yapıları.
 * v-model (update:modelValue) için emit tanımı.
 */
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="input-container">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      class="input"
    />
  </div>
</template>

<style scoped>
.input-container {
  width: 100%;
}

.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input:focus {
  outline: none;
  border-color: #FF6600;
}

.input::placeholder {
  color: #999;
}
</style>