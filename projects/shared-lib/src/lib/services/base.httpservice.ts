import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { StorageService } from './localstorage.service';
import { APIValidationError } from '../models/apiValidationError';
import { APIResponse } from '../models/apiResponse';
import { LogService } from './log.service';
import { StorageKeys } from '../constants/storagekeys';
import { HeaderParams } from '../constants/headerparams';
import { ToasterService } from './toaster.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  baseUrl = this.environment.baseUrl;

  constructor(
    private http: HttpClient,
    protected storageService: StorageService,
    private cookieService: CookieService,
    private logService: LogService,
    private toasterService: ToasterService,
    private oidcSecurityService: OidcSecurityService,
    @Inject('env') private environment: any
  ) {}

  private addHeaders(): Observable<HttpHeaders> {
    return this.oidcSecurityService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json-patch+json',
          Authorization: `Bearer ${token}`,
          'Accept-Language':
            this.storageService.getItem(StorageKeys.LANG_KEY) || 'en',
          [HeaderParams.TENANT_ID]: '1',
          [HeaderParams.COMPANY_ID]: '2',
          [HeaderParams.BRANCH_ID]: '2',
        });
        return of(headers);
      })
    );
    // return new HttpHeaders({
    //   'Content-Type': 'application/json-patch+json',
    //   Authorization: `Bearer ${this.cookieService.get(
    //     StorageKeys.USER_TOKEN
    //   )}`,
    //   'Accept-Language':
    //     this.storageService.getItem(StorageKeys.LANG_KEY) || 'en',
    //   [HeaderParams.TENANT_ID]: '1',
    //   [HeaderParams.COMPANY_ID]: '2',
    //   [HeaderParams.BRANCH_ID]: '2',
    // });
  }

  get<T>(url: string) {
    return this.addHeaders().pipe(
      switchMap((headers) =>
        this.http.get<T>(`${this.baseUrl}/${url}`, { headers })
      ),
      catchError((response: HttpErrorResponse) =>
        this.errorHandler(url, response, null)
      )
    );
  }

  post<T>(url: string, data: any) {
    return this.addHeaders().pipe(
      switchMap((headers) =>
        this.http.post<T>(`${this.baseUrl}/${url}`, data, { headers })
      ),
      catchError((response: HttpErrorResponse) =>
        this.errorHandler(url, response, null)
      )
    );
  }

  put<T>(url: string, data: any) {
    return this.addHeaders().pipe(
      switchMap((headers) =>
        this.http.put<T>(`${this.baseUrl}/${url}`, data, { headers })
      ),
      catchError((response: HttpErrorResponse) =>
        this.errorHandler(url, response, null)
      )
    );
  }

  delete<T>(url: string) {
    return this.addHeaders().pipe(
      switchMap((headers) =>
        this.http.delete<T>(`${this.baseUrl}/${url}`, { headers })
      ),
      catchError((response: HttpErrorResponse) =>
        this.errorHandler(url, response, null)
      )
    );
  }

  errorHandler(
    callUrl: string,
    response: HttpErrorResponse,
    input: any
  ): Observable<APIResponse<any>> {
    let res: any;

    res = response.error;

    this.logService.log(
      { callUrl, input, response },
      'Calling Api Error: ' + callUrl
    );

    let message = '';

    switch (response.status) {
      case 400:
        message = 'Bad Request.';
        break;

      case 401:
      case 404:
        message = 'The resource no longer exists.';
        break;
      case 504:
      default:
        message = 'An un handeled error occured while getting data';
        break;
    }

    const apiResponse: APIResponse<any> = {
      language: 'en',
      response: null,
      error: (res.error as APIValidationError) || {
        message: response.message,
        statusCode: response.status,
        errors: [],
      },
    };
    this.toasterService.showError('Invalid data', apiResponse!.error!.message);
    return throwError(apiResponse);
    // return of(apiResponse);
  }
}
