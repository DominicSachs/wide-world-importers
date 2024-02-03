import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CityEditComponent } from '@app/modules/master-data/city/edit/city-edit.component';
import { CityEditResponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { KeyValueItem } from '@app/shared/models/key-value-item.model';
import { of } from 'rxjs';

describe('CityEditComponent', () => {
  let sut: CityEditComponent;
  let fixture: ComponentFixture<CityEditComponent>;
  let router: Router;
  let service: MasterDataService;

  beforeEach(async () => {
    service = {
      getCountryNames: () => of([] as KeyValueItem<number, string>[]),
      getStateNamesForCountry: () => of([] as KeyValueItem<number, string>[]),
      getCity: () => of({} as CityEditResponse),
      saveCity: () => of(void 0)
    } as unknown as MasterDataService;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule, RouterTestingModule.withRoutes([])]
    })
    .overrideComponent(CityEditComponent, {
      add: {
        providers: [{ provide: MasterDataService, useValue: service }]
      },
      remove: {
        providers: [MasterDataService]
      }
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CityEditComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initializes the form', () => {
    expect(sut.editForm.controls['name']).toBeDefined();
    expect(sut.editForm.controls['population']).toBeDefined();
    expect(sut.editForm.controls['countryId']).toBeDefined();
    expect(sut.editForm.controls['stateId']).toBeDefined();

    expect(sut.countries$).toBeDefined();
  });

  it('ngOnInit calls masterDataService.getCity if url parameter ist set and patches the edit form', fakeAsync(() => {
    const mockResult = {
      name: 'City 1',
      population: 1000,
      countryId: 1,
      stateId: 1
    } as CityEditResponse;

    jest.spyOn(service, 'getCity').mockReturnValue(of(mockResult));
    jest.spyOn(sut.editForm, 'patchValue');

    sut.id = 1;
    sut.ngOnInit();
    sut.city$.subscribe();

    expect(service.getCity).toHaveBeenNthCalledWith(1, 1);
    expect(sut.editForm.patchValue).toHaveBeenCalledTimes(1);
  }));

  it('ngOnInit does not call masterDataService.getCity if url parameter ist 0 and does not patch the edit form', fakeAsync(() => {
    const mockResult = {
      name: 'City 1',
      population: 1000,
      countryId: 1,
      stateId: 1
    } as CityEditResponse;

    jest.spyOn(service, 'getCity').mockReturnValue(of(mockResult));
    jest.spyOn(sut.editForm, 'patchValue');

    sut.id = 0;
    sut.ngOnInit();
    sut.city$.subscribe();

    expect(service.getCity).not.toHaveBeenCalledTimes(1);
    expect(sut.editForm.patchValue).not.toHaveBeenCalledTimes(1);
  }));

  it('save calls masterDataService.update if form is valid', fakeAsync(() => {
    jest.spyOn(service, 'saveCity').mockReturnValue(of(void 0));
    jest.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    const mockResult = {
      name: 'City 1',
      stateId: 1,
      countryId: 1,
      population: 1000
    } as CityEditResponse;

    sut.editForm.patchValue(mockResult);

    sut.id = 1;
    sut.save();
    tick(100);

    expect(service.saveCity).toHaveBeenCalledWith({ ...mockResult, id: 1 });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/settings/cities');
  }));

  it('save does not call masterDataService.update if form is invalid', () => {
    jest.spyOn(service, 'saveCity');

    sut.ngOnInit();
    sut.save();

    expect(service.saveCity).not.toHaveBeenCalled();
  });

  it('cancel resets the edit form and navigates to list', () => {
    jest.spyOn(router, 'navigateByUrl');

    sut.editForm.controls.name.setValue('test-name');
    sut.cancel();

    expect(sut.editForm.controls.name.value).toEqual('');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/settings/cities');
  });
});
