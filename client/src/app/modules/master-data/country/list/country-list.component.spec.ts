import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CountryListComponent } from '@app/modules/master-data/country/list/country-list.component';
import { MasterDataService } from '@app/modules/master-data/master-data.service';

describe('CountryListComponent', () => {
  let sut: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let service: MasterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CountryListComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [MasterDataService]
    });

    service = TestBed.inject(MasterDataService);
    fixture = TestBed.createComponent(CountryListComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('calls getCountries on ngAfterViewInit', fakeAsync(() => {
    spyOn(service, 'getCountries');

    sut.data$.subscribe();
    sut.ngAfterViewInit();

    expect(service.getCountries).toHaveBeenCalledTimes(1);
  }));
});
