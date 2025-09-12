import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { CityEditComponent } from '@app/modules/master-data/city/edit/city-edit.component';
import { CityEditResponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { KeyValueItem } from '@app/shared/models/key-value-item.model';

describe('CityEditComponent with valid input', () => {
  let sut: CityEditComponent;
  let fixture: ComponentFixture<CityEditComponent>;
  let router: Router;
  let service: MasterDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(MasterDataService, {
          getCountryNames: () => of([] as KeyValueItem<number, string>[]),
          getStateNamesForCountry: () => of([] as KeyValueItem<number, string>[]),
          getCity: () => of({} as CityEditResponse),
          saveCity: () => of(void 0)
        } as unknown as MasterDataService),
        provideNoopAnimations()
      ]
    })
    .compileComponents();

    service = TestBed.inject(MasterDataService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CityEditComponent);
    fixture.componentRef.setInput('id', 1);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit calls masterDataService.getCity if url parameter ist set and patches the edit form', fakeAsync(() => {
    const mockResult = {
      name: 'City 1',
      population: 1000,
      countryId: 1,
      stateId: 1
    } as CityEditResponse;

    vi.spyOn(service, 'getCity').mockReturnValue(of(mockResult));
    vi.spyOn(sut.editForm, 'patchValue');

    sut.ngOnInit();
    sut.city$.subscribe();

    expect(service.getCity).toHaveBeenNthCalledWith(1, 1);
    expect(sut.editForm.patchValue).toHaveBeenCalledTimes(1);
  }));

  it('save calls masterDataService.update if form is valid', fakeAsync(() => {
    vi.spyOn(service, 'saveCity').mockReturnValue(of(void 0));
    vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    const mockResult = {
      name: 'City 1',
      stateId: 1,
      countryId: 1,
      population: 1000
    } as CityEditResponse;

    sut.editForm.patchValue(mockResult);

    sut.save();
    tick(100);

    expect(service.saveCity).toHaveBeenCalledWith({ ...mockResult, id: 1 });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/settings/cities');
  }));

  it('save does not call masterDataService.update if form is invalid', () => {
    vi.spyOn(service, 'saveCity');

    sut.ngOnInit();
    sut.save();

    expect(service.saveCity).not.toHaveBeenCalled();
  });

  it('cancel resets the edit form and navigates to list', () => {
    vi.spyOn(router, 'navigateByUrl');

    sut.editForm.controls.name.setValue('test-name');
    sut.cancel();

    expect(sut.editForm.controls.name.value).toEqual('');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/settings/cities');
  });
});

describe('CityEditComponent', () => {
  let sut: CityEditComponent;
  let fixture: ComponentFixture<CityEditComponent>;
  let service: MasterDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(MasterDataService, {
          getCity: () => of({} as CityEditResponse),
          getCountryNames: () => of([] as KeyValueItem<number, string>[]),
          getStateNamesForCountry: () => of([] as KeyValueItem<number, string>[])
        } as unknown as MasterDataService),
        provideNoopAnimations()
      ]
    })
    .compileComponents();

    service = TestBed.inject(MasterDataService);
    fixture = TestBed.createComponent(CityEditComponent);
    fixture.componentRef.setInput('id', 0);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit does not call masterDataService.getCity if url parameter ist 0 and does not patch the edit form', fakeAsync(() => {
    const mockResult = {
      name: 'City 1',
      population: 1000,
      countryId: 1,
      stateId: 1
    } as CityEditResponse;

    vi.spyOn(service, 'getCity').mockReturnValue(of(mockResult));
    vi.spyOn(sut.editForm, 'patchValue');

    sut.ngOnInit();
    sut.city$.subscribe();

    expect(service.getCity).not.toHaveBeenCalledTimes(1);
    expect(sut.editForm.patchValue).not.toHaveBeenCalledTimes(1);
  }));
});
