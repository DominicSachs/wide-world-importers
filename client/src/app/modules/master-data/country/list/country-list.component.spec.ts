import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MockProvider } from 'ng-mocks';
import { firstValueFrom, of } from 'rxjs';
import { CountryListComponent } from '@app/modules/master-data/country/list/country-list.component';
import { CountryListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { PagedResponse } from '@app/shared/models/paged-response.model';

describe('CountryListComponent', () => {
  let sut: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let service: MasterDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProvider(MasterDataService, { getCountries: () => of({}) } as unknown as MasterDataService)]
    })
    .compileComponents();

    service = TestBed.inject(MasterDataService);
    fixture = TestBed.createComponent(CountryListComponent);
    sut = fixture.componentInstance;
    jest.spyOn(sut, 'paginator').mockReturnValue({ page: new EventEmitter<PageEvent>() } as MatPaginator);
    jest.spyOn(sut, 'sort').mockReturnValue({ sortChange: new EventEmitter<Sort>() } as MatSort);
  });

  it('calls getCountries on ngAfterViewInit', fakeAsync(async () => {
    const mockResult = { count: 1, items: [{ name:'test' }] } as PagedResponse<CountryListReponse>;
    jest.spyOn(service, 'getCountries').mockReturnValue(of(mockResult));

    sut.ngAfterViewInit();
    tick(1);

    const response = await firstValueFrom(sut.data$);
    expect(response).toStrictEqual(mockResult);
    expect(service.getCountries).toHaveBeenCalledTimes(1);
  }));
});
