import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'front-end';
  authenticated$!: Observable<boolean>;
  loggedUserEmail: string | null = null;

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authenticated$ = this.authService.isAuthenticated$;
    this.loggedUserEmail = sessionStorage.getItem('loggedUser');
  }
}
