<template>
  <div class="home">
    <OrganismsHeroSlider v-if="productStore.heroSlides.length > 0" :slides="productStore.heroSlides" :auto-slide="true"
      :slide-interval="5000" />
    <OrganismsCampaignSection />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
const productStore = useProductStore()
onMounted(async () => {
  await productStore.fetchSliderData() 
  await productStore.fetchCampaigns()
})
</script>

<style scoped>
.home {
  flex: 1;
}

.hero {
  background: linear-gradient(135deg, #FF6600, #E55A00);
  color: white;
  padding: 80px 0;
  text-align: center;
  margin-top: 0;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.cta-button {
  background: white;
  color: #FF6600;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .hero {
    padding: 60px 20px;
  }

  .hero h1 {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 40px 20px;
  }

  .hero h1 {
    font-size: 28px;
  }
}
</style>