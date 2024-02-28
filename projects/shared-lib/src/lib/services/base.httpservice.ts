import { Injectable } from '@angular/core';
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
import { AuthService } from 'microtec-auth-lib';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  baseUrl = this.environmentService.baseUrl;

  constructor(
    private http: HttpClient,
    protected storageService: StorageService,
    private logService: LogService,
    private toasterService: ToasterService,
    private authService: AuthService,
    private environmentService: EnvironmentService
  ) {}

  private addHeaders(): Observable<HttpHeaders> {
    return this.authService.getAuthToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json-patch+json',
          Authorization: `Bearer ${token}`,
          'Accept-Language':
            this.storageService.getItem(StorageKeys.LANG_KEY) || 'en',
          // [HeaderParams.TENANT_ID]: this.storageService.getItem(
          //   StorageKeys.TENANT
          // ),
          [HeaderParams.COMPANY_ID]: '2',
          [HeaderParams.BRANCH_ID]: '2',
          [HeaderParams.VERSION]: this.environmentService.Version,
          [HeaderParams.CLIENTID]: this.environmentService.ClientId,
          [HeaderParams.PLATFORMTYPE]: this.environmentService.Platform,
        });
        return of(headers);
      })
    );
  }

  private addFormHeaders(): Observable<HttpHeaders> {
    return this.authService.getAuthToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'Accept-Language':
            this.storageService.getItem(StorageKeys.LANG_KEY) || 'en',
          [HeaderParams.TENANT_ID]: '1',
          [HeaderParams.COMPANY_ID]: '2',
          [HeaderParams.BRANCH_ID]: '2',
          [HeaderParams.VERSION]: this.environmentService.Version,
          [HeaderParams.CLIENTID]: this.environmentService.ClientId,
          [HeaderParams.PLATFORMTYPE]: this.environmentService.Platform,
        });
        return of(headers);
      })
    );
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
  postForm<T>(url: string, data: any) {
    return this.addFormHeaders().pipe(
      switchMap((headers) =>
        this.http.post<T>(`${this.baseUrl}/${url}`, data, { headers })
      ),
      catchError((response: HttpErrorResponse) =>
        this.errorHandler(url, response, null)
      )
    );
    //return this.http.post<T>(`${this.baseUrl}/${url}`, data);
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
  ): Observable<any> {
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
    this.logService.log(apiResponse!.error, 'Invalid Api Error');
    this.toasterService.showError(
      'Internal Server Error',
      'Internal Server Error'
    );
    return throwError(apiResponse);
    // return of(apiResponse);
  }
}
