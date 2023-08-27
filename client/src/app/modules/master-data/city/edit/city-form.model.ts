import { FormControl, FormGroup } from '@angular/forms';

export interface CityFormGroup extends FormGroup<{
  name: FormControl<string>;
  population: FormControl<number | null>;
  countryId: FormControl<number>;
  stateId: FormControl<number>;
}> {}
