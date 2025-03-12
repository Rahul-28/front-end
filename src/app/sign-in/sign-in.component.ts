import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../shared/services/auth/auth.service';
import { LoggedIn, UserRole } from '../shared/models/User.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  register$!: Subscription;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['ADMIN', [Validators.required]],
    });
  }

  onSignIn(signInForm: FormGroup): void {
    this.register$ = this.authService.register(signInForm.value).subscribe({
      next: (response: LoggedIn) => {
        // set loggedIn user
        const tempUser = response.loggedAccount;
        this.authService.account.next(tempUser);
        sessionStorage.setItem('loggedUser', tempUser.email);

        //set token
        sessionStorage.setItem('token', response.accessToken);

        //navigation
        if (tempUser.role === UserRole.ADMIN) {
          this.router.navigate(['dashboard/admin-dash']);
        } else if (tempUser.role === UserRole.ORGANIZER) {
          this.router.navigate(['dashboard/organizer-dash']);
        } else {
          this.router.navigate(['dashboard/user-dash']);
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.info('registration successfull');
      },
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
