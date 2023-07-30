
export interface NavigationMenuItem {
  title: string;
  icon: string;
  route: string;
}

export const NAVIGATION_MENU_ITEMS: NavigationMenuItem[] = [{
  title: 'Orders',
  route: '/orders',
  icon: 'list_alt'
},{
  title: 'Customers',
  route: '/customers',
  icon: 'groups'
}, {
  title: 'Suppliers',
  route: '/suppliers',
  icon: 'local_shipping'
}];
