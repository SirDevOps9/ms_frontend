import { Component, OnInit } from '@angular/core';
import { AppStoreService } from '../../app-store.service';
import { RouterService } from 'shared-lib';

@Component({
    templateUrl: './cart-item-detail.component.html',
    styleUrl: './cart-item-detail.component.scss',
    providers: [RouterService],
  })
  
  export class CartItemDetailComponent implements OnInit {
    cartItemData : any ={};
    constructor(private appStoreService: AppStoreService,private routerService: RouterService) {
    }
  
    ngOnInit(): void {
        
        this.initilizeData();
    };
    async initilizeData()
    {
       await  this.appStoreService.getFromCart(this.routerService.currentId).subscribe(
            (res) => {
                this.cartItemData.id = res.id;
                this.cartItemData.appName=res.appName;
                this.cartItemData.subDomainName=res.subDomainName;
                this.cartItemData.unitPrice = res.unitPrice;
            }
        );
    }
}


