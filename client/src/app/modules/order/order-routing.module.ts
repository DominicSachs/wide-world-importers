import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from '@app/modules/order/list/list.component';

const ROUTES: Routes = [{ path: '', component: OrderListComponent }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
