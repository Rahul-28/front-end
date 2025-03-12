import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { LoggedIn, UserRole } from '../shared/models/User.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  login$!: Subscription;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin(loginForm: FormGroup): void {
    this.login$ = this.authService.login(loginForm.value).subscribe({
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
        console.info('login successfull');
      },
    });
  }

  navigateToRegisteration(): void {
    this.router.navigateByUrl('/register');
  }
}
