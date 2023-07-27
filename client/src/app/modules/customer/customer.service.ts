import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerEditResponse, CustomerListReponse } from '@app/modules/customer/customer.model';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  getCustomers(filter: DataFilter): Observable<PagedResponse<CustomerListReponse>> {
    return this.httpClient.get<PagedResponse<CustomerListReponse>>(`${environment.apiUrl}/customers?${filter.toQueryString()}`);
  }

  getCustomer(id: number): Observable<CustomerEditResponse> {
    return this.httpClient.get<CustomerEditResponse>(`${environment.apiUrl}/customers/${id}`);
  }

  update(request: CustomerEditResponse): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiUrl}/customers/${request.id}`, request);
  }
}
