import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { CityEditComponent } from '@app/modules/master-data/city/edit/city-edit.component';
import { CityEditResponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { MaterialModule } from '@app/shared/modules/material-module/material.module';
import { of } from 'rxjs';

describe('CityEditComponent', () => {
  let sut: CityEditComponent;
  let fixture: ComponentFixture<CityEditComponent>;
  let router: Router;
  let service: MasterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientTestingModule, NoopAnimationsModule, ReactiveFormsModule],
      declarations: [CityEditComponent],
      providers: [MasterDataService]
    });

    service = TestBed.inject(MasterDataService);
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

    spyOn(service, 'getCity').and.returnValue(of(mockResult));
    spyOn(sut.editForm, 'patchValue');

    sut.id = 1;
    sut.ngOnInit();
    sut.city$.subscribe();

    expect(service.getCity).toHaveBeenCalledOnceWith(1);
    expect(sut.editForm.patchValue).toHaveBeenCalledTimes(1);
  }));

  it('ngOnInit does not call masterDataService.getCity if url parameter ist 0 and does not patch the edit form', fakeAsync(() => {
    const mockResult = {
      name: 'City 1',
      population: 1000,
      countryId: 1,
      stateId: 1
    } as CityEditResponse;

    spyOn(service, 'getCity').and.returnValue(of(mockResult));
    spyOn(sut.editForm, 'patchValue');

    sut.id = 0;
    sut.ngOnInit();
    sut.city$.subscribe();

    expect(service.getCity).not.toHaveBeenCalledTimes(1);
    expect(sut.editForm.patchValue).not.toHaveBeenCalledTimes(1);
  }));

  it('save calls masterDataService.update if form is valid', fakeAsync(() => {
    spyOn(service, 'saveCity').and.returnValue(of(void 0));
    spyOn(router, 'navigateByUrl');

    const mockResult = {
      name: 'City 1',
      stateId: 1,
      countryId: 1,
      population: 1000
    } as CityEditResponse;

    sut.editForm.patchValue(mockResult);

    sut.id = 1;
    sut.save();

    expect(service.saveCity).toHaveBeenCalledWith({ ...mockResult, id: 1 });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/settings/cities');
  }));

  it('save does not call masterDataService.update if form is invalid', () => {
    spyOn(service, 'saveCity');

    sut.ngOnInit();
    sut.editForm.controls['name'].setValue(null);
    sut.save();

    expect(service.saveCity).not.toHaveBeenCalled();
  });

  it('cancel resets the edit form and navigates to list', () => {
    sut.editForm = new FormGroup({
      name: new FormControl('test-name')
    });

    spyOn(sut.editForm, 'reset').and.callThrough();
    spyOn(router, 'navigateByUrl');

    sut.cancel();

    expect(sut.editForm.reset).toHaveBeenCalled();
    expect(sut.editForm.controls['name'].value).toEqual(null);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/settings/cities');
  });
});
