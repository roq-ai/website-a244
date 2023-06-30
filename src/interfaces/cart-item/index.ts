import { ProductInterface } from 'interfaces/product';
import { CartInterface } from 'interfaces/cart';
import { GetQueryInterface } from 'interfaces';

export interface CartItemInterface {
  id?: string;
  product_id?: string;
  quantity: number;
  cart_id?: string;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  cart?: CartInterface;
  _count?: {};
}

export interface CartItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  cart_id?: string;
}
