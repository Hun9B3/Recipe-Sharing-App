import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginRequest, RegisterRequest } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-linear-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <!-- Login Card -->
      <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span class="font-bold text-xl text-gray-800">Recipe Share</span>
          </div>
          <button
            (click)="goBack()"
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="p-8">
          <!-- Heading -->
          <h2 class="text-center text-2xl font-bold text-gray-800 mb-8">
            {{ showRegister() ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập' }}
          </h2>

          <!-- Success Message -->
          @if (successMessage()) {
            <div class="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {{ successMessage() }}
              @if (registeredEmail()) {
                <div class="mt-2">
                  <button
                    type="button"
                    (click)="resendEmail()"
                    class="text-green-800 underline hover:text-green-900 font-medium"
                  >
                    Gửi lại email xác nhận
                  </button>
                </div>
              }
            </div>
          }

          <!-- Error Message -->
          @if (errorMessage()) {
            <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {{ errorMessage() }}
              @if (needsVerification()) {
                <div class="mt-2">
                  <button
                    type="button"
                    (click)="resendEmail()"
                    class="text-red-800 underline hover:text-red-900 font-medium"
                  >
                    Gửi lại email xác nhận
                  </button>
                </div>
              }
            </div>
          }

          <!-- Email/Password Form -->
          @if (showEmailForm()) {
            <form (ngSubmit)="showRegister() ? handleRegister() : handleLogin()">
              @if (showRegister()) {
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tên người dùng</label>
                  <input
                    type="text"
                    [(ngModel)]="username"
                    name="username"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="your_username"
                  />
                </div>
              }

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  [(ngModel)]="email"
                  name="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="your@email.com"
                />
              </div>

              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                <input
                  type="password"
                  [(ngModel)]="password"
                  name="password"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="••••••••"
                />
              </div>

              @if (showRegister()) {
                <div class="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tên</label>
                    <input
                      type="text"
                      [(ngModel)]="firstName"
                      name="firstName"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Nguyễn"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Họ</label>
                    <input
                      type="text"
                      [(ngModel)]="lastName"
                      name="lastName"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Văn A"
                    />
                  </div>
                </div>
              }

              <button
                type="submit"
                [disabled]="isLoading()"
                class="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
              >
                {{ isLoading() ? 'Đang xử lý...' : (showRegister() ? 'Đăng Ký' : 'Đăng Nhập') }}
              </button>

              <button
                type="button"
                (click)="toggleRegister()"
                class="w-full text-sm text-gray-600 hover:text-orange-500 transition-colors"
              >
                {{ showRegister() ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký' }}
              </button>

              <div class="flex items-center gap-3 my-6">
                <div class="flex-1 h-px bg-gray-200"></div>
                <span class="text-gray-500 text-sm">hoặc</span>
                <div class="flex-1 h-px bg-gray-200"></div>
              </div>

              <button
                type="button"
                (click)="backToOptions()"
                class="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Quay lại
              </button>
            </form>
          } @else {
            <!-- OAuth Buttons -->
            <button
              (click)="loginWithGoogle()"
              class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors mb-3"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.91 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              Tiếp tục với Google
            </button>

            <!-- Divider -->
            <div class="flex items-center gap-3 my-6">
              <div class="flex-1 h-px bg-gray-200"></div>
              <span class="text-gray-500 text-sm">hoặc</span>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>

            <!-- Facebook Button -->
            <button
              (click)="loginWithFacebook()"
              class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors mb-3"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Tiếp tục với Facebook
            </button>

            <!-- Email Button -->
            <button
              (click)="showEmailLogin()"
              class="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Tiếp tục với Email
            </button>
          }
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-200 px-8 py-4 text-center text-xs text-gray-600">
          Bằng cách sử dụng Recipe Share, bạn đồng ý với 
          <a href="#" class="text-gray-800 underline hover:text-orange-500">Điều khoản dịch vụ</a> & 
          <a href="#" class="text-gray-800 underline hover:text-orange-500">Chính sách bảo mật</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  showEmailForm = signal(false);
  showRegister = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  needsVerification = signal(false);
  registeredEmail = signal('');

  // Form fields
  email = '';
  password = '';
  username = '';
  firstName = '';
  lastName = '';

  constructor(private authService: AuthService, private router: Router) { }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginWithFacebook() {
    this.authService.loginWithFacebook();
  }

  showEmailLogin() {
    this.showEmailForm.set(true);
    this.showRegister.set(false);
    this.errorMessage.set('');
  }

  backToOptions() {
    this.showEmailForm.set(false);
    this.showRegister.set(false);
    this.errorMessage.set('');
    this.clearForm();
  }

  toggleRegister() {
    this.showRegister.update(v => !v);
    this.errorMessage.set('');
    this.clearForm();
  }

  handleLogin() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.needsVerification.set(false);

    const request: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(request).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading.set(false);
        const errorMsg = error.error?.message || 'Email hoặc mật khẩu không đúng';

        if (errorMsg.includes('verify')) {
          this.errorMessage.set('Vui lòng xác minh email của bạn trước khi đăng nhập');
          this.needsVerification.set(true);
          this.registeredEmail.set(this.email);
        } else {
          this.errorMessage.set(errorMsg);
        }
      }
    });
  }

  handleRegister() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const request: RegisterRequest = {
      username: this.username,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    };

    this.authService.register(request).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.');
        this.registeredEmail.set(this.email);
        this.showRegister.set(false);
        this.clearForm();
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set('Đăng ký thất bại. Email hoặc tên người dùng đã được sử dụng.');
      }
    });
  }

  clearForm() {
    this.email = '';
    this.password = '';
    this.username = '';
    this.firstName = '';
    this.lastName = '';
  }

  resendEmail() {
    const emailToUse = this.registeredEmail() || this.email;
    if (!emailToUse) return;

    this.isLoading.set(true);
    this.authService.resendVerification(emailToUse).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Email xác nhận đã được gửi lại!');
        this.errorMessage.set('');
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Không thể gửi lại email. Vui lòng thử lại sau.');
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
