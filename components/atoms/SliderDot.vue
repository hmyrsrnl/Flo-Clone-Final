<script setup lang="ts">
/** * Madde 3a: TypeScript interface kullanımı.
 * Aktiflik durumu ve index numarasını tip güvenli hale getiriyoruz.
 */
interface Props {
  active?: boolean;
  index: number;
}

// Varsayılan değerlerle birlikte props tanımlama
withDefaults(defineProps<Props>(), {
  active: false
});

/** * Madde 3b: Sadece Nuxt/Vue yapıları.
 * Tıklama olayını (emit) tanımlıyoruz.
 */
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