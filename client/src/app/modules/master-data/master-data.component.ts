import { Component } from '@angular/core';
import { KeyValueItem } from '@app/shared/models/key-value-item.model';

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss']
})
export class MasterDataComponent {
  readonly menuItems = [
    new KeyValueItem('Countries', '/settings/countries'),
    new KeyValueItem('Cities', '/settings/cities')
  ];
}
