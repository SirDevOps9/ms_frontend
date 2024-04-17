import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  pipe,
  tap,
} from 'rxjs';
import { AppStoreProxy } from './app-store.proxy';
import { AppDto } from './models/appDto';
import { AddToCartDto } from './models/addToCartDto';
import {
  BaseDto,
  LanguageService,
  ToasterService,
  Money,
  RouterService,
} from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectSubdomainComponent } from './components/select-subdomain.component';
import { CartDto } from './models/cartDto';
import { CartItemDto } from './models/cartItemDto';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private appsDataSource = new BehaviorSubject<AppDto[]>([]);
  private cartDataSource = new BehaviorSubject<CartDto | null>(null);
  private cartItemsCount = new BehaviorSubject<number>(0);
  public apps = this.appsDataSource.asObservable();
  public cartData = this.cartDataSource.asObservable();
  public cartItemsCount$ = this.cartItemsCount.asObservable();

  constructor(
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private router: RouterService,
    private appStoreProxy: AppStoreProxy
  ) {
    this.getCartData();
  }

  loadApps() {
    this.appStoreProxy.getAll().subscribe((response) => {
      this.appsDataSource.next(response);
    });
  }
  getCartData() {
    this.appStoreProxy.getCartData().subscribe((response) => {
      console.log('cart', response);
      
      this.cartItemsCount.next(response?.items?.length || 0);
      this.cartDataSource.next(response);
    });
  }

  addToCart(appId: number, dialog: DialogService, subdomains: BaseDto[]) {
    if (!subdomains.length) {
      throw 'No subdomains';
    }
    if (subdomains.length == 1) {
      this.addModelToCart({ subdomainId: subdomains[0].id, appId });
    } else {
      const ref = dialog.open(SelectSubdomainComponent, {
        width: '600px',
        height: '600px',
        data: {
          subdomains: subdomains,
        },
        header: 'Select a Subdomain',
      });
      ref.onClose.subscribe((result: number) => {
        if (result) {
          this.addModelToCart({ subdomainId: result, appId });
        }
      });
    }
  }

  getFromCart(id: string) {
    return this.appStoreProxy.getFromCart(id).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: any) => {
        throw err.error?.errorMessage!;
      })
    );
  }

  async removeFromCart(id: string): Promise<Observable<any>> {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangestatus'
    );
    if (confirmed) {
      return this.appStoreProxy.removeFromCart(id).pipe(
        map(() => {
          this.cartDataSource.value!.items =
            this.cartDataSource.value!.items!.filter((item) => item.id != id);
          
          this.cartItemsCount.next(this.cartItemsCount.value - 1);

          this.cartDataSource.value!.total.amount =
            this.cartDataSource.value!.items.reduce(
              (sum, current) => sum + current.unitPrice.amount,
              0
            );

          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte('CartItem.ItemRemovedSuccessfully')
          );
          return true;
        })
      );
    }
    return of(false);
  }

  checkout() {
    this.appStoreProxy.checkout().subscribe((r) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('CartItem.Success'),
        this.languageService.transalte('AppStore.CheckedOut')
      );
      this.router.navigateTo('/my-plans');
    });
  }

  private addModelToCart(model: AddToCartDto) {
    this.appStoreProxy.addToCart(model).subscribe((r) => {
      this.getCartData();
      this.toasterService.showSuccess(
        this.languageService.transalte('Company.Success'),
        this.languageService.transalte('AppStore.AddedToCartSuccessfully')
      );
    });
  }
}
