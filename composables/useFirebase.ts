import { collection, getDocs, getFirestore } from 'firebase/firestore';

export const useGetCampaigns = async () => {
  const { $firestore } = useNuxtApp();
  const db = $firestore || getFirestore();
  if (!db) {
    console.error("Firestore başlatılamadı!");
    return [];
  }

  try {
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