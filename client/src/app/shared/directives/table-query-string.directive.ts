import { AfterViewInit, Directive, input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
  selector: '[appTableQueryString]',
  standalone: true
})
export class TableQueryStringDirective implements AfterViewInit {
  readonly paginator = input.required<MatPaginator>();

  constructor(private readonly sort: MatSort, private readonly router: Router, private readonly route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    const paramMap = this.route.snapshot.queryParamMap;
    const pageIndex = Number(paramMap.get('pageIndex'));
    const pageSize = Number(paramMap.get('pageSize'));
    const sortActive = paramMap.get('sortActive');
    const sortDirection = paramMap.get('sortDirection') as SortDirection;

    if (sortActive) {
      this.sort.active = sortActive;
    }

    if (sortDirection) {
      this.sort.direction = sortDirection;
    }

    const paginator = this.paginator();
    if (pageSize) {
      paginator.pageSize = paginator.pageSizeOptions.includes(pageSize) ? pageSize : 20;
    }

    if (pageIndex) {
      paginator.pageIndex = pageIndex;
    }

    paginator.page.subscribe(_ => this.syncChangesToUrlQueryParams());
    this.sort.sortChange.subscribe(_ => this.syncChangesToUrlQueryParams());
  }

  private syncChangesToUrlQueryParams(): void {
    const params = {
      sortActive: this.sort.active,
      sortDirection: this.sort.direction,
      pageIndex: this.paginator().pageIndex,
      pageSize: this.paginator().pageSize
    };

    this.router.navigate([], { queryParams: params, queryParamsHandling: 'merge' });
  }
}
