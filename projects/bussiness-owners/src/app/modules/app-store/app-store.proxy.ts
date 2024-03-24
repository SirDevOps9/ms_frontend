import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { AppDto } from './models/appDto';
import { AddToCartDto } from './models/addToCartDto';

@Injectable({
  providedIn: 'root',
})
export class AppStoreProxy {

  getAll(): Observable<AppDto[]> {
    return this.httpService.get<AppDto[]>(`App`);
  }

  addToCart(model: AddToCartDto): Observable<any>{
    return this.httpService.post<any>("Cart", model);
  }

  constructor(private httpService: HttpService) {}
}
