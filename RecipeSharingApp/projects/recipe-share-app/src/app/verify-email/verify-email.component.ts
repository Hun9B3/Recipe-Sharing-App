import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-verify-email',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="min-h-screen bg-linear-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl p-8">
        <!-- Success State -->
        @if (isSuccess()) {
          <div class="text-center">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-3">Email Verified!</h2>
            <p class="text-gray-600 mb-6">Your email has been successfully verified. You can now login to your account.</p>
            <button
              (click)="goToLogin()"
              class="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Go to Login
            </button>
          </div>
        }

        <!-- Loading State -->
        @else if (isLoading()) {
          <div class="text-center">
            <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg class="w-10 h-10 text-orange-500 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-3">Verifying...</h2>
            <p class="text-gray-600">Please wait while we verify your email address.</p>
          </div>
        }

        <!-- Error State -->
        @else if (errorMessage()) {
          <div class="text-center">
            <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800 mb-3">Verification Failed</h2>
            <p class="text-gray-600 mb-6">{{ errorMessage() }}</p>
            <div class="space-y-3">
              <button
                (click)="goToLogin()"
                class="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Go to Login
              </button>
              <button
                (click)="goHome()"
                class="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class VerifyEmailComponent implements OnInit {
    isLoading = signal(true);
    isSuccess = signal(false);
    errorMessage = signal('');

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        // Get token from query params
        this.route.queryParams.subscribe(params => {
            const token = params['token'];
            if (token) {
                this.verifyEmail(token);
            } else {
                this.isLoading.set(false);
                this.errorMessage.set('No verification token provided');
            }
        });
    }

    verifyEmail(token: string) {
        this.authService.verifyEmail(token).subscribe({
            next: () => {
                this.isLoading.set(false);
                this.isSuccess.set(true);
            },
            error: (error) => {
                this.isLoading.set(false);
                this.errorMessage.set(error.error?.error || 'Verification failed. The link may be expired or invalid.');
            }
        });
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }

    goHome() {
        this.router.navigate(['/']);
    }
}
