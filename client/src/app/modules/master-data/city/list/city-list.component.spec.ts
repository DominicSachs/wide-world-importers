import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { firstValueFrom, of } from 'rxjs';
import { CityListComponent } from '@app/modules/master-data/city/list/city-list.component';
import { CityListReponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { PagedResponse } from '@app/shared/models/paged-response.model';

describe('CityListComponent', () => {
  let sut: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;
  let service: MasterDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProvider(ActivatedRoute), MockProvider(MasterDataService)]
    })
    .compileComponents();

    service = TestBed.inject(MasterDataService);
    fixture = TestBed.createComponent(CityListComponent);
    sut = fixture.componentInstance;
    vi.spyOn(sut, 'paginator').mockReturnValue({ page: new EventEmitter<PageEvent>() } as MatPaginator);
    vi.spyOn(sut, 'sort').mockReturnValue({ sortChange: new EventEmitter<Sort>() } as MatSort);
  });

  it('calls getCities on ngAfterViewInit', async () => {
    const mockResult = { count: 1, items: [{ name:'test' }] } as PagedResponse<CityListReponse>;
    vi.spyOn(service, 'getCities').mockReturnValue(of(mockResult));

    sut.ngAfterViewInit();

    const response = await firstValueFrom(sut.data$);
    expect(response).toStrictEqual(mockResult);
    expect(service.getCities).toHaveBeenCalledTimes(1);
  });

  it('search value change loads data', async () => {
    vi.useFakeTimers();
    vi.spyOn(sut, 'reloadToFirstPage');

    sut.ngOnInit();
    sut.citySearch.setValue('test');

    await vi.advanceTimersByTimeAsync(401);
    await Promise.resolve();

    expect(sut.dataFilter.searchTerm).toBe('test');
    expect(sut.reloadToFirstPage).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
