export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string;
  rating: number;
  description: string;
  fruitFeatures: string;
  plantFeatures: string;
  plantingGuide: string;
  careGuide: string;
}

export interface CartItem extends Product {
  quantity: number;
}
