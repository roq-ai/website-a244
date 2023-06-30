import { CartItemInterface } from 'interfaces/cart-item';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  description?: string;
  price: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  cart_item?: CartItemInterface[];
  organization?: OrganizationInterface;
  _count?: {
    cart_item?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  organization_id?: string;
}
