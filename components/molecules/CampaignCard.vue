<script setup lang="ts">
/** * Madde 3a: TypeScript interface tanımı. */
interface Props {
  imageUrl: string;
  height?: string;
  title?: string;
  backgroundSize?: 'cover' | 'contain' | string;
}

/** * KRİTİK DÜZELTME: defineProps sonucunu bir değişkene atamalı 
 * veya doğrudan template'in erişebileceği şekilde bırakmalısınız.
 */
const props = withDefaults(defineProps<Props>(), {
  height: '200px',
  backgroundSize: 'cover',
  title: ''
});

const emit = defineEmits<{
  (e: 'cardClick'): void
}>();

const handleInternalClick = () => {
  emit('cardClick');
};
</script>

<template>
  <div 
    class="campaign-card"
    :style="{ 
      // Artık 'props.imageUrl' şeklinde güvenle erişebilirsiniz
      backgroundImage: `url('${props.imageUrl}')`, 
      height: props.height,
      backgroundSize: props.backgroundSize
    }"
    @click="handleInternalClick"
  >
    <div class="card-content">
       <p v-if="props.title" class="card-title">{{ props.title }}</p> 
    </div>
  </div>
</template>

<style scoped>
.campaign-card {
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.campaign-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
</style>