import { Injectable } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('Vous devez être connecté pour accéder à cette page.', 'Oups !');
      return this.router.createUrlTree(['/login']);
    } else {
      return this.authService.verifyToken().pipe(
        switchMap(isValid => {
          if (isValid) {
            return of(true);
          } else {
            localStorage.removeItem('token');
            this.toastr.error('Votre session a expiré, veuillez vous reconnecter.', 'Oups !');
            return of(false);
          }
        })
      );
    }
  }
}
