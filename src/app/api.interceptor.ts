import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as AuthActions from './auth/store/auth.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const baseUrl = 'http://localhost:3000';

    const apiRequest = request.clone({
      url: baseUrl + '/' + request.url,
    });

    return next.handle(apiRequest).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
        if (errorResponse.status === 401) {
          this.store.dispatch(AuthActions.logout());
        }

        return throwError(errorResponse);
      })
    );
  }
}
