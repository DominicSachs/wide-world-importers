import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <p>home</p>
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
