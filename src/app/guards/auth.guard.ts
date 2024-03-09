import { Injectable } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
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
    }else{
      if(this.authService.verifyToken()){

        return true;
      }else{
        this.toastr.error('Vous devez être connecté pour accéder à cette page.', 'Oups !');
        return this.router.createUrlTree(['/login']);
      }
    }
  }
}
