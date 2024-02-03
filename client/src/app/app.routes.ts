import { Routes } from '@angular/router';
import { AuthGuard } from '@app/auth/auth.guard';
import { LoginComponent } from '@app/login/login.component';
import { OrderListComponent } from '@app/modules/order/list/list.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/:redirectUrl', component: LoginComponent },
  { path: 'customers', loadChildren: () => import('./modules/customer/customer.routes').then(m => m.CUSTOMER_ROUTES), canLoad: [AuthGuard] },
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'suppliers', loadChildren: () => import('./modules/supplier/supplier.routes').then(m => m.SUPPLIER_ROUTES), canLoad: [AuthGuard] },
  { path: 'settings', loadChildren: () => import('./modules/master-data/master-data.routes').then(m => m.MASTERDATA_ROUTES), canLoad: [AuthGuard] }
];
