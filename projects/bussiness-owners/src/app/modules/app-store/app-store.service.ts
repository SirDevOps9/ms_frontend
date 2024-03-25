import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppStoreProxy } from './app-store.proxy';
import { AppDto } from './models/appDto';
import { AddToCartDto } from './models/addToCartDto';
import { BaseDto, LanguageService, ToasterService } from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectSubdomainComponent } from './components/select-subdomain.component';
import { CartDto } from './models/cartDto';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  private appsDataSource = new BehaviorSubject<AppDto[]>([]);
  private cartDataSource = new BehaviorSubject<any>({});
  public apps = this.appsDataSource.asObservable();
  public cartData = this.cartDataSource.asObservable(); 

  constructor(
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private appStoreProxy: AppStoreProxy,
  ) { }

  loadApps() {
    this.appStoreProxy.getAll().subscribe((response) => {
      this.appsDataSource.next(response);
    });
  }
  getCartData() {
    this.appStoreProxy.getCartData().subscribe((response) => {
      this.cartDataSource.next(response);
    });
  }

  addToCart(appId: number, dialog: DialogService, subdomains: BaseDto[]) {
    if (!subdomains.length) {
      throw "No subdomains";
    }
    if (subdomains.length == 1) {
      this.addModelToCart({ subdomainId: subdomains[0].id, appId })
    } else {
      const ref = dialog.open(SelectSubdomainComponent, {
        width: '600px',
        height: '600px',
        data: {
          subdomains: subdomains
        },
        header: 'Select a Subdomain'
      });
      ref.onClose.subscribe((result: number) => {
        if(result){
          this.addModelToCart({ subdomainId: result, appId })
        }
      });
    }
  }

  private addModelToCart(model: AddToCartDto) {
    this.appStoreProxy.addToCart(model).subscribe(
      r => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('AppStore.AddedToCartSuccessfully')
        );
      }
    )
  }
}
