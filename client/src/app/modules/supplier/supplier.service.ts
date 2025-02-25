import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CACHE_HEADER } from '@app/app.constants';
import { SupplierEditReponse, SupplierListReponse } from '@app/modules/supplier/supplier.model';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { KeyValueItem } from '@app/shared/models/key-value-item.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  constructor(private httpClient: HttpClient) {}

  getSuppliers(filter: DataFilter): Observable<PagedResponse<SupplierListReponse>> {
    return this.httpClient.get<PagedResponse<SupplierListReponse>>(`${environment.apiUrl}/suppliers?${filter.toQueryString()}`);
  }

  getSupplier(id: number): Observable<SupplierEditReponse> {
    return this.httpClient.get<SupplierEditReponse>(`${environment.apiUrl}/suppliers/${id}`);
  }

  getCategories(): Observable<KeyValueItem<number, string>[]> {
    const headers = new HttpHeaders().set(CACHE_HEADER, '');

    return this.httpClient.get<KeyValueItem<number, string>[]>(`${environment.apiUrl}/suppliers/categories`, { headers: headers });
  }

  getDeliveryMethods(): Observable<KeyValueItem<number, string>[]> {
    const headers = new HttpHeaders().set(CACHE_HEADER, '');

    return this.httpClient.get<KeyValueItem<number, string>[]>(`${environment.apiUrl}/suppliers/delivery-methods`, { headers: headers });
  }
}
