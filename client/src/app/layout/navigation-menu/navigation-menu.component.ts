import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAVIGATION_MENU_ITEMS } from '@app/layout/navigation-menu/navigation-menu.model';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [MatIconModule, MatListModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent {
  items = NAVIGATION_MENU_ITEMS;
}
