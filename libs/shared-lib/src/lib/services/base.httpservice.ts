import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from './localstorage.service';
import { LogService } from './log.service';
import { StorageKeys } from '../constants/storagekeys';
import { HeaderParams } from '../constants/headerparams';
import { ToasterService } from './toaster.service';
import { EnvironmentService } from './environment.service';
import { DefaultExceptionModel } from '../models';
import { LanguageService } from 'shared-lib';

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
    private environmentService : EnvironmentService,
    private languageService : LanguageService
  ) {}

  public addHeaders(): HttpHeaders {
    const token = this.storageService.getItem(StorageKeys.USER_TOKEN) || '';
    let defaultCompany =this.storageService.getItem(StorageKeys.DEFAULT_COMPANY)
    let defaultBranch =this.storageService.getItem(StorageKeys.DEFAULT_BRANCHE) 
    return new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
      Authorization: `Bearer ${token}`,
      'Accept-Language': this.storageService.getItem(StorageKeys.LANG_KEY) || 'en',
      [HeaderParams.COMPANY_ID]:  defaultCompany?.id?? '',
      [HeaderParams.BRANCH_ID]: defaultBranch?.id?? '',
      [HeaderParams.VERSION]: this.environmentService.Version,
      [HeaderParams.CLIENTID]: this.environmentService.ClientId,
      [HeaderParams.PLATFORMTYPE]: this.environmentService.Platform,
      [HeaderParams.APIKEY]: this.environmentService.ApiKey,
    });
  }

  private addFormHeaders(): HttpHeaders {
    const token = this.storageService.getItem(StorageKeys.USER_TOKEN) || '';
    let defaultCompany =this.storageService.getItem(StorageKeys.DEFAULT_COMPANY)
    let defaultBranch =this.storageService.getItem(StorageKeys.DEFAULT_BRANCHE) 
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Accept-Language': this.storageService.getItem(StorageKeys.LANG_KEY) || 'en',
      [HeaderParams.TENANT_ID]: '1',
      [HeaderParams.COMPANY_ID]:  defaultCompany?.id?? '',
      [HeaderParams.BRANCH_ID]: defaultBranch?.id?? '',
      [HeaderParams.VERSION]: this.environmentService.Version,
      [HeaderParams.CLIENTID]: this.environmentService.ClientId,
      [HeaderParams.PLATFORMTYPE]: this.environmentService.Platform,
    });
  }

  get<T>(url: string, showError: boolean = true): Observable<T> {
    const headers = this.addHeaders();
    return this.http
      .get<T>(`${this.baseUrl}/${url}`, { headers })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.errorHandler(url, response, null, showError)
        )
      );
  }

  getString(url: string, showError: boolean = true): Observable<any> {
    const headers = this.addHeaders();
    return this.http
      .get(`${this.baseUrl}/${url}`, { headers, responseType: 'text' })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.errorHandler(url, response, null, showError)
        )
      );
  }

  getFullUrl<T>(url: string, showError: boolean = true) {
    const headers = this.addHeaders();
    return this.http
      .get<T>(`${url}`, { headers })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.errorHandler(url, response, null, showError)
        )
      );
  }

  getFullUrlString(url: string, showError: boolean = true) {
    const headers = this.addHeaders();
    return this.http
      .get(`${url}`, { headers, responseType: 'text' })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.errorHandler(url, response, null, showError)
        )
      );
  }

  post<T>(url: string, data: any, showError: boolean = true) {
    const headers = this.addHeaders();
    return this.http
      .post<T>(`${this.baseUrl}/${url}`, data, { headers })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.errorHandler(url, response, data, showError)
        )
      );
  }

  postFullUrl(url: string, data: any, showError: boolean = true) {
    const headers = this.addHeaders();
    return this.http
      .post(`${url}`, data, { headers, responseType: 'text' })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.errorHandler(url, response, data, showError)
        )
      );
  }

  postFullUrlJson(url: string, data: any, showError: boolean = true) {
    const headers = this.addHeaders();
    return this.http
      .post(`${url}`, data, { headers })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.errorHandler(url, response, data, showError)
        )
      );
  }

  postFullUrlMulti(url: string, data: any, showError: boolean = true) {
    const headers = this.addHeaders();
    return this.http
      .post(`${url}`, data, { headers, responseType: 'text' })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.errorHandler(url, response, data, showError)
        )
      );
  }

  postForm<T>(url: string, data: any, showError: boolean = true) {
    const headers = this.addFormHeaders();
    return this.http
      .post<T>(`${this.baseUrl}/${url}`, data, { headers })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.errorHandler(url, response, data, showError)
        )
      );
  }

  put<T>(url: string, data: any, showError: boolean = true) {
    const headers = this.addHeaders();
    return this.http
      .put<T>(`${this.baseUrl}/${url}`, data, { headers })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.errorHandler(url, response, data, showError)
        )
      );
  }

  delete<T>(url: string, showError: boolean = true) {
    const headers = this.addHeaders();
    return this.http
      .delete<T>(`${this.baseUrl}/${url}`, { headers })
      .pipe(
        catchError((response: HttpErrorResponse) =>
          this.errorHandler(url, response, null, showError)
        )
      );
  }

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
              this.languageService.transalte("Error"),
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
