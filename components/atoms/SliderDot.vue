<script setup lang="ts">
//TypeScript interface kullanımı.
interface Props {
  active?: boolean;
  index: number;
}

// Varsayılan değerlerle birlikte props
withDefaults(defineProps<Props>(), {
  active: false
});

//Sadece Nuxt/Vue yapıları.
defineEmits<{
  (e: 'click'): void
}>();
</script>

<template>
  <button 
    :class="['slider-dot', { 'slider-dot--active': active }]"
    @click="$emit('click')"
  >
    <span class="sr-only">Slide {{ index + 1 }}</span>
  </button>
</template>

<style scoped>
.slider-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.slider-dot--active {
  background-color: white;
}

.slider-dot:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>