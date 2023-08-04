import { HttpClient } from '@angular/common/http';
import { fakeAsync } from '@angular/core/testing';
import { CountryEditReponse, CountryListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { environment } from '@env/environment';
import { of } from 'rxjs';

describe('MasterDataService', () => {
  let httpClient: HttpClient;
  let sut: MasterDataService;

  beforeEach(() => {
    httpClient = {
      get: () => of({}),
      put: () => of({})
    } as unknown as HttpClient;

    sut = new MasterDataService(httpClient);
  });

  it('gets a list of countries and sets the correct query string', fakeAsync(() => {
    const pagedResult = {
      items: [
        { id: 1, name: 'Country 1' },
        { id: 2, name: 'Country 2' }
      ],
      count: 2
    } as PagedResponse<CountryListReponse>;

    const filter = new DataFilter();
    filter.sortColumn = 'name';
    spyOn(httpClient, 'get').and.returnValue(of(pagedResult));

    let result = {} as PagedResponse<CountryListReponse>;
    sut.getCountries(filter).subscribe(c => result = c);

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/countries?${filter.toQueryString()}`);
    expect(result.count).toBe(2);
  }));

  it('gets a country and sets the correct paramter', fakeAsync(() => {
    const mockResult = { id: 1, name: 'Country 1' };
    spyOn(httpClient, 'get').and.returnValue(of(mockResult));

    let result = {};
    sut.getCountry(1).subscribe(c => result = c);

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/countries/1`);
    expect(result).toEqual(mockResult);
  }));

  it('updates a country', fakeAsync(() => {
    spyOn(httpClient, 'put').and.returnValue(of(void 0));
    const countryToUpdate = { id: 1, name: 'Country 1' } as CountryEditReponse;

    sut.update(countryToUpdate).subscribe();

    expect(httpClient.put).toHaveBeenCalledWith(`${environment.apiUrl}/countries/1`, countryToUpdate);
  }));
});
