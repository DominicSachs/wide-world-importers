import { Component } from '@angular/core';
import { CityListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent extends BaseTableComponent<CityListReponse> {
  displayedColumns = ['name', 'state', 'country', 'population', 'actions'];

  constructor(private masterDataService: MasterDataService) {
    super('name', 'asc', 15);
  }

  protected override loadData(filter: DataFilter): Observable<PagedResponse<CityListReponse>> {
    return this.masterDataService.getCities(filter);
  }
}
