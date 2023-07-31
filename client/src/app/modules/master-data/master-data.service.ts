import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryListReponse } from '@app/modules/master-data/master-data.model';
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
}
