import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MAT_TABLE } from '@app/import-groups';
import { CountryListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './country-list.component.html',
    styleUrls: ['./country-list.component.scss'],
    imports: [AsyncPipe, MatIcon, ...MAT_TABLE, RouterLink],
    providers: [MasterDataService]
})
export class CountryListComponent extends BaseTableComponent<CountryListReponse> {
  displayedColumns = ['name', 'formalName', 'region', 'subregion', 'continent', 'stateProvinceCount', 'population', 'actions'];

  constructor(private masterDataService: MasterDataService) {
    super();
  }

  protected override loadData(filter: DataFilter): Observable<PagedResponse<CountryListReponse>> {
    return this.masterDataService.getCountries(filter);
  }
}
