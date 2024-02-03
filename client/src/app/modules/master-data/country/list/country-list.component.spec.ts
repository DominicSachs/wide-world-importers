import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CountryListComponent } from '@app/modules/master-data/country/list/country-list.component';
import { CountryListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { firstValueFrom, of } from 'rxjs';

describe('CountryListComponent', () => {
  let sut: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let service: MasterDataService;

  beforeEach(async () => {
    service = {
      getCountries: () => of([])
    } as unknown as MasterDataService;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule]
    })
    .overrideComponent(CountryListComponent, {
      add: {
        providers: [{ provide: MasterDataService, useValue: service }]
      },
      remove: {
        providers: [MasterDataService]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryListComponent);
    sut = fixture.componentInstance;
    sut.paginator = {} as unknown as MatPaginator;
    sut.sort = {} as unknown as MatSort;

  });

  it('calls getCountries on ngAfterViewInit', fakeAsync(async () => {
    const mockResult = { count: 1, items: [{ name:'test' }] } as PagedResponse<CountryListReponse>;
    jest.spyOn(service, 'getCountries').mockReturnValue(of(mockResult));

    sut.ngAfterViewInit();

    const response = await firstValueFrom(sut.data$);
    expect(response).toStrictEqual(mockResult);
    expect(service.getCountries).toHaveBeenCalledTimes(1);
  }));
});
