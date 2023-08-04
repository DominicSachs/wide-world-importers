import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerEditComponent } from '@app/modules/customer/edit/customer-edit.component';
import { CustomerListComponent } from '@app/modules/customer/list/customer-list.component';

const ROUTES: Routes = [
  { path: '', component: CustomerListComponent },
  { path: ':id', component: CustomerEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class TenantRoutingModule {}
