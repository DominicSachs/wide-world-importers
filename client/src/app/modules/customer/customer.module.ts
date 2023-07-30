import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TenantRoutingModule } from '@app/modules/customer/customer-routing.module';
import { CustomerService } from '@app/modules/customer/customer.service';
import { AddressComponent } from '@app/modules/customer/detail/address/address.component';
import { CustomerDetailComponent } from '@app/modules/customer/detail/detail.component';
import { CustomerListComponent } from '@app/modules/customer/list/list.component';
import { MaterialModule } from '@app/shared/modules/material-module/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, TenantRoutingModule],
  declarations: [AddressComponent, CustomerListComponent, CustomerDetailComponent],
  providers: [CustomerService]
})
export class CustomerModule {}
