import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityEditComponent } from '@app/modules/master-data/city/edit/city-edit.component';
import { CityListComponent } from '@app/modules/master-data/city/list/city-list.component';
import { CountryEditComponent } from '@app/modules/master-data/country/edit/country-edit.component';
import { CountryListComponent } from '@app/modules/master-data/country/list/country-list.component';
import { MasterDataComponent } from '@app/modules/master-data/master-data.component';

const ROUTES: Routes = [{
  path: '',
  component: MasterDataComponent,
  children: [
    { path: '', redirectTo: '/settings/countries', pathMatch: 'full' },
    { path: 'cities', component: CityListComponent },
    { path: 'cities/:id', component: CityEditComponent },
    { path: 'countries', component: CountryListComponent },
    { path: 'countries/:id', component: CountryEditComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
