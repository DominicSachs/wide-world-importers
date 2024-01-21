import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StyleManager } from '@app/layout/content-layout/style-manager.service';
import { NavigationMenuComponent } from '@app/layout/navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [MatIcon, MatIconButton, MatToolbar, MatSidenav, MatSidenavContainer, MatSidenavContent, NavigationMenuComponent, RouterLink, RouterOutlet],
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
