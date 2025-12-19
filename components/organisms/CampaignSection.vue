<script setup lang="ts">
/** * Madde 3b: Nuxt otomatik importları sayesinde manuel import satırı kullanmıyoruz.
 * Sadece 'use' ile başlayan store ve route fonksiyonlarını çağırıyoruz.
 */
const productStore = useProductStore();
const router = useRouter();

// Firestore'dan gelen verileri kategorize ediyoruz
const sliderCampaigns = computed(() => productStore.sliderData); // 'campaign' koleksiyonundan gelir
const discountCampaigns = computed(() => productStore.products.slice(0, 2)); // Örnek olarak ürünlerden çekilebilir

const goToCampaign = (link: string) => {
  router.push(link);
};
</script>

<template>
  <div class="campaign-section container">
    <OrganismsCampaignSlider 
      v-if="productStore.campaignSlides.length > 0"
      :campaigns="productStore.campaignSlides"
      :auto-slide="true"
    />

    <div class="mini-campaigns-grid" v-if="productStore.campaignCards.length >= 2">
  <MoleculesCampaignCard 
    :image-url="productStore.campaignCards[3]?.imageUrl" 
    height="150px"
    @click="goToCampaign(productStore.campaignCards[3]?.link)" 
  />
  <MoleculesCampaignCard 
    :image-url="productStore.campaignCards[2]?.imageUrl" 
    height="150px"
    @click="goToCampaign(productStore.campaignCards[2]?.link)" 
  />
</div>

<div class="main-campaign-banner" v-if="productStore.campaignCards.length >= 4">
  <MoleculesCampaignCard 
    :image-url="productStore.campaignCards[0]?.imageUrl" 
    height="350px"
    @click="goToCampaign(productStore.campaignCards[0]?.link)" 
  />
</div>
<div class="main-campaign-banner" v-if="productStore.campaignCards.length >= 4">
  <MoleculesCampaignCard 
    :image-url="productStore.campaignCards[1]?.imageUrl" 
    height="350px"
    @click="goToCampaign(productStore.campaignCards[1]?.link)" 
  />
</div>
  </div>
</template>

<style scoped>
.campaign-section {
  padding: 20px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.campaign-slider-section {
  margin-bottom: 30px;
}

.main-campaign-banner {
  margin-bottom: 25px;
}

.main-campaign-banner .campaign-card {
  height: 350px;
  width: 100%;
  border-radius: 12px;
}

.mini-campaigns-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 25px;
  width: 100%;
  box-sizing: border-box;
}

.mini-campaigns-grid :deep(.campaign-card ) {
  height: 120px;
  width: 100%;
  overflow: hidden;
}
:deep(.campaign-card img) {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Oranı koruyarak doldurur */
  object-position: right center; /* Sağ tarafın görünmesi için odağı sağa kaydırır */
}
.discount-campaigns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 25px;
}

.discount-campaigns .campaign-card {
  height: 180px;
}

.category-campaigns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.category-campaigns .campaign-card {
  height: 140px;
}

@media (max-width: 768px) {
  .campaign-section {
    padding: 15px 0;
  }

  .campaign-slider-section {
    margin-bottom: 20px;
  }

  .main-campaign-banner .campaign-card {
    height: 150px;
  }

  .mini-campaigns-grid,
  .discount-campaigns,
  .category-campaigns {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .mini-campaigns-grid .campaign-card {
    height: 100px;
  }

  .discount-campaigns .campaign-card {
    height: 140px;
  }

  .category-campaigns .campaign-card {
    height: 120px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .main-campaign-banner .campaign-card {
    height: 120px;
  }

  .mini-campaigns-grid .campaign-card {
    height: 80px;
  }

  .discount-campaigns .campaign-card {
    height: 120px;
  }

  .category-campaigns .campaign-card {
    height: 100px;
  }
}
</style>