export interface IColorVariant {
  productId: string; 
  image: string;     
  name: string;  
}

export interface IProduct {
  id: string | number;
  name: string;
  price: number | string;
  image: string;
  images?: string[];
  gender?: string[];
  brand: string;
  color?: string;
  colors?: IColorVariant[];
  category?: string;
  oldPrice?: number;  
  imageUrl: string;   
  selectedSize: string | number; 
  size?: string | number;
  sizes: (string | number)[];
  selected?: boolean;
  rating: number;     
  reviewCount: number;
  addedCount?: number;features?: {
    [key: string]: string; 
  };
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface IUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  address?: string;
  role?: 'user' | 'admin';
  phoneNumber?: string | null;
}

export interface ICategory {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  image: string;
}

export interface IUserProfile {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  phone?: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  address?: string;
}

export interface ICampaign {
  id?: string;
  image: string;
  imageUrl: string;
  link: string;
  title: string; 
  sliderType?: 'hero' | 'campaign';
}

export interface IRegisterData {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  gender?: string;
}

export interface IMenu {
  categories: {
    title: string;
    items: string[];
  }[];
}