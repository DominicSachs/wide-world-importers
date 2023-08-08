import { Component, Input, OnInit, numberAttribute } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityEditResponse } from '@app/modules/master-data/master-data.model';
import { MasterDataService } from '@app/modules/master-data/master-data.service';
import { KeyValueItem } from '@app/shared/models/key-value-item.model';
import { Observable, Subject, of, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss']
})
export class CityEditComponent implements OnInit {
  private statesReloadSubject$ = new Subject<void>;
  readonly countries$: Observable<KeyValueItem<number, string>[]>;
  states$!: Observable<KeyValueItem<number, string>[]>;
  city$!: Observable<CityEditResponse>;
  editForm: FormGroup;

  @Input({ transform: numberAttribute })
  id = 0;

  constructor(fb: UntypedFormBuilder, private masterDataService: MasterDataService, private router: Router) {
    this.countries$ = this.masterDataService.getCountryNames();

    this.editForm = fb.group({
      name: ['', Validators.required],
      population: [''],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required]
    });

    this.editForm.controls['countryId']!.valueChanges.subscribe(() => this.statesReloadSubject$.next());
  }

  ngOnInit(): void {
    this.states$ = this.statesReloadSubject$
      .pipe(
        startWith(this.editForm.get('countryId')!.value),
        switchMap(() => this.masterDataService.getStateNamesForCountry(this.editForm.get('countryId')!.value))
      );

    if (this.id === 0) {
      this.city$ = of({} as CityEditResponse);
    } else {
      this.city$ = this.masterDataService.getCity(this.id).pipe(tap(c => this.editForm.patchValue(c)));
    }
  }

  save(): void {
    if (this.editForm.invalid) {
      return;
    }

    const request = { ...this.editForm.value, id: this.id };
    this.masterDataService.saveCity(request).subscribe(() => this.router.navigateByUrl('/settings/cities'));
  }

  cancel(): void {
    this.editForm.reset();
    this.router.navigateByUrl('/settings/cities');
  }
}
