import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/home/home.component';

const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'customers', loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule) },
  { path: 'orders', loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule) },
  { path: 'suppliers', loadChildren: () => import('./modules/supplier/supplier.module').then(m => m.SupplierModule) },
  { path: 'settings', loadChildren: () => import('./modules/master-data/master-data.module').then(m => m.MasterDataModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
