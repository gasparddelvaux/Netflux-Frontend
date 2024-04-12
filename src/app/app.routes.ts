import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/misc/welcome/welcome.component';
import { MovieFormComponent } from './components/movies/movie-form/movie-form.component';
import { MovieListComponent } from './components/movies/movie-list/movie-list.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { AuthGuard } from './guards/auth.guard';
import { DirectorListComponent } from './components/directors/director-list/director-list.component';
import { AdminMovieListComponent } from './components/admin/admin-movie-list/admin-movie-list.component';
import { AdminDirectorListComponent } from './components/admin/admin-director-list/admin-director-list.component';
import { AdminUserListComponent } from './components/admin/admin-user-list/admin-user-list.component';
import { adminGuard } from './guards/admin.guard';
import { SeederComponent } from './components/misc/seeder/seeder.component';

export const routes: Routes = [
  // Auth
  { path: 'login', component: LoginFormComponent},
  { path: 'register', component: RegisterFormComponent},
  // Pages
  { path: '', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: 'movies', component: MovieListComponent, canActivate: [AuthGuard]},
  { path: 'directors', component: DirectorListComponent, canActivate: [AuthGuard]},
  { path: 'seeder', component: SeederComponent, canActivate: [AuthGuard]},
  // Admin
  { path: 'admin/movies', component: AdminMovieListComponent, canActivate: [AuthGuard, adminGuard]},
  { path: 'admin/movies/:id', component: AdminMovieListComponent, canActivate: [AuthGuard, adminGuard]},
  { path: 'admin/directors', component: AdminDirectorListComponent, canActivate: [AuthGuard, adminGuard]},
  { path: 'admin/users', component: AdminUserListComponent, canActivate: [AuthGuard, adminGuard]},
];
