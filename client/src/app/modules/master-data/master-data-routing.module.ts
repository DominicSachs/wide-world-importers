import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from '@app/modules/master-data/countries/list/list.component';
import { MasterDataComponent } from '@app/modules/master-data/master-data.component';

const ROUTES: Routes = [{
  path: '',
  component: MasterDataComponent,
  children: [
    { path: '', redirectTo: '/settings/countries', pathMatch: 'full' },
    { path: 'countries', component: CountryListComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }