import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityEditResponse, CityListReponse, CountryEditReponse as CountryEditResponse, CountryListReponse } from '@app/modules/master-data/master-data.model';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { KeyValueItem } from '@app/shared/models/key-value-item.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { environment } from '@env/environment';
import { EMPTY, Observable, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MasterDataService {
  private countryNamesRequest$!: Observable<KeyValueItem<number, string>[]>;

  constructor(private httpClient: HttpClient) {}

  getCities(filter: DataFilter): Observable<PagedResponse<CityListReponse>> {
    return this.httpClient.get<PagedResponse<CityListReponse>>(`${environment.apiUrl}/cities?${filter.toQueryString()}`);
  }

  getCity(id: number): Observable<CityEditResponse> {
    return this.httpClient.get<CityEditResponse>(`${environment.apiUrl}/cities/${id}`);
  }

  saveCity(request: CityEditResponse): Observable<void> {
    if ( request.id === 0) {
      return this.httpClient.post<void>(`${environment.apiUrl}/cities`, request);
    }

    return this.httpClient.put<void>(`${environment.apiUrl}/cities/${request.id}`, request);
  }

  getCountries(filter: DataFilter): Observable<PagedResponse<CountryListReponse>> {
    return this.httpClient.get<PagedResponse<CountryListReponse>>(`${environment.apiUrl}/countries?${filter.toQueryString()}`);
  }

  getCountry(id: number): Observable<CountryEditResponse> {
    return this.httpClient.get<CountryEditResponse>(`${environment.apiUrl}/countries/${id}`);
  }

  saveCountry(request: CountryEditResponse): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiUrl}/countries/${request.id}`, request);
  }

  getCountryNames(refresh?: boolean): Observable<KeyValueItem<number, string>[]> {
    if (!this.countryNamesRequest$ || refresh) {
      // use shareReplay to cache the response
      this.countryNamesRequest$ = this.httpClient.get<KeyValueItem<number, string>[]>(`${environment.apiUrl}/countries/names`).pipe(shareReplay(1));
    }

    return this.countryNamesRequest$;
  }

  getStateNamesForCountry(countryId: number): Observable<KeyValueItem<number, string>[]> {
    if (!countryId) {
      return EMPTY;
    }

    return this.httpClient.get<KeyValueItem<number, string>[]>(`${environment.apiUrl}/countries/${countryId}/states`);
  }
}
