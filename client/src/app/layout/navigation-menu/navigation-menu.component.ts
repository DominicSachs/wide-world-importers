import { Component } from '@angular/core';
import { NAVIGATION_MENU_ITEMS } from '@app/layout/navigation-menu/navigation-menu.model';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent {
  items = NAVIGATION_MENU_ITEMS;
}
