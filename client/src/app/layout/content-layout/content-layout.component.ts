import { Component, Inject, signal, Signal, DOCUMENT, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthStatus } from '@app/auth/auth.models';
import { AuthService } from '@app/auth/auth.service';
import { NavigationMenuComponent } from '@app/layout/navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-content-layout',
  imports: [MatIcon, MatSidenav, MatSidenavContainer, MatSidenavContent, MatToolbar, NavigationMenuComponent, RouterLink, RouterOutlet],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentLayoutComponent {
  readonly isDarkMode = signal(false);
  readonly authStatus: Signal<AuthStatus>;

  constructor(private readonly authService: AuthService, @Inject(DOCUMENT) private readonly document: Document) {
    this.authStatus = this.authService.authStatus;
  }

  toggleDarkTheme(): void {
    this.document.body.classList.toggle('dark-mode');
    this.isDarkMode.set(!this.isDarkMode());
  }
}
