export type ServerResponse = {
  success: boolean;
  message?: String;
};

export type CartItemType = {
  img: string;
};

export type CheckoutFormType = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
};

export type OrderItemType = {
  quantity: number;
  price: number;
  productId: string;
  _id: string;
};

export type orderDetailsType = {
  _id: string;
  shippingAddress: CheckoutFormType;
  orderItems: OrderItemType[];
  delievered: boolean;
  user: string;
  itemPrice: number;
  total: number;
  shippingPrice: number;
  paymentMethod: string;
  status: "complete" | "incomplete";
  isPaid: boolean;
  createdAt: string;
};
