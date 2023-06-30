const mapping: Record<string, string> = {
  carts: 'cart',
  'cart-items': 'cart_item',
  organizations: 'organization',
  products: 'product',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
