import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { CityListComponent } from '@app/modules/master-data/city/list/city-list.component';
import { CityListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { PagedResponse } from '@app/shared/models/paged-response.model';
import { firstValueFrom, of } from 'rxjs';

describe('CityListComponent', () => {
  let sut: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;
  let service: MasterDataService;

  beforeEach(async () => {
    service = {
      getCities: () => of([])
    } as unknown as MasterDataService;

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ReactiveFormsModule],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
    })
    .overrideComponent(CityListComponent, {
      add: {
        providers: [{ provide: MasterDataService, useValue: service }]
      },
      remove: {
        providers: [MasterDataService]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityListComponent);
    sut = fixture.componentInstance;
    sut.paginator = {} as unknown as MatPaginator;
    sut.sort = {} as unknown as MatSort;
  });

  it('calls getCities on ngAfterViewInit', fakeAsync(async () => {
    const mockResult = { count: 1, items: [{ name:'test' }] } as PagedResponse<CityListReponse>;
    jest.spyOn(service, 'getCities').mockReturnValue(of(mockResult));

    sut.ngAfterViewInit();
    tick(1);

    const response = await firstValueFrom(sut.data$);
    expect(response).toStrictEqual(mockResult);
    expect(service.getCities).toHaveBeenCalledTimes(1);
  }));

  it('search value change loads data', fakeAsync(() => {
    jest.spyOn(sut, 'reloadToFirstPage');

    sut.citySearch.setValue('test');
    tick(410);

    expect(sut.reloadToFirstPage).toHaveBeenCalledTimes(1);
  }));
});
