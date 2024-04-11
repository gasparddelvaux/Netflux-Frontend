import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { WelcomeComponent } from './components/misc/welcome/welcome.component';
import { MovieFormComponent } from './components/movies/movie-form/movie-form.component';
import { MovieListComponent } from './components/movies/movie-list/movie-list.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { AuthService } from './services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './services/user/user.service';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    WelcomeComponent,
    MovieFormComponent,
    MovieListComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private toastr: ToastrService, private userService: UserService) {
    router.events.subscribe((val) => {
      this.checkLogin();
      this.dropdownShown = false;
    });
  }

  title = 'Netflux';

  isLogged = false;
  dropdownShown = false;

  userInfo: User = {
    id: 0,
    name: '',
    role: '',
    email: '',
    password: '',
    banned: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
  };

  ngOnInit() {
    this.checkLogin();
    this.getUserInfo();
  }

  checkLogin() {
    if (localStorage.getItem('token')) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  getUserInfo() {
    this.userService.getInfo().then((response) => {
      this.userInfo = response.data.user;
    });
  }

  showDropdown() {
    this.dropdownShown = !this.dropdownShown;
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.success('Déconnexion', 'Vous avez été déconnecté.');
    this.router.navigate(['/login']);
  }
}
