import { Routes } from '@angular/router';
import { AuthGuard } from '@app/auth/auth.guard';
import { CustomerEditComponent } from '@app/modules/customer/edit/customer-edit.component';
import { CustomerListComponent } from '@app/modules/customer/list/customer-list.component';
import { OrderListComponent } from '@app/modules/order/list/list.component';

export const CUSTOMER_ROUTES: Routes = [
  { path: '', component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: ':id', component: CustomerEditComponent, canActivate: [AuthGuard] },
  { path: ':id/orders', component: OrderListComponent, canActivate: [AuthGuard] }
];
