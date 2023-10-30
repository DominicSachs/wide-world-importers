import { Routes } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';
import { OrderListComponent } from '@app/modules/order/list/list.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'customers', loadChildren: () => import('./modules/customer/customer.routes').then(m => m.CUSTOMER_ROUTES) },
  { path: 'orders', component: OrderListComponent },
  { path: 'suppliers', loadChildren: () => import('./modules/supplier/supplier.routes').then(m => m.SUPPLIER_ROUTES) },
  { path: 'settings', loadChildren: () => import('./modules/master-data/master-data.routes').then(m => m.MASTERDATA_ROUTES) }
];
