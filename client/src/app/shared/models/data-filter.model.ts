import { HttpParams } from '@angular/common/http';
import { SortDirection } from '@angular/material/sort';

export class DataFilter {
  sortColumn = '';
  sortDirection: SortDirection = 'asc';
  page = 0;
  pageSize = 10;
  searchTerm: string | null = null;

  constructor(page = 0, pageSize = 10, sortColumn = '', sortDirection: SortDirection = 'asc') {
    this.sortColumn = sortColumn;
    this.sortDirection = sortDirection;
    this.page = page;
    this.pageSize = pageSize;
  }

  reset(): void {
    this.page = 0;
    this.pageSize = 10;
    this.sortColumn = '';
  }

  toQueryString(): string {
    let params = new HttpParams()
      .set('page', this.page)
      .set('pageSize', this.pageSize)
      .set('sortColumn', this.sortColumn)
      .set('sortDirection', this.sortDirection === 'asc' ? 0 : 1);

      if (this.searchTerm) {
        params = params.set('searchTerm', this.searchTerm);
      }

    return params.toString();
  }
}
