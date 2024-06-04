import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { HeaderParams, RouterService, StorageKeys, StorageService } from 'shared-lib';
import { AuthService } from '../services';
import { LoginResponse } from 'angular-auth-oidc-client';

@Injectable()
export class ERPInterceptor implements HttpInterceptor {
  constructor(
    private routerService: RouterService,
    private localStorageService: StorageService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = request.clone();
    // var tenantID = this.localStorageService.getItem(StorageKeys.TENANT);
    // const clonedRequest = request.clone({
    //   headers: request.headers.append(HeaderParams.TENANT_ID, tenantID ? tenantID : ''),
    // });
    return next.handle(clonedRequest).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          console.log('Interceptor Error', error);
          if (error.status === 401) {
            return this.handleUnAuthorizedError(clonedRequest, next);
            // this.routerService.navigateTo('un-authorized');
            //this.routerService.navigateTo('login');
          } else if (error.status === 403) {
            this.routerService.navigateTo('un-authorized');
          } else {
            return throwError(() => error);
          }
        }
        return throwError(() => error);
      })
    );
  }

  private handleUnAuthorizedError(request: HttpRequest<unknown>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap((res: LoginResponse) => {
        const updatedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${res.accessToken}`,
          },
        });
        return next.handle(updatedRequest);
      }),
      catchError((err) => {
        // console.log('Int Error', err);
        this.routerService.navigateTo('login');
        return throwError(() => err);
      })
    );
  }
}
