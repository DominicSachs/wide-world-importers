import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CityListComponent } from '@app/modules/master-data/city/list/city-list.component';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { of } from 'rxjs';

describe('CityListComponent', () => {
  let sut: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;
  let service: MasterDataService;

  beforeEach(async () => {
    service = {
      getCities: () => of([])
    } as unknown as MasterDataService;

    await TestBed.configureTestingModule({
      imports: [CityListComponent, HttpClientTestingModule, NoopAnimationsModule, ReactiveFormsModule, RouterTestingModule]
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
  });

  it('calls getCities on ngAfterViewInit', fakeAsync(() => {
    const spy = spyOn(service, 'getCities');

    fixture.detectChanges();
    spy.calls.reset();

    sut.data$.subscribe();
    sut.ngAfterViewInit();

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('search value change loads data', fakeAsync(() => {
    spyOn(sut, 'reloadToFirstPage');

    sut.citySearch.setValue('test');
    tick(410);

    expect(sut.reloadToFirstPage).toHaveBeenCalledTimes(1);
  }));
});
