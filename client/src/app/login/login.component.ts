import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatHint } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { EMAIL_VALIDATION } from '@app/shared/validation/validators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, tap } from 'rxjs';

@UntilDestroy()
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [MatButton, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatError, MatFormField, MatHint, MatIcon, MatInput, ReactiveFormsModule]
})
export class LoginComponent {
  @Input()
  redirectUrl = '';

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: EMAIL_VALIDATION })
  });

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  login(): void {
    this.authService.login(this.loginForm.value.email!);

    this.authService.authStatus$
      .pipe(
        untilDestroyed(this),
        filter(authStatus => authStatus.isAuthenticated),
        tap(_ => this.router.navigate([this.redirectUrl || '/orders']))
      )
      .subscribe();
  }
}
