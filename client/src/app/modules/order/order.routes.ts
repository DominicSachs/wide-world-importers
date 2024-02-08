import { Routes } from '@angular/router';
import { AuthGuard } from '@app/auth/auth.guard';
import { OrderDetailComponent } from '@app/modules/order/detail/detail.component';
import { OrderListComponent } from '@app/modules/order/list/list.component';

export const ORDER_ROUTES: Routes = [
  { path: '', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: ':id', component: OrderDetailComponent, canActivate: [AuthGuard] }
];
