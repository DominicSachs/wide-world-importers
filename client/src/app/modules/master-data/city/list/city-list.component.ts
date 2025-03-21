import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { MAT_TABLE } from '@app/import-groups';
import { CityListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { BaseTableComponent } from '@app/shared/components/base/base-table.component';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';

@UntilDestroy()
@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.scss',
  imports: [AsyncPipe, MatFormField, MatIcon, MatInput, MatSuffix, ...MAT_TABLE, ReactiveFormsModule, RouterLink]
})
export class CityListComponent extends BaseTableComponent<CityListReponse> implements OnInit {
  displayedColumns = ['name', 'state', 'country', 'population', 'actions'];
  citySearch = new FormControl<string | null>(null);

  constructor(private masterDataService: MasterDataService) {
    super();
  }

  ngOnInit(): void {
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
