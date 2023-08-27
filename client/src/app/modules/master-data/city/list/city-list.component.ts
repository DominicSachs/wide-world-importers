import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CityListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent extends BaseTableComponent<CityListReponse> {
  displayedColumns = ['name', 'state', 'country', 'population', 'actions'];
  citySearch = new FormControl<string | null>(null);

  constructor(private masterDataService: MasterDataService) {
    super('name', 'asc', 15);

    this.citySearch.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      untilDestroyed(this)
    ).subscribe(term => {
      this.dataFilter.searchTerm = term;
      this.reloadToFirstPage();
    });
  }

  protected override loadData(filter: DataFilter): Observable<PagedResponse<CityListReponse>> {
    return this.masterDataService.getCities(filter);
  }
}
