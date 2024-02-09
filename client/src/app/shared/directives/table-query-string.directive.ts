import { AfterViewInit, Directive, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFilter } from '@app/shared/models/data-filter.model';

@Directive({
  standalone: true,
  selector: '[appTableQueryString]'
})
export class TableQueryStringDirective implements AfterViewInit, OnInit {
  @Input()
  paginator!: MatPaginator;

  @Input()
  filter!: DataFilter;

  constructor(private readonly sort: MatSort, private readonly router: Router, private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(paramMap => {
      const pageIndex = Number(paramMap.get('pageIndex'));
      const pageSize = Number(paramMap.get('pageSize'));
      const sortActive = paramMap.get('sortActive');
      const sortDirection = paramMap.get('sortDirection');

      if (sortActive) {
        this.sort.active = sortActive;
      }

      const direction = sortDirection as SortDirection;
      if (direction) {
        this.sort.direction = direction;
      }

      if (pageSize) {
        this.filter.pageSize = this.paginator.pageSize = this.paginator.pageSizeOptions.includes(pageSize) ? pageSize : 20;
      }

      if (pageIndex) {
        this.filter.page = this.paginator.pageIndex = pageIndex;
       }
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(_ => this.syncChangesToUrlQueryParams() );
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
