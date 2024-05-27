import { Component, OnInit } from '@angular/core';
import { AppStoreService } from '../../app-store.service';
import { RouterService } from 'shared-lib';

@Component({
  templateUrl: './cart-item-detail.component.html',
  styleUrl: './cart-item-detail.component.scss',
  providers: [RouterService],
})
export class CartItemDetailComponent implements OnInit {
  cartItemData: any = null;
  constructor(private appStoreService: AppStoreService, private routerService: RouterService) {}

  ngOnInit(): void {
    this.initilizeData();
  }
  async initilizeData() {
    await this.appStoreService.getFromCart(this.routerService.currentId).subscribe((res) => {
      this.cartItemData = {
        id: res.id,
        appName: res.appName,
        subDomainName: res.subDomainName,
        unitPrice: res.unitPrice,
      };
    });
  }
}
