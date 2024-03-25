import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { AppDto } from './models/appDto';
import { AddToCartDto } from './models/addToCartDto';
import { CartDto } from './models/cartDto';

@Injectable({
  providedIn: 'root',
})
export class AppStoreProxy {

  getAll(): Observable<AppDto[]> {
    return this.httpService.get<AppDto[]>(`App`);
  }
  getCartData(): Observable<CartDto>{
    return this.httpService.get<CartDto>("Cart/GetCurrentUserCart");
  }

  addToCart(model: AddToCartDto): Observable<any>{
    return this.httpService.post<any>("Cart", model);
  }
  removeFromCart(id: string): Observable<any>{
    return this.httpService.delete<any>("Cart/"+ id , true);
  }

  constructor(private httpService: HttpService) {}
}
