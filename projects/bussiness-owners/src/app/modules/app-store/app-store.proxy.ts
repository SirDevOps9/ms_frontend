import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { AppDto } from './models/appDto';
import { AddToCartDto } from './models/addToCartDto';
import { CartDto } from './models/cartDto';
import { CartItemDto } from './models/cartItemDto';

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

  getById(id: number): Observable<AppDto> {
    return this.httpService.get<AppDto>(`App/${id}`);
  }

  addToCart(model: AddToCartDto): Observable<any> {
    return this.httpService.post<any>("Cart", model);
  }
  getFromCart(id: string): Observable<CartItemDto>{
    return this.httpService.get<CartItemDto>("Cart/GetCartItem/"+ id , true);
  }
  removeFromCart(id: string): Observable<any>{
    return this.httpService.delete<any>("Cart/"+ id , true);
  }
  checkout():Observable<any>{
    return this.httpService.post("Cart/Checkout", {});
  }

  constructor(private httpService: HttpService) { }
}
