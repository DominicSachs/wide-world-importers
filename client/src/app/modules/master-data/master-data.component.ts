import { Component } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { KeyValueItem } from '@app/shared/models/key-value-item.model';

@Component({
  selector: 'app-master-data',
  standalone: true,
  imports: [MatTabLink, MatTabNav, MatTabNavPanel, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent {
  readonly menuItems = [
    new KeyValueItem('Countries', '/settings/countries'),
    new KeyValueItem('Cities', '/settings/cities')
  ];
}
