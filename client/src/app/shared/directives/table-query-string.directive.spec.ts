import { EventEmitter } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { TableQueryStringDirective } from '@app/shared/directives/table-query-string.directive';

describe('TableQueryStringDirective', () => {
  let testObject: TableQueryStringDirective;
  const sort: MatSort = new MatSort();
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    router = {
      navigate: () => {}
    } as unknown as Router;

    route = {
      snapshot: {
        queryParamMap: convertToParamMap({ pageIndex: 2, pageSize: 10, sortActive: 'name', sortDirection: 'asc' })
      }
    } as unknown as ActivatedRoute;

    testObject = new TableQueryStringDirective(sort, router, route);
    testObject.paginator = {
      pageIndex: 0,
      pageSize: 0,
      pageSizeOptions: [10],
      page: new EventEmitter<PageEvent>()
    } as unknown as MatPaginator;

  });

  it('ngAfterViewInit sets sort and page paramaters', () => {
    testObject.ngAfterViewInit();

    expect(sort.active).toBe('name');
    expect(sort.direction).toBe('asc');
    expect(testObject.paginator.pageIndex).toBe(2);
    expect(testObject.paginator.pageSize).toBe(10);
  });

  it('calls router navigate on sorte change event', () => {
    jest.spyOn(router, 'navigate');

    testObject.ngAfterViewInit();
    sort.sort({ id: 'test', start: 'desc', disableClear: true });

    expect(router.navigate).toHaveBeenCalledWith([], { queryParams: { sortActive: 'test', sortDirection: 'desc', pageIndex: 2, pageSize: 10 }, queryParamsHandling: 'merge' });
  });

  it('calls router navigate on page event', fakeAsync(() => {
    jest.spyOn(router, 'navigate');

    testObject.ngAfterViewInit();
    testObject.paginator.page.emit({ } as PageEvent);

    expect(router.navigate).toHaveBeenCalledWith([], { queryParams: { sortActive: 'name', sortDirection: 'asc', pageIndex: 2, pageSize: 10 }, queryParamsHandling: 'merge' });
  }));
});
