import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountryListComponent } from '@app/modules/master-data/countries/list/list.component';
import { MasterDataRoutingModule } from '@app/modules/master-data/master-data-routing.module';
import { MasterDataComponent } from '@app/modules/master-data/master-data.component';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { MaterialModule } from '@app/shared/modules/material-module/material.module';

@NgModule({
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    MaterialModule
  ],
  declarations: [
    MasterDataComponent,
    CountryListComponent
  ],
  providers: [
    MasterDataService
  ]
})
export class MasterDataModule { }
