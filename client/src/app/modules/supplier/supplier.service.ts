import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SupplierListReponse } from '@app/modules/supplier/supplier.model';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class SupplierService {
  constructor(private httpClient: HttpClient) {}

  getSuppliers(filter: DataFilter): Observable<PagedResponse<SupplierListReponse>> {
    return this.httpClient.get<PagedResponse<SupplierListReponse>>(`${environment.apiUrl}/suppliers?${filter.toQueryString()}`);
  }
}
