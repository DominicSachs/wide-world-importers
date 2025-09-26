import { Component, effect, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MAT_CARD_EDIT } from '../import-groups';
import { AuthService } from '@app/auth/auth.service';
import { EMAIL_VALIDATION } from '@app/shared/validation/validators';

@UntilDestroy()
@Component({
  selector: 'app-login',
  imports: [...MAT_CARD_EDIT, MatButton, MatFormField, MatHint, MatInput, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly redirectUrl = input('');
  readonly loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: EMAIL_VALIDATION })
  });

  constructor(private readonly authService: AuthService, private readonly router: Router) {
    effect(() => {
      if (this.authService.authStatus().isAuthenticated) {
        this.router.navigate([this.redirectUrl() || '/orders']);
      }
    });
  }

  login(): void {
    this.authService.login(this.loginForm.value.email!);
  }
}
