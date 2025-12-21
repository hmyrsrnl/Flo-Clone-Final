import { defineStore } from 'pinia'
import { query, where, collection, addDoc, getDocs } from 'firebase/firestore'
import { useNuxtApp } from 'nuxt/app'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    userOrders: [] as any[], 
    loading: false
  }),
  actions: {
async createOrder(cartData: any, total: number) {
  const { $db } = useNuxtApp();
  const authStore = useAuthStore();
  console.log("Sipariş oluşturuluyor. Toplam:", total); 

  if (!authStore.user?.uid) return;

  try {
    await addDoc(collection($db as any, 'orders'), {
      userId: authStore.user.uid,
      items: JSON.parse(JSON.stringify(cartData)), 
      totalPrice: Number(total), 
      createdAt: new Date(),
      status: "Sipariş Alındı"
    });
    console.log("Sipariş başarıyla yazıldı!");
  } catch (e) {
    console.error("Yazma hatası:", e);
  }
},
    async fetchUserOrders() {
      const authStore = useAuthStore()
      const { $db } = useNuxtApp()

      // 1. Kullanıcı giriş yapmamışsa işlemi durdur
      if (!authStore.user?.uid) return

      try {
        // 2. Sadece bu kullanıcıya (userId) ait siparişleri sorgula
        const q = query(
          collection($db as any, 'orders'),
          where('userId', '==', authStore.user.uid)
        )

        const querySnapshot = await getDocs(q)
        this.userOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (error) {
        console.error("Siparişler çekilirken hata:", error)
      }
    }

  }
})