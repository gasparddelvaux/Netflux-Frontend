import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { confirmPasswordValidator } from '../../../validators/confirm-password.validator';
import { ToastrService } from 'ngx-toastr';
import { AuthHeaderComponent } from '../auth-header/auth-header.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, RouterLinkActive, AuthHeaderComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
    }, {
      validators: confirmPasswordValidator
    });

  register() {
    let name = this.registerForm.value.name;
    let email = this.registerForm.value.email;
    let password = this.registerForm.value.password;
    let password_confirmation = this.registerForm.value.password_confirmation;
    if(name && email && password && password_confirmation) {
      this.authService.register(name, email, password, password_confirmation).subscribe({
        next: (response) => {
          if(response.type == 'success') {
            this.toastr.success('Enregistrement réussi ! Vous pouvez maintenant vous connecter.', 'Magnifique !');
            return this.router.navigate(['/login']);
          }else{
            this.toastr.error('Une erreur est survenue lors de la création de votre compte.', 'Oups !');
            return false;
          }
        },
        error: (error) => {
          this.toastr.error('Une erreur est survenue lors de la création de votre compte.', 'Oups !');
          console.log(error);
        }
      });
    }
  }
}
