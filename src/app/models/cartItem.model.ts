import { Product } from "./product.model";

export interface CartItem {
    id: number; // Use number here
    product: Product;
    quantity: number;
    isSaved: boolean;
  }
  