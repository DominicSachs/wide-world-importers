import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SupplierListComponent } from '@app/modules/supplier/list/supplier-list.component';
import { SupplierRoutingModule } from '@app/modules/supplier/supplier-routing.module';
import { SupplierService } from '@app/modules/supplier/supplier.service';
import { MaterialModule } from '@app/shared/modules/material-module/material.module';

@NgModule({
  imports: [CommonModule, MaterialModule, SupplierRoutingModule],
  declarations: [SupplierListComponent],
  providers: [SupplierService]
})
export class SupplierModule { }
