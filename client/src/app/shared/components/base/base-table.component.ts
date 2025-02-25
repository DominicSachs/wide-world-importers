import { AfterViewInit, Directive, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, merge, of } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';

@Directive()
export abstract class BaseTableComponent<T> implements AfterViewInit {
  readonly sort = viewChild.required(MatSort);
  readonly paginator = viewChild.required(MatPaginator);
  data$!: Observable<PagedResponse<T>>;
  dataFilter: DataFilter = new DataFilter();

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.data$ = merge(this.sort().sortChange, this.paginator().page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.dataFilter.page = this.paginator().pageIndex;
          this.dataFilter.pageSize = this.paginator().pageSize;
          this.dataFilter.sortColumn = this.sort().active;
          this.dataFilter.sortDirection = this.sort().direction;

          return this.loadData(this.dataFilter);
        }),
        catchError(() => of({ items: [], count: 0 } as PagedResponse<T>))
      );
    }, 0);
  }

  reloadToFirstPage(): void {
    const paginator = this.paginator();
    paginator.pageIndex = 0;
    paginator.page.emit({ pageIndex: paginator.pageIndex, pageSize: paginator.pageSize, length: paginator.length });
  }

  protected abstract loadData(filter: DataFilter): Observable<PagedResponse<T>>;
}
