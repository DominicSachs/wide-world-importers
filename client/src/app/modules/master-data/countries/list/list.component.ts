import { Component } from '@angular/core';
import { CountryListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CountryListComponent extends BaseTableComponent<CountryListReponse> {
  displayedColumns = ['name', 'formalName', 'region', 'subregion', 'continent', 'population', 'actions'];

  constructor(private masterDataService: MasterDataService) {
    super('name', 'asc', 15);
  }

  protected override loadData(filter: DataFilter): Observable<PagedResponse<CountryListReponse>> {
    return this.masterDataService.getCountries(filter);
  }
}
