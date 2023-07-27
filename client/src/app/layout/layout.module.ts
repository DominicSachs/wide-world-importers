import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentLayoutComponent } from '@app/layout/content-layout/content-layout.component';
import { NavigationMenuComponent } from '@app/layout/navigation-menu/navigation-menu.component';
import { MaterialModule } from '@app/shared/modules/material-module/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    ContentLayoutComponent,
    NavigationMenuComponent
  ],
  exports: [
    ContentLayoutComponent
  ]
})
export class LayoutModule { }
