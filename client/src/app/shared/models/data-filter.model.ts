import { HttpParams } from '@angular/common/http';
// import { CustomUrlEncoder } from '../../../core/infrastructure/http/custom-url-encoder';

export class DataFilter {
  sortColumn = '';
  page = 0;
  pageSize = 10;

  reset(): void {
    this.page = 0;
    this.pageSize = 10;
    this.sortColumn = '';
  }

  toQueryString(): string {
    const params = new HttpParams() // { encoder: new CustomUrlEncoder() }
      .set('page', this.page.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortColumn', this.sortColumn);

    return params.toString();
  }
}
