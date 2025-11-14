import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { firstValueFrom, of } from 'rxjs';
import { CountryEditComponent } from '@app/modules/master-data/country/edit/country-edit.component';
import { CountryEditReponse, StateProvinces } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';

describe('CountryEditComponent with valid input', () => {
  let sut: CountryEditComponent;
  let fixture: ComponentFixture<CountryEditComponent>;
  let router: Router;
  let service: MasterDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProvider(MasterDataService, { getCountry: () => of({ states: [] }), saveCountry: () => of(void 0) } as unknown as MasterDataService)]
    })
    .compileComponents();

    service = TestBed.inject(MasterDataService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CountryEditComponent);
    fixture.componentRef.setInput('id', 1);
    sut = fixture.componentInstance;
    // fixture.detectChanges();
    // sut.states.clear();

    await fixture.whenStable();
  });

  it('initializes the form', () => {
    fixture = TestBed.createComponent(CountryEditComponent);
    fixture.componentRef.setInput('id', 1);
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

  it('ngOnInit calls masterDataService.getCountry and patches the edit form', async () => {
    const mockResult = {
      name: 'Country 1',
      formalName: 'Country 1',
      region: 'Region',
      subregion: 'Subregion',
      continent: 'Continent',
      states: [{ id: 1, name: 'State 1', code: 'S1', salesTerritory: 'Territory', population: 100 }]
    } as CountryEditReponse;

    vi.spyOn(service, 'getCountry').mockReturnValue(of(mockResult));
    vi.spyOn(sut.editForm, 'patchValue');

    sut.ngOnInit();
    await firstValueFrom(sut.country$);

    expect(service.getCountry).toHaveBeenNthCalledWith(1, 1);
    expect(sut.editForm.patchValue).toHaveBeenCalledTimes(1);
    expect(sut.states.length).toBe(1);
  });

  it('getUnsavedStateCount returns count of new states in form array', () => {
    sut.addState();
    sut.states.at(0).get('id')?.setValue(1);
    sut.addState();

    expect(sut.states.length).toBe(2);
    expect(sut.getUnsavedStateCount()).toBe('(Unsaved: 1)');
  });

  it('getUnsavedStateCount returns null if there are no new states in the form array', () => {
    sut.states.clear();

    expect(sut.getUnsavedStateCount()).toBeNull();
  });

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

  it('save calls masterDataService.update if form is valid', () => {
    vi.spyOn(service, 'saveCountry').mockReturnValue(of(void 0));
    vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    fixture.componentRef.setInput('id', 1);

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

    sut.save();

    expect(service.saveCountry).toHaveBeenCalledWith({ ...mockResult, id: 1 });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/settings/countries');
  });

  it('save does not call masterDataService.update if form is invalid', () => {
    vi.spyOn(service, 'saveCountry');

    sut.ngOnInit();
    sut.editForm.controls['name'].setValue(null!);
    sut.save();

    expect(service.saveCountry).not.toHaveBeenCalled();
  });

  it('cancel resets the edit form and navigates to list', () => {
    vi.spyOn(sut.editForm, 'reset');
    vi.spyOn(router, 'navigateByUrl');

    sut.editForm.controls.name.setValue('test');
    sut.cancel();

    expect(sut.editForm.reset).toHaveBeenCalled();
    expect(sut.editForm.controls.name.value).toEqual('');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/settings/countries');
  });
});
