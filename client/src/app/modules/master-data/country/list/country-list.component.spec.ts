import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CountryListComponent } from '@app/modules/master-data/country/list/country-list.component';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { of } from 'rxjs';

describe('CountryListComponent', () => {
  let sut: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let service: MasterDataService;

  beforeEach(async () => {
    service = {
      getCountries: () => of([])
    } as unknown as MasterDataService;

    await TestBed.configureTestingModule({
      imports: [CountryListComponent, HttpClientTestingModule, NoopAnimationsModule]
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
  });

  it('calls getCountries on ngAfterViewInit', fakeAsync(() => {
    const spy = spyOn(service, 'getCountries');

    fixture.detectChanges();
    spy.calls.reset();

    sut.data$.subscribe();
    sut.ngAfterViewInit();

    expect(spy).toHaveBeenCalledTimes(1);
  }));
});
