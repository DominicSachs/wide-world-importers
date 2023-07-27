import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDetailComponent } from '@app/modules/customer/detail/detail.component';
import { CustomerListComponent } from '@app/modules/customer/list/list.component';

const ROUTES: Routes = [
  { path: '', component: CustomerListComponent },
  { path: ':id', component: CustomerDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class TenantRoutingModule {}
