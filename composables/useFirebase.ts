// composables/useFirebase.ts
import { collection, getDocs, getFirestore } from 'firebase/firestore';

export const useGetCampaigns = async () => {
  // NuxtApp üzerinden firestore'a ulaşmayı deniyoruz
  const { $firestore } = useNuxtApp();
  
  // Eğer $firestore henüz tanımlanmadıysa getFirestore() ile doğrudan çekiyoruz
  const db = $firestore || getFirestore();

  // Hata denetimi: db hâlâ yoksa boş dizi dön ki uygulama çökmesin
  if (!db) {
    console.error("Firestore başlatılamadı!");
    return [];
  }

  try {
    // ÖNEMLİ: Firestore'daki koleksiyon adın "campaign" (tekil), kodda da öyle olmalı
    const campaignCol = collection(db as any, "campaign"); 
    const querySnapshot = await getDocs(campaignCol);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Firestore Veri Çekme Hatası:", error);
    return [];
  }
};