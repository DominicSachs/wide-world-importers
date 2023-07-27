
export interface NavigationMenuItem {
  title: string;
  icon: string;
  route: string;
}

export const NAVIGATION_MENU_ITEMS: NavigationMenuItem[] = [{
  title: 'Customers',
  route: '/customers',
  icon: 'groups'
}, {
  title: 'Orders',
  route: '/orders',
  icon: 'list_alt'
}];
