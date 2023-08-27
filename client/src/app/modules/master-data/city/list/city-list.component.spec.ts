import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CityListComponent } from '@app/modules/master-data/city/list/city-list.component';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { MaterialModule } from '@app/shared/modules/material-module/material.module';

describe('CityListComponent', () => {
  let sut: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;
  let service: MasterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientTestingModule, NoopAnimationsModule, ReactiveFormsModule],
      declarations: [CityListComponent],
      providers: [MasterDataService]
    });

    service = TestBed.inject(MasterDataService);
    fixture = TestBed.createComponent(CityListComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('calls getCities on ngAfterViewInit', fakeAsync(() => {
    spyOn(service, 'getCities');

    sut.data$.subscribe();
    sut.ngAfterViewInit();

    expect(service.getCities).toHaveBeenCalledTimes(1);
  }));

  it('search value change loads data', fakeAsync(() => {
    spyOn(sut, 'reloadToFirstPage');

    sut.citySearch.setValue('test');
    tick(410);

    expect(sut.reloadToFirstPage).toHaveBeenCalledTimes(1);
  }));
});
