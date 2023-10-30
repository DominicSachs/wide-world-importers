import { Routes } from '@angular/router';
import { CustomerEditComponent } from '@app/modules/customer/edit/customer-edit.component';
import { CustomerListComponent } from '@app/modules/customer/list/customer-list.component';

export const CUSTOMER_ROUTES: Routes = [
  { path: '', component: CustomerListComponent },
  { path: ':id', component: CustomerEditComponent }
];
