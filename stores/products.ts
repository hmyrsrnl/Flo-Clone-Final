import { defineStore } from 'pinia'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import type { IProduct } from '../types'
import { useNuxtApp } from 'nuxt/app'
import type { ICampaign } from '~/types'

// stores/products.ts güncellemesi
export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as IProduct[],
    sliderData: [] as any[], // Tip tanımı eklenebilir
    loading: false,
    heroSlides: [] as any[], // Ana slider için
    campaignSlides: [] as any[], // Mini slider için
    campaigns: [] as ICampaign[],
    campaignCards: [] as any[],
    currentProduct: null as IProduct | null,
    filteredProducts: [] as any[],
    filterCategories: [
      { label: 'Ayakkabı', value: 'ayakkabi' },
      { label: 'Bot', value: 'bot' }
    ],
    selectedFilters: {
      priceRange: [0, 10000],
      sortBy: 'newest'
    },

  }),
  getters: {
    // Kategoriye göre filtreleme metodu (image_7a2bdd.png hatası için)
    getProductsByCategory: (state) => (catId: string) => {
      return state.products.filter(p => p.category === catId)
    }
  },
  actions: {

    // stores/products.ts içindeki fetchFilteredProducts action'ını güncelle
    async fetchFilteredProducts(filters: any) {
      this.loading = true;
      const { $db } = useNuxtApp();

      try {
        let q = query(collection($db as any, 'products'));

        // Cinsiyet Filtresi
        if (filters.gender) {
          q = query(q, where('gender', 'array-contains', filters.gender.toLowerCase()));
        }

        // Beden Filtresi (Görselde 'sizes' dizi olarak tutuluyor)
        if (filters.sizes && filters.sizes.length > 0) {
          // Not: Firestore'da tek bir sorguda birden fazla 'array-contains' yapılamaz.
          // Eğer gender array-contains ise, sizes filtresini client-side'da yapmalısın.
          q = query(q, where('sizes', 'array-contains-any', filters.sizes));
        }

        // Marka Filtresi
        if (filters.brands && filters.brands.length > 0) {
          q = query(q, where('brand', 'in', filters.brands));
        }

        const querySnapshot = await getDocs(q);
        let results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fiyat Filtresi (Firestore 'where' ile price > min yapmak için Index gerekir)
        // En garantisi client-side filtrelemedir:
        if (filters.priceRange) {
          results = results.filter((p: any) => {
            const pPrice = Number(p.price);
            return pPrice >= filters.priceRange.min && pPrice <= filters.priceRange.max;
          });
        }

        this.filteredProducts = results;
      } catch (error: any) {
        console.error("Filtreleme hatası:", error);
      } finally { this.loading = false; }
    },
    handleFilterChange(filters: any) {
      console.log("Filtreler güncellendi:", filters)
      // Burada filtreleme mantığını yazabilirsin
    },
    // Madde 2a: Firestore sorgusu action içinde olmalı.
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
            // Ana resmi temizliyoruz
            imageUrl: (data.image || '').toString().replace(/"/g, ''),

            // Ek resimler dizisindeki tırnakları temizleyerek map'liyoruz
            images: data.images ? data.images.map((img: string) => img.replace(/"/g, '')) : [],

            // Renk seçeneklerini (Map yapısını) TypeScript'e tanıtıyoruz
            colors: (data.colors || []).map((color: any) => ({
              name: color.name,
              image: color.image?.replace(/"/g, ''), // Renk küçük resmindeki tırnakları temizle
              productId: color.productId
            })),

            // Beden dizisini alıyoruz
            sizes: data.sizes || []
          } as IProduct
        }
      } catch (error) {
        console.error("Ürün detayı çekilirken hata oluştu:", error)
      } finally {
        this.loading = false
      }
    },
    // stores/products.ts içindeki fetchProductsByGender aksiyonu
    async fetchProductsByGender(genderName: string) {
      this.loading = true
      const { $db } = useNuxtApp()

      try {
        const { collection, getDocs, query, where } = await import('firebase/firestore')

        // Madde 1b: 'array-contains' kullanarak unisex ürünleri de yakalıyoruz
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
            imageUrl: data.image || '', // Görsellerin görünmesi için gerekli
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
      const { $db } = useNuxtApp() // Nuxt Firebase plugin kullanımı

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
          sliderType: doc.data().sliderType || 'campaign', // Varsayılan olarak 'hero'
          image: doc.data().image || doc.data().imageUrl || ''
        }));

        // Verileri tiplerine göre ayırıyoruz
        this.heroSlides = allSlides.filter(s => s.sliderType === 'hero');
        this.campaignSlides = allSlides.filter(s => s.sliderType === 'campaign');
        this.campaignCards = allSlides.filter(s => s.sliderType === 'card');

      } catch (error) {
        console.error("Slider verisi ayrıştırma hatası:", error);
      }
    }



  }
})