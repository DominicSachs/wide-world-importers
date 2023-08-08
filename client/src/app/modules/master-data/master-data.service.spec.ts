import { HttpClient } from '@angular/common/http';
import { fakeAsync } from '@angular/core/testing';
import { CityEditResponse, CityListReponse, CountryEditReponse, CountryListReponse } from '@app/modules/master-data/master-data.model';
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
      put: () => of({}),
      post: () => of({})
    } as unknown as HttpClient;

    sut = new MasterDataService(httpClient);
  });

  it('gets a list of cities and sets the correct query string', fakeAsync(() => {
    const pagedResult = {
      items: [
        { id: 1, name: 'City 1' },
        { id: 2, name: 'City 2' }
      ],
      count: 2
    } as PagedResponse<CityListReponse>;

    const filter = new DataFilter();
    filter.sortColumn = 'name';
    spyOn(httpClient, 'get').and.returnValue(of(pagedResult));

    let result = {} as PagedResponse<CityListReponse>;
    sut.getCities(filter).subscribe(c => result = c);

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/cities?${filter.toQueryString()}`);
    expect(result.count).toBe(2);
  }));

  it('gets a city and sets the correct paramter', fakeAsync(() => {
    const mockResult = { id: 1, name: 'City 1' };
    spyOn(httpClient, 'get').and.returnValue(of(mockResult));

    let result = {};
    sut.getCity(1).subscribe(c => result = c);

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/cities/1`);
    expect(result).toEqual(mockResult);
  }));

  it('updates a city', fakeAsync(() => {
    spyOn(httpClient, 'put').and.returnValue(of(void 0));
    const cityToUpdate = { id: 1, name: 'City 1' } as CityEditResponse;

    sut.saveCity(cityToUpdate).subscribe();

    expect(httpClient.put).toHaveBeenCalledWith(`${environment.apiUrl}/cities/1`, cityToUpdate);
  }));

  it('creates a city', fakeAsync(() => {
    spyOn(httpClient, 'post').and.returnValue(of(void 0));
    const cityToUpdate = { id: 0, name: 'City 1' } as CityEditResponse;

    sut.saveCity(cityToUpdate).subscribe();

    expect(httpClient.post).toHaveBeenCalledWith(`${environment.apiUrl}/cities`, cityToUpdate);
  }));

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

    sut.saveCountry(countryToUpdate).subscribe();

    expect(httpClient.put).toHaveBeenCalledWith(`${environment.apiUrl}/countries/1`, countryToUpdate);
  }));
});
