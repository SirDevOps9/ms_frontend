import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, HttpService, lookupsListDto } from 'shared-lib';
import { AppDto } from './models/appDto';

@Injectable({
  providedIn: 'root',
})
export class AppStoreProxy {

  getAll(): Observable<AppDto[]> {
    return this.httpService.get<AppDto[]>(`App`);
  }

  constructor(private httpService: HttpService) {}
}
