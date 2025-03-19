import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public onError = false;

  public form: FormGroup<{ email: FormControl<string | null>; firstName: FormControl<string | null>; lastName: FormControl<string | null>;  password: FormControl<string | null>;}>;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
    this.form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(50)
        ]
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ]
    });
  }

  public submit(): void {
    const registerRequest = this.form.value as RegisterRequest;
    this.authService.register(registerRequest).subscribe({
        next: (_: void) => this.router.navigate(['/login']),
        error: _ => this.onError = true,
      }
    );
  }

}
