export type ProductRatingsType = {
  total: number;
  value: number;
};
export type ProductCard = {
  name: string;
  slug: string;
  rating: ProductRatingsType;
  price: number;
  images: { name: string; url: string }[];
  brand?: string;
};
export type ProductType = ProductCard & {
  description: string;
  orders: number;
  previousPrice?: number;
  quantity: number;
};

export type ProductContainerType = {
  title: string;
  products: ProductType[];
};
