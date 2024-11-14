export type Product = {
  id: string;
  title: string;
  image?: string[];
  description: string;
  price?: number;
  isUsed: boolean | null;
  category: string;
  userId: string;
  createdAt?: any;
};

export type NewProduct = Omit<Product, 'id'>;
