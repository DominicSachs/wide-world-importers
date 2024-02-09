import { AfterViewInit, Directive, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { DataFilter, ListSortDirection } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { Observable, merge, of } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';

@Directive()
export abstract class BaseTableComponent<T> implements AfterViewInit {
  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  data$!: Observable<PagedResponse<T>>;
  dataFilter: DataFilter;

  constructor(protected sortColumn: string, protected sortDirection: 'asc' | 'desc' = 'asc', protected pageSize = 10) {
    this.dataFilter = new DataFilter(0, pageSize, sortColumn, this.getSortDirection(sortDirection));
  }

  ngAfterViewInit(): void {
    this.data$ = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.dataFilter = new DataFilter(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.getSortDirection(this.sort.direction));
          return this.loadData(this.dataFilter);
        }),
        catchError(() => of({ items: [], count: 0 } as PagedResponse<T>))
      );
  }

  reloadToFirstPage(): void {
    this.paginator.pageIndex = 0;
  }

  protected abstract loadData(filter: DataFilter): Observable<PagedResponse<T>>;

  private getSortDirection(direction: SortDirection): ListSortDirection {
    return direction === 'asc' ? ListSortDirection.Ascending : ListSortDirection.Descending;
  }
}
