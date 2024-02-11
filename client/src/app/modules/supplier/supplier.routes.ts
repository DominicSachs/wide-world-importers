import { Routes } from '@angular/router';
import { AuthGuard } from '@app/auth/auth.guard';
import { SupplierEditComponent } from '@app/modules/supplier/edit/supplier-edit.component';
import { SupplierListComponent } from '@app/modules/supplier/list/supplier-list.component';

export const SUPPLIER_ROUTES: Routes = [
  { path: '', component: SupplierListComponent, canActivate: [AuthGuard] },
  { path: ':id', component: SupplierEditComponent, canActivate: [AuthGuard] }
];
