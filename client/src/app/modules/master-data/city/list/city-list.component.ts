import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MAT_TABLE } from '@app/import-groups';
import { CityListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
  imports: [AsyncPipe, MatFormField, MatIcon, MatInput, MatSuffix, ...MAT_TABLE, ReactiveFormsModule, RouterLink],
  providers: [MasterDataService]
  })
export class CityListComponent extends BaseTableComponent<CityListReponse> {
  displayedColumns = ['name', 'state', 'country', 'population', 'actions'];
  citySearch = new FormControl<string | null>(null);

  constructor(private masterDataService: MasterDataService) {
    super();

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
