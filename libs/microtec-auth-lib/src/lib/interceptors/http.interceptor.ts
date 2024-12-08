import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subject, catchError, switchMap, throwError, finalize, BehaviorSubject } from 'rxjs';
import { RouterService } from 'shared-lib';
import { AuthService } from '../services';
import { TokenModel } from '../types';

@Injectable()
export class ERPInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<TokenModel | null> = new BehaviorSubject<TokenModel | null>(null);

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

  // private handleUnAuthorizedError(
  //   request: HttpRequest<unknown>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<unknown>> {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     this.refreshTokenSubject = new Subject<TokenModel>();

  //     return this.authService.refreshToken().pipe(
  //       switchMap((data: TokenModel) => {
  //         this.authService.saveLoginData(data);
  //         this.refreshTokenSubject!.next(data); // Notify waiting requests

  //         request = request.clone({
  //           setHeaders: { Authorization: `Bearer ${data.token}` },
  //         });
  //         return next.handle(request);
  //       }),
  //       catchError((err: HttpErrorResponse) => {
  //         // Handle refresh token failure
  //         console.log('error',err);
  //         this.authService.clearAllStorage();
  //         this.routerService.navigateTo('login');
  //         // Notify waiting requests that the refresh failed
  //         this.refreshTokenSubject!.error(err);
  //         return throwError(() => err);
  //       }),
  //       finalize(() => {
  //         this.isRefreshing = false;
  //       })
  //     );
  //   }

  //   // If a refresh is already in progress, wait for it to complete
  //   return this.refreshTokenSubject!.pipe(
  //     switchMap((token: TokenModel) => {
  //       request = request.clone({
  //         setHeaders: { Authorization: `Bearer ${token.token}` },
  //       });
  //       return next.handle(request).pipe(
  //         catchError((err) => {
  //           console.log('subject error',err);
  //           if (err instanceof HttpErrorResponse) {
  //             if (err.status === 401) {
  //               this.authService.clearAllStorage();
  //               this.routerService.navigateTo('login');
  //             }
  //           }
  //           return throwError(() => err);
  //         })
  //       );
  //     })
  //   );
  // }
  private handleUnAuthorizedError(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject = new BehaviorSubject<TokenModel | null>(null);
  
      return this.authService.refreshToken().pipe(
        switchMap((data: TokenModel) => {
          this.authService.saveLoginData(data);
          this.refreshTokenSubject!.next(data); // Notify waiting requests
  
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${data.token}` },
          });
          return next.handle(request);
        }),
        catchError((err: HttpErrorResponse) => {
          console.error('Refresh Token Error', err);
          this.authService.clearAllStorage();
          this.routerService.navigateTo('login');
          this.refreshTokenSubject!.error(err); // Notify that refresh failed
          return throwError(() => err);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    }
  
    // Wait for refresh to complete
    return this.refreshTokenSubject!.pipe(
      switchMap((token: TokenModel | null) => {
        if (!token) {
          return throwError(() => new Error('Token refresh failed'));
        }
  
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token.token}` },
        });
        return next.handle(request);
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Subject Token Error', err);
        if (err.status === 401) {
          this.authService.clearAllStorage();
          this.routerService.navigateTo('login');
        }
        return throwError(() => err);
      })
    );
  }
  
}
