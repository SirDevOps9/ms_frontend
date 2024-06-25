import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { StorageService } from './localstorage.service';
import { LogService } from './log.service';
import { StorageKeys } from '../constants/storagekeys';
import { HeaderParams } from '../constants/headerparams';
import { ToasterService } from './toaster.service';
import { AuthService } from 'microtec-auth-lib';
import { EnvironmentService } from './environment.service';
import { DefaultExceptionModel } from '../models';
import { UploadFileResult } from '../models/uploadFileResult';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
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
          'Accept-Language': this.storageService.getItem(StorageKeys.LANG_KEY) || 'en',
          [HeaderParams.COMPANY_ID]: '2',
          [HeaderParams.BRANCH_ID]: '2',
          [HeaderParams.VERSION]: this.environmentService.Version,
          [HeaderParams.CLIENTID]: this.environmentService.ClientId,
          [HeaderParams.PLATFORMTYPE]: this.environmentService.Platform,
          [HeaderParams.APIKEY]: this.environmentService.ApiKey,
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
          'Accept-Language': this.storageService.getItem(StorageKeys.LANG_KEY) || 'en',
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

  get<T>(url: string, showError: boolean = true): Observable<T> {
    return this.addHeaders().pipe(
      switchMap((headers) => this.http.get<T>(`${this.baseUrl}/${url}`, { headers })),
      catchError((response: HttpErrorResponse) => this.errorHandler(url, response, null, showError))
    );
  }

  getString(url: string, showError: boolean = true): Observable<any> {
    return this.addHeaders().pipe(
      switchMap((headers) =>
        this.http.get(`${this.baseUrl}/${url}`, {
          headers,
          responseType: 'text',
        })
      ),
      catchError((response: HttpErrorResponse) => this.errorHandler(url, response, null, showError))
    );
  }

  getFullUrl<T>(url: string, showError: boolean = true) {
    return this.addHeaders().pipe(
      switchMap((headers) => this.http.get<T>(`${url}`, { headers })),
      catchError((response: HttpErrorResponse) => this.errorHandler(url, response, null, showError))
    );
  }

  getFullUrlString(url: string, showError: boolean = true) {
    return this.addHeaders().pipe(
      switchMap((headers) => this.http.get(`${url}`, { headers, responseType: 'text' })),
      catchError((response: HttpErrorResponse) => this.errorHandler(url, response, null, showError))
    );
  }
  post<T>(url: string, data: any, showError: boolean = true) {
    return this.addHeaders().pipe(
      switchMap((headers) => this.http.post<T>(`${this.baseUrl}/${url}`, data, { headers })),
      catchError((response: HttpErrorResponse) => this.errorHandler(url, response, data, showError))
    );
  }

  postFullUrl(url: string, data: any, showError: boolean = true) {
    return this.addHeaders().pipe(
      switchMap((headers) => this.http.post(`${url}`, data, { headers, responseType: 'text' })),
      catchError((response: HttpErrorResponse) => this.errorHandler(url, response, data, showError))
    );
  }
  postFullUrlMulti(url: string, data: any, showError: boolean = true) : Observable<UploadFileResult> {
    return this.addHeaders().pipe(
      switchMap((headers) => this.http.post(`${url}`, data, { headers, responseType: 'text' })),
      catchError((response: HttpErrorResponse) => this.errorHandler(url, response, data, showError))
    );
  }
  postForm<T>(url: string, data: any, showError: boolean = true) {
    return this.addFormHeaders().pipe(
      switchMap((headers) => this.http.post<T>(`${this.baseUrl}/${url}`, data, { headers })),
      catchError((response: HttpErrorResponse) => this.errorHandler(url, response, data, showError))
    );
  }

  put<T>(url: string, data: any, showError: boolean = true) {
    return this.addHeaders().pipe(
      switchMap((headers) => this.http.put<T>(`${this.baseUrl}/${url}`, data, { headers })),
      catchError((response: HttpErrorResponse) => this.errorHandler(url, response, data, showError))
    );
  }

  delete<T>(url: string, showError: boolean = true) {
    return this.addHeaders().pipe(
      switchMap((headers) => this.http.delete<T>(`${this.baseUrl}/${url}`, { headers })),
      catchError((response: HttpErrorResponse) => this.errorHandler(url, response, null, showError))
    );
  }
  //TODO : disuccs the error handler call back function
  errorHandler(
    callUrl: string,
    response: HttpErrorResponse,
    input: any,
    showError: boolean = true
  ): Observable<any> {
    let res: any;

    res = response.error;

    this.logService.log({ callUrl, input, response }, 'Calling Api Error: ' + callUrl);

    const exceptionModel: DefaultExceptionModel = response.error;

    switch (response.status) {
      case 400:
        if (showError && exceptionModel.validationErrors) {
          for (let index = 0; index < exceptionModel.validationErrors!.length; index++) {
            this.toasterService.showError(
              exceptionModel.message,
              exceptionModel.validationErrors![index].errorMessages[0]
            );
          }
        }
        break;
      default:
        // if (showError) {
        //   this.toasterService.showError('Operation Fail', exceptionModel.message);
        // }
        break;
    }

    this.logService.log(exceptionModel, 'Invalid Api Error');

    return throwError(exceptionModel);
  }
}
