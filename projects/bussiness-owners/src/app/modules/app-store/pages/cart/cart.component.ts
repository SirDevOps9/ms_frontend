import { Component, OnInit } from '@angular/core';
import { CartDto } from '../../models';
import { AppStoreService } from '../../app-store.service';
import { LanguageService, RouterService } from 'shared-lib';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartData: CartDto | null;
  totalItems: number;
  totalPrice: number;
  groupedItems: { [key: string]: any[] };
  constructor(
    private appStoreService: AppStoreService,
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languageService.getTranslation('Cart.Title').subscribe((title) => {
      this.titleService.setTitle(title);
    });

    this.appStoreService.getCartData();

    this.appStoreService.cartData.subscribe((cartData) => {
      if (cartData) {
        this.cartData = cartData;
        this.totalItems = cartData!.items.length;
        this.totalPrice = cartData!.total.amount;
        this.groupedItems = this.groupByAppName(this.cartData!.items);
      }
    });
  }

  itemFromCartDetail(id: string) {
    this.routerService.navigateTo('/app-store/app-detail/' + id);
  }

  async removeItemFromCart(id: string) {
    await this.appStoreService.removeFromCart(id);
  }

  checkout() {
    this.appStoreService.checkout();
    this.routerService.navigateTo('/paymentSuccesful');
  }

  private groupByAppName(items: any[]): { [key: string]: any[] } {
    return items.reduce((result, item) => {
      (result[item.appName] = result[item.appName] || []).push(item);
      return result;
    }, {});
  }
}
