import { AsyncPipe } from '@angular/common';
import { Component, OnInit, input, numberAttribute } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CountryEditReponse, StateProvinces } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';

@Component({
  selector: 'app-edit',
  imports: [
    AsyncPipe,
    MatAccordion,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatError,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './country-edit.component.html',
  styleUrl: './country-edit.component.scss'
})
export class CountryEditComponent implements OnInit {
  readonly id = input.required({ transform: numberAttribute });
  readonly editForm = new FormGroup({
    name: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    formalName: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    region: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    subregion: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    continent: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    population: new FormControl<number | null>(null!),
    states: new FormArray([
      new FormGroup({
        id: new FormControl(),
        name: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
        code: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
        salesTerritory: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
        population: new FormControl<number | null>(null, { nonNullable: true , validators: [Validators.required] })
      })
    ])
  });
  country$!: Observable<CountryEditReponse>;

  constructor(private masterDataService: MasterDataService, private router: Router) { }

  get states(): FormArray {
    return this.editForm.controls.states;
  }

  ngOnInit(): void {
    this.country$ = this.masterDataService.getCountry(this.id())
      .pipe(
        tap(c => {
          this.editForm.patchValue(c);
          this.patchArray(c.states);
        }
      ));
  }

  addState(): void {
    const state = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
      code: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
      salesTerritory: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
      population: new FormControl<number | null>(null, { nonNullable: true , validators: [Validators.required] })
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

    const request = { ...this.editForm.value, id: this.id() } as CountryEditReponse;
    this.masterDataService.saveCountry(request).subscribe(() => this.router.navigateByUrl('/settings/countries'));
  }

  cancel(): void {
    this.editForm.reset();
    this.router.navigateByUrl('/settings/countries');
  }

  private patchArray(states: StateProvinces[]): void {
    const statesArray = this.states;
    statesArray.clear();

    states.forEach(s => {
      statesArray.push(new FormGroup({
        id: new FormControl(s.id),
        name: new FormControl(s.name, { nonNullable: true , validators: [Validators.required] }),
        code: new FormControl(s.code, { nonNullable: true , validators: [Validators.required] }),
        salesTerritory: new FormControl(s.salesTerritory, { nonNullable: true , validators: [Validators.required] }),
        population: new FormControl<number | undefined>(s.population, { nonNullable: true , validators: [Validators.required] })
      }));
    });
  }
}
