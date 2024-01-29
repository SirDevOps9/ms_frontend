import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { APIResponse } from '../models/apiResponse';
import { AuthService } from '../services/auth.httpservice';
import { AuthenticationResponse } from '../models/authenticationResponse';

@Injectable()
export class ERPInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = request.clone();
    return next.handle(clonedRequest).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['login']);
          } else {
            return throwError(() => error);
          }
        }
        return throwError(() => error);
      })
    );
  }

  private handleUnAuthorizedError(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ) {
    this.router.navigate(['login']);
    let tokenModel = this.authService.getUserTokenModel();
    return this.authService.refreshToken(tokenModel).pipe(
      switchMap((data: APIResponse<AuthenticationResponse>) => {
       // this.authService.saveUserData(data.response);
        request = request.clone();
        return next.handle(request);
      }),
      catchError((err) => {
        //console.log(err);
        return throwError(() => {
          this.router.navigate(['login']);
        });
      })
    );
  }
}
