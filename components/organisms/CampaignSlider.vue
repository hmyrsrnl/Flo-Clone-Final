<script setup lang="ts">
/** * Madde 3a: TypeScript interface kullanımı.
 * Kampanya nesnesinin sahip olması gereken alanları tanımlıyoruz.
 */
interface ICampaign {
  image: string;
  title?: string;
  link?: string;
}

interface Props {
  campaigns: ICampaign[];
  autoSlide?: boolean;
  slideInterval?: number;
}

const props = withDefaults(defineProps<Props>(), {
  campaigns: () => [],
  autoSlide: true,
  slideInterval: 5000
});

/** * Madde 3b: Nuxt 3 otomatik içe aktarma sayesinde ref ve onMounted için import gerekmez.
 */
const currentSlide = ref(0);
const autoSlideInterval = ref<ReturnType<typeof setInterval> | null>(null);

const emit = defineEmits<{
  (e: 'campaign-click', campaign: ICampaign): void
}>();

const goToSlide = (slideIndex: number) => {
  currentSlide.value = slideIndex;
};

const nextSlide = () => {
  if (props.campaigns.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % props.campaigns.length;
  }
};

const startAutoSlide = () => {
  if (props.autoSlide && props.campaigns.length > 1) {
    autoSlideInterval.value = setInterval(nextSlide, props.slideInterval);
  }
};

const pauseAutoSlide = () => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value);
    autoSlideInterval.value = null;
  }
};

// Yaşam döngüsü kancaları otomatik tanınır.
onMounted(() => startAutoSlide());
onBeforeUnmount(() => pauseAutoSlide());
</script>

<template>
  <div class="campaign-slider-container">
    <div 
      class="campaign-slider"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div
        v-for="(campaign, index) in campaigns"
        :key="index"
        class="campaign-slide"
      >
        <img 
          :src="campaign.image" 
          :alt="campaign.title || 'Kampanya'"
          class="campaign-slide-image"
          @click="$emit('campaign-click', campaign)"
        >
      </div>
    </div>

    <div class="campaign-slider-dots">
      <button
        v-for="(_, index) in campaigns"
        :key="index"
        :class="['campaign-slider-dot', { 'campaign-slider-dot--active': currentSlide === index }]"
        @click="goToSlide(index)"
      >
        <span class="sr-only">Kampanya {{ index + 1 }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.campaign-slider-container {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  margin: 20px 0;
  cursor: pointer;
  height: 150px;
}

.campaign-slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.campaign-slide {
  min-width: 100%;
  flex-shrink: 0;
  flex: 0 0 100%;
}

.campaign-slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 16px;
  
}

.campaign-slider-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.campaign-slider-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.campaign-slider-dot--active {
  background-color: #FF6600;
  transform: scale(1.2);
}

.campaign-slider-dot:hover {
  background-color: #FF6600;
  transform: scale(1.1);
}

@media (max-width: 1024px) {
  .campaign-slide-image {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .campaign-slider-container {
    margin: 15px 0;
    border-radius: 12px;
  }
  
  .campaign-slide-image {
    height: 250px;
    border-radius: 12px;
  }
  
  .campaign-slider-dots {
    bottom: 15px;
  }

}

@media (max-width: 480px) {
  .campaign-slide-image {
    height: 200px;
  }
  
  .campaign-slider-dots {
    bottom: 10px;
  }
  
  .campaign-slider-dot {
    width: 6px;
    height: 6px;
  }

}
</style>