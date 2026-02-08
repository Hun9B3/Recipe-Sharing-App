import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponse {
    token: string;
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private tokenKey = 'auth_token';
    private platformId = inject(PLATFORM_ID);
    private isBrowser: boolean;

    currentUser = signal<AuthResponse | null>(null);
    isAuthenticated = signal<boolean>(false);

    constructor(private http: HttpClient, private router: Router) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.loadUserFromStorage();
    }

    private loadUserFromStorage() {
        if (!this.isBrowser) return;

        const token = localStorage.getItem(this.tokenKey);
        const userStr = localStorage.getItem('current_user');

        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                this.currentUser.set(user);
                this.isAuthenticated.set(true);
            } catch (e) {
                this.logout();
            }
        }
    }

    register(request: RegisterRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request)
            .pipe(
                tap(response => this.handleAuthSuccess(response))
            );
    }

    login(request: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request)
            .pipe(
                tap(response => this.handleAuthSuccess(response))
            );
    }

    loginWithGoogle() {
        if (!this.isBrowser) return;
        // Redirect to Spring Security OAuth2 endpoint
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    }

    loginWithFacebook() {
        if (!this.isBrowser) return;
        // Redirect to Spring Security OAuth2 endpoint
        window.location.href = 'http://localhost:8080/oauth2/authorization/facebook';
    }

    private handleAuthSuccess(response: AuthResponse) {
        if (!this.isBrowser) return;

        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem('current_user', JSON.stringify(response));
        this.currentUser.set(response);
        this.isAuthenticated.set(true);
    }

    logout() {
        if (this.isBrowser) {
            localStorage.removeItem(this.tokenKey);
            localStorage.removeItem('current_user');
        }
        this.currentUser.set(null);
        this.isAuthenticated.set(false);
        this.router.navigate(['/']);
    }

    getToken(): string | null {
        if (!this.isBrowser) return null;
        return localStorage.getItem(this.tokenKey);
    }

    verifyEmail(token: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/verify-email?token=${token}`);
    }

    resendVerification(email: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/resend-verification`, { email });
    }
}
