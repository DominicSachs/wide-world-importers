import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryEditReponse as CountryEditResponse, CountryListReponse } from '@app/modules/master-data/master-data.model';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class MasterDataService {
  constructor(private httpClient: HttpClient) {}

  getCountries(filter: DataFilter): Observable<PagedResponse<CountryListReponse>> {
    return this.httpClient.get<PagedResponse<CountryListReponse>>(`${environment.apiUrl}/countries?${filter.toQueryString()}`);
  }

  getCountry(id: number): Observable<CountryEditResponse> {
    return this.httpClient.get<CountryEditResponse>(`${environment.apiUrl}/countries/${id}`);
  }

  update(request: CountryEditResponse): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiUrl}/countries/${request.id}`, request);
  }
}
