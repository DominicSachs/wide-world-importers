import { AfterViewInit, Directive, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
  standalone: true,
  selector: '[appTableQueryString]'
})
export class TableQueryStringDirective implements AfterViewInit {
  @Input()
  paginator!: MatPaginator;

  constructor(private readonly sort: MatSort, private readonly router: Router, private readonly route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.route.queryParamMap.subscribe(paramMap => {
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

      if (pageSize) {
        this.paginator.pageSize = this.paginator.pageSizeOptions.includes(pageSize) ? pageSize : 20;
      }

      if (pageIndex) {
        this.paginator.pageIndex = pageIndex;
       }
    });

    this.paginator.page.subscribe(_ => this.syncChangesToUrlQueryParams());
    this.sort.sortChange.subscribe(_ => this.syncChangesToUrlQueryParams());
  }

  private syncChangesToUrlQueryParams(): void {
    const params = {
      sortActive: this.sort.active,
      sortDirection: this.sort.direction,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };

    this.router.navigate([], { queryParams: params, queryParamsHandling: 'merge' });
  }
}
