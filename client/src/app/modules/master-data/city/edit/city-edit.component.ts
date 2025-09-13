import { AsyncPipe } from '@angular/common';
import { Component, OnInit, input, numberAttribute } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatError, MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Observable, Subject, of, startWith, switchMap, tap } from 'rxjs';
import { CityEditResponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { KeyValueItem } from '@app/shared/models/key-value-item.model';

@Component({
  selector: 'app-city-edit',
  imports: [
    AsyncPipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './city-edit.component.html',
  styleUrl: './city-edit.component.scss'
})
export class CityEditComponent implements OnInit {
  private statesReloadSubject$ = new Subject<void>;
  readonly id = input.required({ transform: numberAttribute });
  readonly countries$: Observable<KeyValueItem<number, string>[]>;
  readonly editForm = new FormGroup({
    name: new FormControl('', { nonNullable: true , validators: [Validators.required] }),
    population: new FormControl<number | null>(null!),
    countryId: new FormControl(0, { nonNullable: true , validators: [Validators.required, Validators.min(1)] }),
    stateId: new FormControl(0, { nonNullable: true , validators: [Validators.required, Validators.min(1)] })
  });
  states$!: Observable<KeyValueItem<number, string>[]>;
  city$!: Observable<CityEditResponse>;

  constructor(private masterDataService: MasterDataService, private router: Router) {
    this.countries$ = this.masterDataService.getCountryNames();
    this.editForm.controls.countryId.valueChanges.subscribe(() => this.statesReloadSubject$.next());
  }

  ngOnInit(): void {
    this.states$ = this.statesReloadSubject$
      .pipe(
        startWith(this.editForm.get('countryId')!.value),
        switchMap(() => this.masterDataService.getStateNamesForCountry(this.editForm.get('countryId')!.value))
      );

    const id = this.id();
    if (id === 0) {
      this.city$ = of({} as CityEditResponse);
    } else {
      this.city$ = this.masterDataService.getCity(id).pipe(tap(c => this.editForm.patchValue(c)));
    }
  }

  save(): void {
    if (this.editForm.invalid) {
      return;
    }

    const request = { ...this.editForm.value, id: this.id() } as CityEditResponse;
    this.masterDataService.saveCity(request).subscribe(() => this.router.navigateByUrl('/settings/cities'));
  }

  cancel(): void {
    this.editForm.reset();
    this.router.navigateByUrl('/settings/cities');
  }
}
