import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { AppStoreProxy } from './app-store.proxy';
import { AppDto, AddToCartDto, CartDto } from './models';
import { LanguageService, ToasterService, RouterService } from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectSubdomainComponent } from './components/selectsubdomain/selectsubdomain.component';
import { ResponseSubdomainDto } from '../subscription/models';

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

  loadApps() {
    this.appStoreProxy.getAll().subscribe((response) => {
      this.appsDataSource.next(response);
    });
  }
  getCartData() {
    this.appStoreProxy.getCartData().subscribe((response) => {
      this.cartItemsCount.next(response?.items?.length || 0);
      this.cartDataSource.next(response);
    });
  }

  addToCart(appId: number, dialog: DialogService, subdomains: ResponseSubdomainDto[]) {
    if (!subdomains.length) {
      this.toasterService.showError(
        this.languageService.transalte('AppStore.Error'),
        this.languageService.transalte('AppStore.YouShouldAddSubdomainFirst')
      );
      return;
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
      ref.onClose.subscribe((result: string) => {
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

  async removeFromCart(id: string) {
    const confirmed = await this.toasterService.showConfirm('ConfirmButtonTexttochangestatus');
    if (confirmed) {
      return this.appStoreProxy.removeFromCart(id).subscribe({
        next: () => {
          let filtertedItems = this.cartDataSource.value!;

          filtertedItems.items = this.cartDataSource.value!.items!.filter((item) => item.id != id);

          this.cartItemsCount.next(this.cartItemsCount.value - 1);

          filtertedItems.total.amount = this.cartDataSource.value!.items.reduce(
            (sum, current) => sum + current.unitPrice.amount,
            0
          );

          this.cartDataSource.next(filtertedItems);

          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte('CartItem.ItemRemovedSuccessfully')
          );
        },
      });
    }
  }

  checkout() {
    this.appStoreProxy.checkout().subscribe((r) => {
      this.cartDataSource.next(null);

      this.cartItemsCount.next(0);

      this.toasterService.showSuccess(
        this.languageService.transalte('CartItem.Success'),
        this.languageService.transalte('AppStore.CheckedOut')
      );
      this.router.navigateTo('/app-store/paymentSuccesful');
    });
  }

  private addModelToCart(model: AddToCartDto) {
    this.appStoreProxy.addToCart(model).subscribe({
      next: () => {
        // console.log('return data', r);
        this.getCartData();
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('AppStore.AddedToCartSuccessfully')
        );
      },
      error: (err) => {
        this.toasterService.showError(this.languageService.transalte('AppStore.Error'), err.message);
      },
    });
  }

  constructor(
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private router: RouterService,
    private appStoreProxy: AppStoreProxy
  ) {}
}
