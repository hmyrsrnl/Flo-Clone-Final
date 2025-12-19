<script setup lang="ts">
/** * Madde 3a: TypeScript Interface kullanımı. 
 * Beden listesi ve seçili beden bilgisini tipleriyle tanımlıyoruz.
 */
interface Props {
  sizes: (string | number)[];
  selectedSize?: string | number | null;
}

defineProps<Props>();

/** * Madde 3b: Nuxt 3 standartlarına uygun event tanımı.
 */
const emit = defineEmits<{
  (e: 'size-change', value: string | number): void
}>();
</script>

<template>
  <div class="size-container">
    <div class="size-header">
      <span class="label">Beden :</span>
      <span class="size-guide">Hangisi Senin Bedenin?</span>
    </div>

    <div class="size-grid">
      <button 
        v-for="size in sizes" 
        :key="size"
        type="button"
        :class="['size-box', { active: selectedSize === size }]"
        @click="emit('size-change', size)"
      >
        {{ size }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.size-container {
  margin: 20px 0;
}

.size-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
}

.label {
  font-weight: 600;
  color: #333;
}

.size-guide {
  color: #ff6000;
  font-weight: 700;
  cursor: pointer;
  font-size: 12px;
}

/* Görseldeki 4'lü veya 5'li yan yana dizilim için grid yapısı */
.size-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 10px;
}

.size-box {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #333;
}

.size-box:hover {
  border-color: #bbb;
}

/* Seçili bedenin turuncu çerçeveli ve hafif turuncu arka planlı hali */
.size-box.active {
  border-color: #ff6000;
  color: #ff6000;
  background-color: #fff5f0;
  font-weight: 700;
}
</style>