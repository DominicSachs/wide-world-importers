import { HttpClient } from '@angular/common/http';
import { EMPTY, firstValueFrom, of } from 'rxjs';
import { CityEditResponse, CityListReponse, CountryEditReponse, CountryListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { DataFilter } from '@app/shared/models/data-filter.model';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { environment } from '@env/environment';

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

  it('gets a list of cities and sets the correct query string', async () => {
    const pagedResult = {
      items: [
        { id: 1, name: 'City 1' },
        { id: 2, name: 'City 2' }
      ],
      count: 2
    } as PagedResponse<CityListReponse>;

    const filter = new DataFilter();
    filter.sortColumn = 'name';
    filter.searchTerm = 'Denver';
    vi.spyOn(httpClient, 'get').mockReturnValue(of(pagedResult));

    const result = await firstValueFrom(sut.getCities(filter));

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/cities?page=0&pageSize=10&sortColumn=name&sortDirection=0&searchTerm=Denver`);
    expect(result.count).toBe(2);
  });

  it('gets a city and sets the correct paramter', async () => {
    const mockResult = { id: 1, name: 'City 1' };
    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResult));

    const result = await firstValueFrom(sut.getCity(1));

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/cities/1`);
    expect(result).toEqual(mockResult);
  });

  it('updates a city', async () => {
    vi.spyOn(httpClient, 'put').mockReturnValue(of(void 0));
    const cityToUpdate = { id: 1, name: 'City 1' } as CityEditResponse;

    await firstValueFrom(sut.saveCity(cityToUpdate));

    expect(httpClient.put).toHaveBeenCalledWith(`${environment.apiUrl}/cities/1`, cityToUpdate);
  });

  it('creates a city', async () => {
    vi.spyOn(httpClient, 'post').mockReturnValue(of(void 0));
    const cityToUpdate = { id: 0, name: 'City 1' } as CityEditResponse;

    await firstValueFrom(sut.saveCity(cityToUpdate));

    expect(httpClient.post).toHaveBeenCalledWith(`${environment.apiUrl}/cities`, cityToUpdate);
  });

  it('gets a list of countries and sets the correct query string', async () => {
    const pagedResult = {
      items: [
        { id: 1, name: 'Country 1' },
        { id: 2, name: 'Country 2' }
      ],
      count: 2
    } as PagedResponse<CountryListReponse>;

    const filter = new DataFilter();
    filter.sortColumn = 'name';
    vi.spyOn(httpClient, 'get').mockReturnValue(of(pagedResult));

    const result = await firstValueFrom(sut.getCountries(filter));

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/countries?page=0&pageSize=10&sortColumn=name&sortDirection=0`);
    expect(result.count).toBe(2);
  });

  it('gets a country and sets the correct paramter', async () => {
    const mockResult = { id: 1, name: 'Country 1' };
    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResult));

    const result = await firstValueFrom(sut.getCountry(1));

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/countries/1`);
    expect(result).toEqual(mockResult);
  });

  it('updates a country', async () => {
    vi.spyOn(httpClient, 'put').mockReturnValue(of(void 0));
    const countryToUpdate = { id: 1, name: 'Country 1' } as CountryEditReponse;

    await firstValueFrom(sut.saveCountry(countryToUpdate));

    expect(httpClient.put).toHaveBeenCalledWith(`${environment.apiUrl}/countries/1`, countryToUpdate);
  });

  it('gets a list of country names', async () => {
    const mockResult = [
        { id: 1, name: 'Country 1' },
        { id: 2, name: 'Country 2' }
      ];

    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResult));

    const result = await firstValueFrom(sut.getCountryNames());

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/countries/names`);
    expect(result.length).toBe(2);
  });

  it('gets a list of state names for country', async () => {
    const mockResult = [
        { id: 1, name: 'State 1' },
        { id: 2, name: 'State 2' }
      ];

    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResult));

    const result = await firstValueFrom(sut.getStateNamesForCountry(1));

    expect(httpClient.get).toHaveBeenCalledWith(`${environment.apiUrl}/countries/1/states`);
    expect(result.length).toBe(2);
  });

  it('gets a EMPTY observable if country id is false', () => {
    const mockResult = [
        { id: 1, name: 'State 1' },
        { id: 2, name: 'State 2' }
      ];

    vi.spyOn(httpClient, 'get').mockReturnValue(of(mockResult));

    const result = sut.getStateNamesForCountry(0);

    expect(httpClient.get).not.toHaveBeenCalled();
    expect(result).toBe(EMPTY);
  });
});
