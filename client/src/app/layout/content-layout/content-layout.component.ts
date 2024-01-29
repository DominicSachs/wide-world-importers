import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthStatus } from '@app/auth/auth.models';
import { AuthService } from '@app/auth/auth.service';
import { StyleManager } from '@app/layout/content-layout/style-manager.service';
import { NavigationMenuComponent } from '@app/layout/navigation-menu/navigation-menu.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content-layout',
  standalone: true,
  providers: [StyleManager],
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  imports: [AsyncPipe, MatIcon, MatIconButton, MatToolbar, MatSidenav, MatSidenavContainer, MatSidenavContent, NavigationMenuComponent, NgIf, RouterLink, RouterOutlet]
})
export class ContentLayoutComponent {
  opened = false;
  isDarkMode = this.styleManager.isDark;
  readonly authStatus$: Observable<AuthStatus>;

  constructor(private readonly styleManager: StyleManager, private readonly authService: AuthService) {
    this.authStatus$ = authService.authStatus$;
  }

  toggleDarkTheme(): void {
    this.styleManager.toggleDarkTheme();
    this.isDarkMode = !this.isDarkMode;
  }
}
