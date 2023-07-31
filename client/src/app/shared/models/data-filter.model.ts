import { HttpParams } from '@angular/common/http';

export class DataFilter {
  sortColumn = '';
  sortDirection = ListSortDirection.Ascending;
  page = 0;
  pageSize = 10;

  reset(): void {
    this.page = 0;
    this.pageSize = 10;
    this.sortColumn = '';
  }

  toQueryString(): string {
    const params = new HttpParams()
      .set('page', this.page.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortColumn', this.sortColumn)
      .set('sortDirection', this.sortDirection);

    return params.toString();
  }
}

export enum ListSortDirection {
    Ascending = 0,
    Descending = 1
}
