
export interface CartItem {
  product_id: number;
  name: string;
  category?: string | null;
  image_url?: string | null;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface CartSummary {
  items: CartItem[];
  subtotal: number;
  taxes: number;
  total: number;
}
