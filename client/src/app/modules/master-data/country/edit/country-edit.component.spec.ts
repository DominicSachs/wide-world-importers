import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryEditComponent } from '@app/modules/master-data/country/edit/country-edit.component';
import { CountryEditReponse, StateProvinces } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { MaterialModule } from '@app/shared/modules/material-module/material.module';
import { of } from 'rxjs';

describe('CountryEditComponent', () => {
  let sut: CountryEditComponent;
  let fixture: ComponentFixture<CountryEditComponent>;
  let router: Router;
  let service: MasterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientTestingModule],
      declarations: [CountryEditComponent],
      providers: [MasterDataService]
    });

    service = TestBed.inject(MasterDataService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CountryEditComponent);
    sut = fixture.componentInstance;
    fixture.detectChanges();
    sut.states.clear();
  });

  it('initializes the form', () => {
    fixture = TestBed.createComponent(CountryEditComponent);
    sut = fixture.componentInstance;
    sut.ngOnInit();

    expect(sut.editForm.controls['name']).toBeDefined();
    expect(sut.editForm.controls['formalName']).toBeDefined();
    expect(sut.editForm.controls['region']).toBeDefined();
    expect(sut.editForm.controls['subregion']).toBeDefined();
    expect(sut.editForm.controls['continent']).toBeDefined();
    expect(sut.editForm.controls['population']).toBeDefined();
    const statesArray = sut.editForm.get('states') as FormArray;
    expect(statesArray.at(0).get('id')).toBeDefined();
    expect(statesArray.at(0).get('name')).toBeDefined();
    expect(statesArray.at(0).get('code')).toBeDefined();
    expect(statesArray.at(0).get('salesTerritory')).toBeDefined();
    expect(statesArray.at(0).get('population')).toBeDefined();
  });

  it('ngOnInit calls masterDataService.getCountry and patches the edit form', fakeAsync(() => {
    const mockResult = {
      name: 'Country 1',
      formalName: 'Country 1',
      region: 'Region',
      subregion: 'Subregion',
      continent: 'Continent',
      states: [{ id: 1, name: 'State 1', code: 'S1', salesTerritory: 'Territory', population: 100 }]
    } as CountryEditReponse;

    spyOn(service, 'getCountry').and.returnValue(of(mockResult));
    spyOn(sut.editForm, 'patchValue');

    sut.ngOnInit();
    sut.country$.subscribe();

    expect(sut.editForm.patchValue).toHaveBeenCalledTimes(1);
    expect(sut.states.length).toBe(1);
  }));

  it('getUnsavedStateCount returns count of new states in form array', fakeAsync(() => {
    sut.addState();
    sut.states.at(0).get('id')?.setValue(1);
    sut.addState();

    expect(sut.states.length).toBe(2);
    expect(sut.getUnsavedStateCount()).toBe('(Unsaved: 1)');
  }));

  it('getUnsavedStateCount returns null if there are no new states in the form array', fakeAsync(() => {
    sut.states.clear();

    expect(sut.getUnsavedStateCount()).toBeNull();
  }));

  it('adds a state to the form group array', () => {
    sut.addState();

    expect(sut.states.length).toBe(1);
  });

  it('removes a state at the given index from the form group array', () => {
    sut.addState();
    sut.addState();

    sut.removeState(1);

    expect(sut.states.length).toBe(1);
  });

  it('save calls masterDataService.update if form is valid', fakeAsync(() => {
    spyOn(service, 'update').and.returnValue(of(void 0));
    spyOn(router, 'navigateByUrl');

    const mockResult = {
      name: 'Country 1',
      formalName: 'Country 1',
      region: 'Region',
      subregion: 'Subregion',
      continent: 'Continent',
      population: 0,
      states: [] as StateProvinces[]
    } as CountryEditReponse;

    sut.editForm.patchValue(mockResult);

    sut.id = 1;
    sut.save();

    expect(service.update).toHaveBeenCalledWith({ ...mockResult, id: 1 });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/settings/countries');
  }));

  it('save does not call masterDataService.update if form is invalid', () => {
    spyOn(service, 'update');

    sut.ngOnInit();
    sut.editForm.controls['name'].setValue(null);
    sut.save();

    expect(service.update).not.toHaveBeenCalled();
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
    expect(router.navigateByUrl).toHaveBeenCalledWith('/settings/countries');
  });
});
