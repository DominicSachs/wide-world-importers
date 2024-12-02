import { AsyncPipe } from '@angular/common';
import { Component, OnInit, input, numberAttribute } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatError, MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { CityFormGroup } from '@app/modules/master-data/city/edit/city-form.model';
import { CityEditResponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { KeyValueItem } from '@app/shared/models/key-value-item.model';
import { Observable, Subject, of, startWith, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-city-edit',
    templateUrl: './city-edit.component.html',
    styleUrls: ['./city-edit.component.scss'],
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
    providers: [MasterDataService]
})
export class CityEditComponent implements OnInit {
  private statesReloadSubject$ = new Subject<void>;
  readonly countries$: Observable<KeyValueItem<number, string>[]>;
  states$!: Observable<KeyValueItem<number, string>[]>;
  city$!: Observable<CityEditResponse>;
  editForm: CityFormGroup;
  readonly id = input.required({ transform: numberAttribute });

  constructor(fb: FormBuilder, private masterDataService: MasterDataService, private router: Router) {
    this.countries$ = this.masterDataService.getCountryNames();

    this.editForm = fb.group({
      name: fb.nonNullable.control('', Validators.required),
      population: fb.control<number | null>(null),
      countryId: fb.nonNullable.control(0, [Validators.required, Validators.min(1)]),
      stateId: fb.nonNullable.control(0, [Validators.required, Validators.min(1)])
    });

    this.editForm.controls['countryId']!.valueChanges.subscribe(() => this.statesReloadSubject$.next());
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
