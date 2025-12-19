import { defineStore } from 'pinia'
import { collection, addDoc } from 'firebase/firestore'
import { useNuxtApp } from 'nuxt/app'

export const useOrderStore = defineStore('orders', {
  actions: {
    async createOrder(cartData: any, total: number) {
      const { $db } = useNuxtApp()
      try {
        // Madde 1b: Firestore'a veri yazma işlemi
        await addDoc(collection($db as any, 'orders'), {
          items: cartData,
          totalPrice: total,
          date: new Date().toISOString(),
          status: 'Sipariş Alındı'
        })
        alert("Sipariş başarıyla kaydedildi! (Hocanın istediği yazma işlemi tamam)")
      } catch (e) {
        console.error("Hata:", e)
      }
    }
  }
})