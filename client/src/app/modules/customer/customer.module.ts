import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TenantRoutingModule } from '@app/modules/customer/customer-routing.module';
import { CustomerService } from '@app/modules/customer/customer.service';
import { AddressComponent } from '@app/modules/customer/edit/address/address.component';
import { CustomerEditComponent } from '@app/modules/customer/edit/customer-edit.component';
import { CustomerListComponent } from '@app/modules/customer/list/customer-list.component';
import { MaterialModule } from '@app/shared/modules/material-module/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, TenantRoutingModule],
  declarations: [AddressComponent, CustomerEditComponent, CustomerListComponent],
  providers: [CustomerService]
})
export class CustomerModule {}
