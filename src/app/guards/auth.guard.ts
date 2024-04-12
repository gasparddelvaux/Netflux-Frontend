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
      return this.authService.verifyToken()
      .then(response => {
        if (response.data.type == 'success') {
          return true;
        } else {
          localStorage.removeItem('token');
          this.toastr.error('Votre session a expiré, veuillez vous reconnecter.', 'Oups !');
          return false;
        }
      })
      .catch(error => {
        console.log(error);
        this.toastr.error('Une erreur est survenue, veuillez réessayer.', 'Oups !');
        return false;
      });
    }
  }
}
