import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class adminGuard {
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.getInfo().then((response) => {
      if (
        response.data.user.role === 'admin' ||
        response.data.user.role === 'superadmin'
      ) {
        return true;
      } else {
        this.toastr.error(
          'Vous devez être administrateur pour accéder à cette page.',
          'Oups !'
        );
        return this.router.createUrlTree(['/']);
      }
    });
  }
}
