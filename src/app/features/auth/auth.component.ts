import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { TourService } from '../../core/services/tour.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLogin = true; // Toggle between login and register views
  isLoading = false;
  errorMessage = '';
  returnUrl = '/dashboard';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private tourService: TourService
  ) {
    // Redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    // Initialize login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Initialize register form
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  toggleView(): void {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe({
      next: () => {
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Login failed. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register({
      fullName: this.registerForm.value.fullName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    }).subscribe({
      next: () => {
        // Mark as a new user who should see the tour and onboarding
        localStorage.removeItem('tour_completed');
        localStorage.removeItem('hasCompletedOnboarding');
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loginWithGoogle(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.loginWithGoogle().subscribe({
      next: (user) => {
        // If this is a new user (we can check by looking at createdAt date being close to lastLogin)
        if (user.createdAt && user.lastLogin) {
          const createdDate = new Date(user.createdAt);
          const loginDate = new Date(user.lastLogin);
          // If account was created less than 10 seconds before login, it's a new registration
          if ((loginDate.getTime() - createdDate.getTime()) < 10000) {
            // New user - show onboarding
            localStorage.removeItem('tour_completed');
            localStorage.removeItem('hasCompletedOnboarding');
          }
        }
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Google login failed. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  loginWithApple(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.loginWithApple().subscribe({
      next: (user) => {
        // If this is a new user (we can check by looking at createdAt date being close to lastLogin)
        if (user.createdAt && user.lastLogin) {
          const createdDate = new Date(user.createdAt);
          const loginDate = new Date(user.lastLogin);
          // If account was created less than 10 seconds before login, it's a new registration
          if ((loginDate.getTime() - createdDate.getTime()) < 10000) {
            // New user - show onboarding
            localStorage.removeItem('tour_completed');
            localStorage.removeItem('hasCompletedOnboarding');
          }
        }
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Apple login failed. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
