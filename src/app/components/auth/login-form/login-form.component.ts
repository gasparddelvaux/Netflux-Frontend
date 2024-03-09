import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  constructor( private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  login() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    if(email && password) {
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if(response.type == 'success') {
            localStorage.setItem('token', response.access_token);
            this.toastr.success('Connexion réussie.', 'Magnifique !');
            return this.router.navigate(['/']);
          }else{
            this.toastr.error('Adresse e-mail ou mot de passe incorrect.', 'Oups !');
            return false;
          }
        },
        error: (error) => {
          this.toastr.error('Adresse e-mail ou mot de passe incorrect.', 'Oups !');
          console.log(error);
        }
      });
    }
  }
}
