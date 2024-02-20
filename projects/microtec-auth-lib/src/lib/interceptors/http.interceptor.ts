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
import { AuthService } from '../services/auth.service';
import { LanguageService } from 'shared-lib';

@Injectable()
export class ERPInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
     const clonedRequest = request.clone();
    // const clonedRequest = request.clone({
    //   headers: request.headers.append(
    //     'ERPAccept-Language',
    //     this.languageService.getLang()
    //   ),
    // });
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
    // return this.authService.refreshToken(tokenModel).pipe(
    //   switchMap((data: any) => {
    //    // this.authService.saveUserData(data.response);
    //     request = request.clone();
    //     return next.handle(request);
    //   }),
    //   catchError((err) => {
    //     //console.log(err);
    //     return throwError(() => {
    //       this.router.navigate(['login']);
    //     });
    //   })
    // );
  }
}
