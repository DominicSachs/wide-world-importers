import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderListComponent } from '@app/modules/order/list/list.component';
import { OrderRoutingModule } from '@app/modules/order/order-routing.module';

@NgModule({
  declarations: [
    OrderListComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
