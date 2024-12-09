import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { RouterService } from 'shared-lib';
import { AuthService } from '../services';
import { TokenModel } from '../types';

@Injectable()
export class ERPInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthService, private routerService: RouterService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
           // console.log('401 Unauthorized Error - Attempting to refresh token');
            return this.handleUnAuthorizedError(request, next);
          } else if (error.status === 403) {
            //console.log('403 Forbidden Error - Navigating to un-authorized page');
            this.routerService.navigateTo('un-authorized');
          }
        }
        return throwError(() => error);
      })
    );
  }

  handleUnAuthorizedError(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.authService.refreshToken().pipe(
        switchMap((data: TokenModel) => {
          this.authService.saveLoginData(data);

          request = request.clone({
            setHeaders: { Authorization: `Bearer ${data.token}` },
          });
          return next.handle(request);
        }),
        catchError((err) => {
          if (err.status == 401) {
            this.authService.clearAllStorage();
            this.routerService.navigateTo('login');
          }
          return throwError(() => err);
        })
      );
    }
    return next.handle(request);
  }
}
