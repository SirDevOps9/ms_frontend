import { Component, OnInit } from '@angular/core';
import { CartDto } from '../../models/cartDto';
import { AppStoreService } from '../../app-store.service';

@Component({
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
  })
  export class CartComponent implements OnInit {
    cartData : CartDto;
  
    constructor(private appStoreService: AppStoreService,) {
    }
  
    ngOnInit(): void {
        this.appStoreService.getCartData();
    this.appStoreService.cartData.subscribe(cartData => {
      this.cartData = cartData;
    });
    
  }
}
  