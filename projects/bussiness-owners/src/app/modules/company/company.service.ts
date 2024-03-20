import { Injectable } from '@angular/core';
import { CompanyProxy } from './company.proxy';
import { AddCompanyDto, ResponseCompanyDto } from './models';
import { BehaviorSubject } from 'rxjs';
import {
  LanguageService,
  LoaderService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { AddCompanyPopupDto } from './models/addcompanypopup';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddCompanyPopupComponent } from './components/add-company-popup/add-company-popup.component';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companiesDataSource = new BehaviorSubject<ResponseCompanyDto[]>([]);

  public companies = this.companiesDataSource.asObservable();

  constructor(
    private companyProxy: CompanyProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
    private routerService: RouterService
  ) {}

  loadCompanies(subscriptionId: string) {
    this.companyProxy.getAll(subscriptionId).subscribe((response) => {
      this.companiesDataSource.next(response.response.reverse());
    });
  }

  addCompany(model: AddCompanyDto) {
    this.loaderService.show();
    this.companyProxy.addCompany(model).subscribe({
      next: (response) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('Company.Add.CompanyAddedSuccessfully')
        );
        this.loaderService.hide();
        this.routerService.navigateTo('company/' + model.subscriptionId);
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }

  async activate(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangestatus'
    );
    if (confirmed) {
      this.companyProxy.activateCompany(id).subscribe({
        next: () => {
          const companyToChange = this.companiesDataSource.value.find(
            (item) => item.id === id
          );
          if (companyToChange) {
            companyToChange.isActive = true;
            this.companiesDataSource.next([...this.companiesDataSource.value]);
          }
          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte(
              'Company.CompanyActivatedSuccessfully'
            )
          );
        },
      });
    } else {
    }
  }

  async deactivate(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangestatus'
    );
    if (confirmed) {
      this.companyProxy.deactivateCompany(id).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte(
              'Company.CompanyDeactivatedSuccessfully'
            )
          );
          const companyToChange = this.companiesDataSource.value.find(
            (item) => item.id === id
          );
          if (companyToChange) {
            companyToChange.isActive = false;
            this.companiesDataSource.next([...this.companiesDataSource.value]);
          }
        },
      });
    } else {
    }
  }

  openAddCompanyModal(
    Id: string, 
    ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(AddCompanyPopupComponent, {
      width: '600px',
      height: '600px',
      data: { Id: Id },
    });
    ref.onClose.subscribe();
  }
  addCompanyPopup(company: AddCompanyPopupDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.companyProxy.addCompanyPopup(company).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Plan.Subdomain.Success'),
          this.languageService.transalte(
            'Plan.Subdomain.SubdomainAddedSuccessfully'
          )
        );
        this.loaderService.hide();
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }
}
