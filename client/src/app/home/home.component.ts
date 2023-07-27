import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <p>home</p>
    <!-- <div *ngIf="(authService.authStatus$ | async)?.isAuthenticated; else doLogin">
      <div class="mat-display-4">This is LemonMart! The place where</div>
      <div class="mat-display-4">You get a lemon, you get a lemon, you get a lemon...</div>
      <div class="mat-display-4">Everybody gets a lemon.</div>
    </div> -->
    <button (click)="login()">Login</button>
  `,
  styles: [
    `
      app-login {
        width: 100% !important;
      }
    `
  ]
})
export class HomeComponent {
  constructor(private router: Router) {}

  login(): void {
    this.router.navigate(['/', 'customers']);
  }
}
