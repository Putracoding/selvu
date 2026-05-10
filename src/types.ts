export interface Photobook {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'Wedding' | 'Travel' | 'Baby' | 'General';
  pages: number;
  coverType: 'Hardcover' | 'Softcover';
}

export interface CartItem extends Photobook {
  quantity: number;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isAdmin?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  customerEmail: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  shippingAddress: string;
  createdAt: any;
}
