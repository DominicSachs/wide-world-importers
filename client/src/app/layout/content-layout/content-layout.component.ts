import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { NavigationMenuComponent } from '@app/layout/navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [MatToolbarModule, MatSidenavModule, NavigationMenuComponent, RouterOutlet],
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent {
  opened = false;
}
