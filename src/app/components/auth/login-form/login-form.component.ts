import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AuthHeaderComponent } from '../auth-header/auth-header.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    AuthHeaderComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  loading: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  login() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    if (email && password) {
      this.loading = true;
      this.authService
        .login(email, password)
        .then((response) => {
          if (response.data.type == 'success') {
            localStorage.setItem('token', response.data.access_token);
            this.toastr.success('Connexion réussie.', 'Magnifique !');
            this.loading = false;
            return this.router.navigate(['/']);
          } else {
            this.toastr.error(
              'Adresse e-mail ou mot de passe incorrect.',
              'Oups !'
            );
            this.loading = false;
            return false;
          }
        })
        .catch((error) => {
          if (error.error.message) {
            this.toastr.error(error.error.message, 'Oups !');
          } else {
            this.toastr.error('Une erreur est survenue.', 'Oups !');
          }
          console.log(error);
          this.loading = false;
        });
    }
  }
}
