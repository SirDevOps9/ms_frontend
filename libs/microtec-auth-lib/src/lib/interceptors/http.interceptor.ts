import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subject, catchError, switchMap, throwError, finalize } from 'rxjs';
import { RouterService } from 'shared-lib';
import { AuthService } from '../services';
import { TokenModel } from '../types';

@Injectable()
export class ERPInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: Subject<TokenModel> | null = null;

  constructor(private authService: AuthService, private routerService: RouterService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        console.log('sss');

        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            return this.handleUnAuthorizedError(request, next);
          } else if (error.status === 403) {
            this.routerService.navigateTo('un-authorized');
          }
        }
        console.log('Int Error', error);

        return throwError(() => error);
      })
    );
  }

  private handleUnAuthorizedError(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject = new Subject<TokenModel>();

      return this.authService.refreshToken().pipe(
        switchMap((data: TokenModel) => {
          this.authService.saveLoginData(data);
          this.refreshTokenSubject!.next(data); // Notify waiting requests
          this.refreshTokenSubject!.complete(); // Complete the subject

          // Clone the request with the new token
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${data.token}` },
          });
          return next.handle(request).pipe(
            catchError((err) => {
              console.log('UnAuth');

              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.authService.clearAllStorage();
                  this.routerService.navigateTo('login');
                }
              }
              return throwError(() => err);
            })
          );
        }),
        catchError((err: HttpErrorResponse) => {
          // Handle refresh token failure
          console.log('error',err);
          this.authService.clearAllStorage();
          this.routerService.navigateTo('login');
          // Notify waiting requests that the refresh failed
          this.refreshTokenSubject!.error(err);
          return throwError(() => err);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    }

    // If a refresh is already in progress, wait for it to complete
    return this.refreshTokenSubject!.pipe(
      switchMap((token: TokenModel) => {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token.token}` },
        });
        return next.handle(request).pipe(
          catchError((err) => {
            console.log('subject error',err);
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this.authService.clearAllStorage();
                this.routerService.navigateTo('login');
              }
            }
            return throwError(() => err);
          })
        );
      })
    );
  }
}
