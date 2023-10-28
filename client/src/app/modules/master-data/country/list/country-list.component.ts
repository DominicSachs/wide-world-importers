import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CountryListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AsyncPipe, MatIconModule, MatPaginatorModule, MatSortModule, MatTableModule, NgIf, RouterLink],
  providers: [MasterDataService],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent extends BaseTableComponent<CountryListReponse> {
  displayedColumns = ['name', 'formalName', 'region', 'subregion', 'continent', 'stateProvinceCount', 'population', 'actions'];

  constructor(private masterDataService: MasterDataService) {
    super('name', 'asc', 15);
  }

  protected override loadData(filter: DataFilter): Observable<PagedResponse<CountryListReponse>> {
    return this.masterDataService.getCountries(filter);
  }
}
