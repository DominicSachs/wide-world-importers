import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CityEditComponent } from '@app/modules/master-data/city/edit/city-edit.component';
import { CityListComponent } from '@app/modules/master-data/city/list/city-list.component';
import { CountryEditComponent } from '@app/modules/master-data/country/edit/country-edit.component';
import { CountryListComponent } from '@app/modules/master-data/country/list/country-list.component';
import { MasterDataRoutingModule } from '@app/modules/master-data/master-data-routing.module';
import { MasterDataComponent } from '@app/modules/master-data/master-data.component';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { MaterialModule } from '@app/shared/modules/material-module/material.module';

@NgModule({
  imports: [
    CommonModule,
    MasterDataRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    MasterDataComponent,
    CityListComponent,
    CountryListComponent,
    CountryEditComponent,
    CityEditComponent
  ],
  providers: [
    MasterDataService
  ]
})
export class MasterDataModule { }
