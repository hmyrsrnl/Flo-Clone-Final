import { defineStore } from 'pinia'
import { doc, getDoc } from 'firebase/firestore'
import { useNuxtApp } from 'nuxt/app'
export const useMenuStore = defineStore('menu', {
  state: () => ({
    navigationMenu: {} as any,
    loading: false
  }),
  actions: {
    async fetchNavigationMenu() {
      const { $db } = useNuxtApp();
      this.loading = true;
      try {
        const docRef = doc($db as any, 'menu', '4pRhqjhDiFjm3fx38gI1');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.navigationMenu = docSnap.data();
          console.log("Menü verileri yüklendi:", this.navigationMenu);
        }
      } catch (error) {
        console.error("Menü çekilirken hata:", error);
      } finally {
        this.loading = false;
      }
    }
  }
})