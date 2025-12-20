import { defineStore } from 'pinia'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useNuxtApp } from '#app'
import type { ICartItem, IProduct } from '../types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: (typeof window !== 'undefined' && localStorage.getItem('shopping-cart')) 
    ? JSON.parse(localStorage.getItem('shopping-cart')!) 
    : [] as ICartItem[],
    loading: false
  }),

  getters: {
    //Toplam ürün adedi
    totalItems: (state): number => 
      state.cartItems.reduce((sum: number, item: ICartItem) => sum + item.quantity, 0),
    //Toplam Sepet Tutarı
    cartTotal: (state): number => 
      state.cartItems.reduce((total: number, item: ICartItem) => {
        const price = Number(item.price) || 0; 
        return total + (price * item.quantity);
      }, 0)
  },

  actions: {
    saveCart() {
      if (process.client) {
        localStorage.setItem('shopping-cart', JSON.stringify(this.cartItems));
      }
    },

    //Sepete Ekleme
    addToCart(product: IProduct, selectedSize?: string | number) {
      const sizeToRecord = selectedSize || 'Standart'
      
      const existingItem = this.cartItems.find(
        (item: ICartItem) => item.id === product.id && item.selectedSize === sizeToRecord
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cartItems.push({
          ...product,
          selectedSize: sizeToRecord,
          quantity: 1
        })
      }
      this.saveCart()
    },

    //Sepetteki ürünün bedenini günceller
    updateSize(itemId: string | number, newSize: string | number) {
      const item = this.cartItems.find((i : ICartItem) => i.id === itemId);
      
      if (item) {
        item.selectedSize = newSize; 
        if (process.client) {
          localStorage.setItem('shopping-cart', JSON.stringify(this.cartItems));
        }
      }
    },

    //Firestore'a Veri Yazma 
    async checkout() {
      if (this.cartItems.length === 0 || !process.client) return false
      
      this.loading = true
      const { $db } = useNuxtApp()

      try {
        const docRef = await addDoc(collection($db as any, 'orders'), {
          items: JSON.parse(JSON.stringify(this.cartItems)), 
          totalPrice: this.cartTotal,
          createdAt: serverTimestamp(),
          status: 'Hazırlanıyor'
        })

        if (docRef.id) {
          this.clearCart()
          return true
        }
        return false
      } catch (error) {
        console.error("Sipariş hatası:", error)
        return false
      } finally {
        this.loading = false
      }
    },

    removeFromCart(productId: string | number, selectedSize: string | number) {
      this.cartItems = this.cartItems.filter(
        (item: ICartItem) => !(item.id === productId && item.selectedSize === selectedSize)
      )
      this.saveCart()
    },

    updateQuantity(productId: string | number, selectedSize: string | number, newQuantity: number) {
      const item = this.cartItems.find(
        (item: ICartItem) => item.id === productId && item.selectedSize === selectedSize
      )
      if (item && newQuantity > 0) {
        item.quantity = newQuantity
      }
      this.saveCart()
    },

    clearCart() {
      this.cartItems = []
    }
  }
})