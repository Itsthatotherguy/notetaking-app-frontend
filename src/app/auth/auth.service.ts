import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SignupRequest } from './dto/signup.request';
import { Observable, throwError } from 'rxjs';
import { AuthResponse } from './dto/auth.response';
import { catchError } from 'rxjs/operators';
import { LoginRequest } from './dto/login.request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signup(signupRequest: SignupRequest): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>('auth/signup', signupRequest)
      .pipe(catchError(this.handleErrorMessages.bind(this)));
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>('auth/login', loginRequest)
      .pipe(catchError(this.handleErrorMessages.bind(this)));
  }

  private handleErrorMessages(
    errorResponse: HttpErrorResponse
  ): Observable<never> {
    console.log('Hit handle errors');
    let errorMessages: string[] = [
      'An unknown error has occurred. Please try again in a while.',
    ];

    if (!errorResponse.error || !errorResponse.error.message) {
      return throwError(errorMessages);
    }

    if (Array.isArray(errorResponse.error.message)) {
      const messages = errorResponse.error.message;

      errorMessages = messages.map((errorResponseMessage) =>
        this.determineErrorMessage(errorResponseMessage)
      );
    } else {
      const message = errorResponse.error.message;

      errorMessages = [this.determineErrorMessage(message)];
    }

    return throwError(errorMessages);
  }

  private determineErrorMessage(errorResponseMessage: string): string {
    enum AuthErrors {
      DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
      INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
      UNAUTHORIZED = 'UNAUTHORIZED',
      INVALID_EMAIL = 'INVALID_EMAIL',
      EMPTY_PASSWORD = 'EMPTY_PASSWORD',
      EMPTY_NAME = 'EMPTY_NAME',
    }

    switch (errorResponseMessage) {
      case AuthErrors.DUPLICATE_EMAIL:
        return 'This email address already exists';
      case AuthErrors.INVALID_EMAIL:
        return 'Please provide a valid email';
      case AuthErrors.EMPTY_NAME:
        return 'Please provide a name';
      case AuthErrors.EMPTY_PASSWORD:
        return 'Please provide a password';
      case AuthErrors.INVALID_CREDENTIALS:
        return 'Invalid credentials';
      default:
        return 'An unexpected error has occurred';
    }
  }
}
