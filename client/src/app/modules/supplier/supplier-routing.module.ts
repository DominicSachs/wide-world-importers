import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierListComponent } from '@app/modules/supplier/list/list.component';

const ROUTES: Routes = [{ path: '', component: SupplierListComponent }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
