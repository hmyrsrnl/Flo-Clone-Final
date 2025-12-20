import { defineStore } from 'pinia'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import type { IProduct } from '../types'
import { useNuxtApp } from 'nuxt/app'
import type { ICampaign } from '~/types'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as IProduct[],
    sliderData: [] as any[],
    loading: false,
    heroSlides: [] as any[],
    campaignSlides: [] as any[],
    campaigns: [] as ICampaign[],
    campaignCards: [] as any[],
    currentProduct: null as IProduct | null,
    filteredProducts: [] as any[],
    filterCategories: [
      { label: 'Ayakkabı', value: 'Ayakkabı' },
      { label: 'Bot', value: 'Bot' }
    ],
    selectedFilters: {
      priceRange: [0, 10000],
      sortBy: 'newest'
    },

  }),
  getters: {
    // Kategoriye göre filtreleme
    getProductsByCategory: (state) => (catId: string) => {
      return state.products.filter(p => p.category === catId)
    }
  },
  actions: {
    async fetchFilteredProducts(filters: any) {
      this.loading = true;
      const { $db } = useNuxtApp();

      try {
        const hasCategory = filters.categories && filters.categories.length > 0;
        const hasBrand = filters.brands && filters.brands.length > 0;
        const hasSize = filters.sizes && filters.sizes.length > 0;
        if (!hasCategory && !hasBrand && !hasSize) {
          await this.fetchProducts();
          this.filteredProducts = [...this.products];
          return;
        }

        let q = query(collection($db as any, 'products'));

        if (hasCategory) {
          q = query(q, where('category', 'in', filters.categories));
        }

        if (hasBrand) {
          q = query(q, where('brand', 'in', filters.brands));
        }

        if (hasSize) {
          q = query(q, where('sizes', 'array-contains-any', filters.sizes));
        }
        const querySnapshot = await getDocs(q);
        this.filteredProducts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            imageUrl: data.image || data.imageUrl || ''
          };
        });

      } catch (error) {
        console.error("Filtreleme sırasında hata:", error);
        this.filteredProducts = [...this.products];
      } finally {
        this.loading = false;
      }
    },

    handleFilterChange(filters: any) {
      console.log("Filtreler güncellendi:", filters)
    },

    //Firestore sorgusu action içinde olmalı.
    async fetchProductById(id: string) {
      const { $db } = useNuxtApp()
      this.loading = true
      try {
        const docRef = doc($db as any, 'products', id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data();

          this.currentProduct = {
            id: docSnap.id,
            ...data,
            imageUrl: (data.image || '').toString().replace(/"/g, ''),
            images: data.images ? data.images.map((img: string) => img.replace(/"/g, '')) : [],
            colors: (data.colors || []).map((color: any) => ({
              name: color.name,
              image: color.image?.replace(/"/g, ''),
              productId: color.productId
            })),
            sizes: data.sizes || []
          } as IProduct
        }
      } catch (error) {
        console.error("Ürün detayı çekilirken hata oluştu:", error)
      } finally {
        this.loading = false
      }
    },

    async fetchProductsByGender(genderName: string) {
      this.loading = true
      const { $db } = useNuxtApp()

      try {
        const { collection, getDocs, query, where } = await import('firebase/firestore')

        //Unisex ürünleri de yakalıyoruz
        const q = query(
          collection($db as any, 'products'),
          where('gender', 'array-contains', genderName.toLowerCase())
        )
        const querySnapshot = await getDocs(q)
        this.filteredProducts = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            imageUrl: data.image || '',
            price: data.price || 0
          }
        })
      } catch (error) {
        console.error("Filtreleme hatası:", error)
      } finally {
        this.loading = false
      }
    },

    async fetchProducts() {
      const { $db } = useNuxtApp();
      this.loading = true;
      try {
        const querySnapshot = await getDocs(collection($db as any, 'products'));
        this.products = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'İsimsiz Ürün',
            imageUrl: (data.image || '').toString().replace(/"/g, ''),
            price: Number(data.price) || 0,
            category: data.category?.toLowerCase() || '',
            brand: data.brand || 'FLO',
            colors: data.colors || [],
            sizes: data.sizes || ['36', '37', '38', '39', '40'],
            rating: Number(data.rating) || 0,
            reviewCount: Number(data.reviewCount) || 0
          };
        }) as IProduct[];
      } catch (error) {
        console.error("Ürünler yüklenirken hata:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCampaigns() {
      this.loading = true
      const { $db } = useNuxtApp()
      try {
        const querySnapshot = await getDocs(collection($db as any, 'campaigns'))
        this.campaigns = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          image: doc.data().image || doc.data().imageUrl || '',
          imageUrl: doc.data().imageUrl || doc.data().image || '',
        })) as ICampaign[]
      } catch (error) {
        console.error("Kampanya çekme hatası:", error)
      } finally {
        this.loading = false
      }
    },

    // Slider verilerini çeken fonksiyon
    async fetchSliderData() {
      const { $db } = useNuxtApp();
      try {
        const querySnapshot = await getDocs(collection($db as any, 'campaign'));
        const allSlides = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          sliderType: doc.data().sliderType || 'campaign',
          image: doc.data().image || doc.data().imageUrl || ''
        }));
        this.heroSlides = allSlides.filter(s => s.sliderType === 'hero');
        this.campaignSlides = allSlides.filter(s => s.sliderType === 'campaign');
        this.campaignCards = allSlides.filter(s => s.sliderType === 'card');

      } catch (error) {
        console.error("Slider verisi ayrıştırma hatası:", error);
      }
    }
  }
})