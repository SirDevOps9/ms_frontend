import { Component, OnInit } from '@angular/core';
import { CartDto } from '../../models/cartDto';
import { AppStoreService } from '../../app-store.service';

@Component({
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
  })
  
  export class CartComponent implements OnInit {
    cartData : CartDto|null;
    groupedItems: { [key: string]: any[] };
    constructor(private appStoreService: AppStoreService,) {
    }
  
    ngOnInit(): void {
        this.appStoreService.getCartData();
    this.appStoreService.cartData.subscribe(cartData => {
      this.cartData = cartData;
      this.groupedItems = this.groupByAppName(this.cartData!.items);
    });

    
}
  removeItemFromCart(id: string) {
      this.appStoreService.removeFromCart(id);
      this.groupedItems = this.groupByAppName(this.cartData!.items.filter(item => item.id != id));
  }
  private groupByAppName(items: any[]): { [key: string]: any[] } {
    return items.reduce((result, item) => {
      (result[item.appName] = result[item.appName] || []).push(item);
      return result;
    }, {});
  }

}