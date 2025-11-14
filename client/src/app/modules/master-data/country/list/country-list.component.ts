import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MAT_TABLE } from '@app/import-groups';
import { CountryListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';

@Component({
  selector: 'app-list',
  imports: [AsyncPipe, MatIcon, ...MAT_TABLE, RouterLink],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryListComponent extends BaseTableComponent<CountryListReponse> {
  readonly displayedColumns = ['name', 'formalName', 'region', 'subregion', 'continent', 'stateProvinceCount', 'population', 'actions'];

  constructor(private masterDataService: MasterDataService) {
    super();
  }

  protected override loadData(filter: DataFilter): Observable<PagedResponse<CountryListReponse>> {
    return this.masterDataService.getCountries(filter);
  }
}
