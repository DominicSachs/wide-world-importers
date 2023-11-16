import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { StyleManager } from '@app/layout/content-layout/style-manager.service';
import { NavigationMenuComponent } from '@app/layout/navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, MatSidenavModule, NavigationMenuComponent, RouterOutlet],
  providers: [StyleManager],
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent {
  opened = false;
  isDarkMode = this.styleManager.isDark;

  constructor(private styleManager: StyleManager) {}

  toggleDarkTheme(): void {
    this.styleManager.toggleDarkTheme();
    this.isDarkMode = !this.isDarkMode;
  }
}
