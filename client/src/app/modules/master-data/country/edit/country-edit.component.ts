import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryEditReponse, StateProvinces } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {
  editForm: FormGroup;
  country$!: Observable<CountryEditReponse>;

  @Input()
  id = 0;

  constructor(private fb: UntypedFormBuilder, private masterDataService: MasterDataService, private router: Router) {
    this.editForm = fb.group({
      name: ['', Validators.required],
      formalName: ['', Validators.required],
      region: ['', Validators.required],
      subregion: ['', Validators.required],
      continent: ['', Validators.required],
      population: [''],
      states: this.fb.array([
        this.fb.group({
          id: [],
          name: ['', Validators.required],
          code: ['', Validators.required],
          salesTerritory: ['', Validators.required],
          population: ['', Validators.required]
        })
      ])
    });
  }

  get states(): FormArray {
    return this.editForm.get('states') as FormArray;
  }

  ngOnInit(): void {
    this.country$ = this.masterDataService.getCountry(this.id)
      .pipe(
        tap(c => {
          this.editForm.patchValue(c);
          this.patchArray(c.states);
        }
      ));
  }

  addState(): void {
    const state = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      code: ['', Validators.required],
      salesTerritory: ['', Validators.required],
      population: ['', Validators.required]
    });

    this.states.insert(0, state);
  }

  removeState(index: number): void {
    this.states.removeAt(index);
  }

  getUnsavedStateCount(): string | null {
    const newCount = (this.states.value as StateProvinces[]).filter(s => s.id === 0).length;

    return newCount === 0 ? null : `(Unsaved: ${newCount})`;
  }

  save(): void {
    if (this.editForm.invalid) {
      return;
    }

    const request = { ...this.editForm.value, id: this.id } as CountryEditReponse;
    this.masterDataService.update(request).subscribe(() => this.router.navigateByUrl('/settings/countries'));
  }

  cancel(): void {
    this.editForm.reset();
    this.router.navigateByUrl('/settings/countries');
  }

  private patchArray(states: StateProvinces[]): void {
    const statesArray = this.states;
    statesArray.clear();

    states.forEach(s => {
      statesArray.push(this.fb.group({
        id: [s.id],
        name: [s.name, [Validators.required]],
        code: [s.code, [Validators.required]],
        salesTerritory: [s.salesTerritory, [Validators.required]],
        population: [s.population]
      }));
    });
  }
}
