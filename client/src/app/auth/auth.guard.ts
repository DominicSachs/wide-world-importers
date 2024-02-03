import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.validateLogin(route);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.validateLogin(childRoute);
  }

  canLoad(_route: Route, _segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.validateLogin();
  }

  private validateLogin(route?: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.authStatus$.pipe(
      map(authStatus => {
        console.log(authStatus);
        const isLoginAllowed = authStatus.isAuthenticated;

        if (!isLoginAllowed) {
          this.router.navigate(['login'], { queryParams: { redirectUrl: this.getResolvedUrl(route) } });
        }

        return isLoginAllowed;
      }),
      take(1)
    );
  }

  private getResolvedUrl(route?: ActivatedRouteSnapshot): string {
    if (!route) {
      return '';
    }

    return route.pathFromRoot.map(r => r.url.map(segment => segment.toString()).join('/')).join('/').replace('//', '/');
  }
}
