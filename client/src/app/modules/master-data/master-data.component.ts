import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { KeyValueItem } from '@app/shared/models/key-value-item.model';

@Component({
  selector: 'app-master-data',
  imports: [MatTabLink, MatTabNav, MatTabNavPanel, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './master-data.component.html',
  styleUrl: './master-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterDataComponent {
  readonly menuItems = [
    new KeyValueItem('Countries', '/settings/countries'),
    new KeyValueItem('Cities', '/settings/cities')
  ];
}
