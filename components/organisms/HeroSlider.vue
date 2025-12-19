<script setup lang="ts">
/** * Madde 3a: TypeScript interface kullanımı.
 * Slider verileri için tip tanımı yapıyoruz.
 */
interface ISlide {
  imageUrl: string;
  link?: string;
}

interface Props {
  slides: ISlide[];
  autoplayInterval?: number;
}

const props = withDefaults(defineProps<Props>(), {
  slides: () => [],
  autoplayInterval: 5000
});

/** * Madde 3b: Nuxt 3 auto-import sayesinde ref, computed, onMounted gibi
 * Vue fonksiyonları için manuel import yazmıyoruz.
 */
const currentIndex = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null;

const slidesLength = computed(() => props.slides.length);

const startAutoplay = () => {
  if (props.autoplayInterval > 0 && slidesLength.value > 1) {
    stopAutoplay();
    intervalId = setInterval(() => {
      nextSlide();
    }, props.autoplayInterval);
  }
};

const stopAutoplay = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slidesLength.value;
};

const goToIndex = (index: number) => {
  stopAutoplay();
  currentIndex.value = index;
  startAutoplay();
};

const goTo = (link?: string) => {
  if (link) {
    // Madde 3b: Nuxt 3 standart yönlendirme
    navigateTo(link);
  }
};

onMounted(() => {
  startAutoplay();
});

onBeforeUnmount(() => {
  stopAutoplay();
});

// Slides değişiminde slider'ı sıfırla
watch(slidesLength, () => {
  stopAutoplay();
  currentIndex.value = 0;
  startAutoplay();
});
</script>

<template>
  <div class="flo-hero-slider-container">
    <div class="slider-wrapper">
      <div 
        v-for="(slide, index) in slides"
        :key="index"
        :class="['slide-item', { active: index === currentIndex }]"
        :style="{ backgroundImage: `url(${slide.imageUrl})` }"
        @click="goTo(slide.link)"
      ></div>
    </div>
    
    <div class="slider-dots" v-if="slidesLength > 1">
      <div 
        v-for="(_, index) in slides" 
        :key="index"
        :class="['dot', { active: index === currentIndex }]"
        @click="goToIndex(index)"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.flo-hero-slider-container {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  background: #f8f8f8;
}

.slider-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.slide-item {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  transition: opacity 0.7s ease-in-out;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}

.slide-item.active {
  opacity: 1;
  z-index: 2;
}

.slider-dots {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 50;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: white;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .flo-hero-slider-container {
    height: 400px;
  }
  
  .slide-content {
    padding-left: 20px;
    justify-content: center;
    text-align: center;
  }
  
  .slide-text {
    max-width: 90%;
  }
  
  .slide-title {
    font-size: 2rem;
  }
  
  .slide-subtitle {
    font-size: 1.2rem;
  }
  
  .nav-arrow {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .flo-hero-slider-container {
    height: 300px;
  }
  
  .slide-title {
    font-size: 1.5rem;
  }
  
  .slide-subtitle {
    font-size: 1rem;
  }
  
  .cta-button {
    padding: 12px 24px;
    font-size: 1rem;
  }
}
</style>