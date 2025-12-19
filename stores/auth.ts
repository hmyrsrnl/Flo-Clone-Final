import { defineStore } from 'pinia'
import { doc, setDoc, getFirestore } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  onAuthStateChanged,
  signOut,
  type User
} from 'firebase/auth'
import { useNuxtApp } from '#app'
import type { IUserProfile, IRegisterData } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    userProfile: null as IUserProfile | null,
    loading: false,
    initialized: false
  }),

  actions: {
    /**
     * 🔐 Auth durumunu başlatır (Madde 2d uyumlu)
     */
    initAuth() {
      if (!process.client || this.initialized) return

      const { $auth } = useNuxtApp()

      onAuthStateChanged($auth as any, (user) => {
        this.user = user
        this.initialized = true
      })
    },

    /**
     * 🔑 Giriş Yap (Madde 1a & 2a uyumlu)
     */
    async login(credentials: { email: string; password?: string }) {
      if (!process.client) return false
      const { $auth, $db } = useNuxtApp()
      this.loading = true

      try {
        const userCredential = await signInWithEmailAndPassword($auth as any, credentials.email, credentials.password || '')
        this.user = userCredential.user

        // Madde 1b: Giriş yapınca Firestore'daki kullanıcı verilerini çek ve state'e at
        const { getDoc, doc } = await import('firebase/firestore')
        const docRef = doc($db as any, 'users', this.user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          this.userProfile = docSnap.data() as IUserProfile
        }

        return true
      } catch (error: any) {
        console.error('Giriş hatası:', error.code)
        alert('Hata: ' + error.message)
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * 🌐 Sosyal Medya Girişi (Madde 2a uyumlu)
     */
    async socialLogin(providerName: string) {
      if (!process.client) return false

      const { $auth } = useNuxtApp()
      this.loading = true

      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup($auth as any, provider)
        this.user = result.user
        return true
      } catch (error) {
        console.error('Sosyal login hatası:', error)
        return false
      } finally {
        this.loading = false
      }
    },

    /**
     * 📝 Yeni Üye Kaydı (Madde 1b - Veri Yazma uyumlu)
     */
    async register(userData: any) {
      this.loading = true;
      const { $db, $auth } = useNuxtApp();

      try {
        const userCredential = await createUserWithEmailAndPassword($auth as any, userData.email, userData.password);
        const user = userCredential.user;

        // Madde 1b: Firestore'a veri yazma işlemi
        await setDoc(doc($db as any, 'users', user.uid), {
          uid: user.uid,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone || '',
          gender: userData.gender || '',
          createdAt: new Date().toISOString()
        });

        this.user = user;
        return true;
      } catch (error: any) {
        alert("Firebase Hatası: " + error.message); // Hatayı görmek için alert ekledik
        return false;
      } finally {
        this.loading = false;
      }
    },
    /**
     * 🚪 Çıkış Yap
     */
    async logout() {
      if (!process.client) return

      const { $auth } = useNuxtApp()
      await signOut($auth as any)

      this.user = null
      this.userProfile = null
    },
    /**
 * 📥 Firestore'dan kullanıcı profilini çeker (Madde 1b uyumlu)
 */
    async fetchUserProfile() {
      const { $db } = useNuxtApp()
      if (!this.user) return

      try {
        const { getDoc, doc } = await import('firebase/firestore')
        const docRef = doc($db as any, 'users', this.user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          this.userProfile = docSnap.data() as IUserProfile
        }
      } catch (error) {
        console.error('Profil çekme hatası:', error)
      }
    },

    /**
     * 📝 Mevcut kullanıcı profilini günceller (Madde 1b uyumlu)
     */
    async updateUserProfile() {
      const { $db } = useNuxtApp()
      if (!this.user || !this.userProfile) return false

      try {
        const { updateDoc, doc } = await import('firebase/firestore')
        const docRef = doc($db as any, 'users', this.user.uid)

        // Veritabanına güncel veriyi yaz
        await updateDoc(docRef, { ...this.userProfile })
        return true
      } catch (error) {
        console.error('Profil güncelleme hatası:', error)
        return false
      }
    }
  }
})