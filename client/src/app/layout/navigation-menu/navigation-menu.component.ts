import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAVIGATION_MENU_ITEMS } from '@app/layout/navigation-menu/navigation-menu.model';

@Component({
  selector: 'app-navigation-menu',
  imports: [MatIcon, MatListItem, MatNavList, RouterLink, RouterLinkActive],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.scss'
})
export class NavigationMenuComponent {
  items = NAVIGATION_MENU_ITEMS;
}
