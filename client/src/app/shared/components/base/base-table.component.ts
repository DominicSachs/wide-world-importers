import { AfterViewInit, Directive, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Directive()
export abstract class BaseTableComponent<T> implements AfterViewInit {
  private readonly currentPage$: BehaviorSubject<PageEvent>;
  private readonly currentSort$: BehaviorSubject<Sort>;

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  data$!: Observable<PagedResponse<T>>;
  readonly dataFilter: DataFilter;

  constructor(
    protected sortColumn: string,
    protected sortDirection: 'asc' | 'desc' = 'asc',
    protected pageSize = 10
  ) {
    this.dataFilter = new DataFilter();
    this.dataFilter.sortColumn = `${this.sortColumn}.${this.sortDirection}`;
    this.dataFilter.pageSize = this.pageSize;
    this.currentPage$ = new BehaviorSubject<PageEvent>({ pageIndex: 0, pageSize: this.pageSize } as PageEvent);
    this.currentSort$ = new BehaviorSubject<Sort>({ active: this.sortColumn, direction: this.sortDirection });
  }

  ngAfterViewInit(): void {
    this.data$ = combineLatest([this.currentSort$, this.currentPage$]).pipe(
      switchMap(() => {
        this.dataFilter.page = this.paginator.pageIndex;
        this.dataFilter.pageSize = this.paginator.pageSize;
        this.dataFilter.sortColumn = `${this.sort.active}.${this.sort.direction}`;

        return this.loadData(this.dataFilter);
      }),
      catchError(() => of({ items: [], count: 0 } as PagedResponse<T>))
    );
  }

  pageChange(page: PageEvent): void {
    this.currentPage$.next(page);
  }

  sortChange(sort: Sort): void {
    this.currentSort$.next(sort);
  }

  protected abstract loadData(filter: DataFilter): Observable<PagedResponse<T>>;
}
