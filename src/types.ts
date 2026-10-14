export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  isVeg: boolean;
  isBestseller: boolean;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  reply: string | null;
  repliedAt: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}
