import { Injectable } from '@angular/core';
import { CompanyProxy } from './company.proxy';
import { AddCompanyDto, ResponseCompanyDto} from './models';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import {
  APIResponse,
  LanguageService,
  LoaderService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewBranchesComponent } from './components/new-branches/new-branches.component';
import { EditBranchesComponent } from './components/edit-branches/edit-branches.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { AddCompanyPopupDto } from './models/addcompanypopupdto';
import { CompanyAddressDto } from './models/companyaddressdto';
import { CompanyContactDto } from './models/companycontactdto';
import { CompanyLegalDto } from './models/companylegaldto';


@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companiesDataSource = new BehaviorSubject<ResponseCompanyDto[]>([]);

  public companies = this.companiesDataSource.asObservable();
  private branchData = new BehaviorSubject<any[]>([]);

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

  async activate(id: string) {
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

  async deactivate(id: string) {
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
  editBranche(ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(EditBranchesComponent, {
      width: '600px',
      height: '600px',
    });
    ref.onClose.subscribe((result: any) => {
      if (result as any) {
        const updatedUserList: any[] = [
          ...this.branchData.value,
          result,
        ];
        this.branchData.next(updatedUserList);
      }
    });
  }
  openNewCompanyModal(Id: string, 
    ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(NewCompanyComponent, {
      width: '600px',
      height: '600px',
      data: { Id: Id },
    });
    ref.onClose.subscribe((result: any) => {
      if (result as any) {
        const updatedCompaniesList: any[] = [
          ...this.companiesDataSource.value,
          result,
        ];
        this.companiesDataSource.next(updatedCompaniesList);
      }
    });
  }


  addCompanyPopup(company: AddCompanyPopupDto, dialogRef: DynamicDialogRef) : Observable<APIResponse<ResponseCompanyDto>> {
    this.loaderService.show();
    return this.companyProxy.addCompanyPopup(company).pipe(
      map((res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte(
            'Company.Add.CompanyAddedSuccessfully'
          )
        );
        this.loaderService.hide();
        dialogRef.close(res);
        return res;
      }),
      catchError((err: APIResponse<string>) => {
        throw err.error?.errorMessage!;
      })
    );
  }

  
  addBranche(ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(NewBranchesComponent, {
      width: '600px',
      height: '600px',
    });
    ref.onClose.subscribe((result: any) => {
      if (result as any) {
        const updatedUserList: any[] = [
          ...this.branchData.value,
          result,
        ];
        this.branchData.next(updatedUserList);
      }
    });
  }

  saveCompanyContact(model: CompanyContactDto) {
    this.loaderService.show();
    this.companyProxy.saveCompanyContact(model).subscribe({
      next: (response) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('Company.Add.CompanyAddedSuccessfully')
        );
        this.loaderService.hide();
        //this.routerService.navigateTo('company/' + model.subscriptionId);
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }

  saveCompanyAddress(model: CompanyAddressDto) {
    this.loaderService.show();
    this.companyProxy.saveCompanyAddress(model).subscribe({
      next: (response) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('Company.Add.CompanyAddedSuccessfully')
        );
        this.loaderService.hide();
        //this.routerService.navigateTo('company/' + model.subscriptionId);
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }

  saveCompanyLegal(model: CompanyLegalDto) {
    this.loaderService.show();
    this.companyProxy.saveCompanyLegal(model).subscribe({
      next: (response) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('Company.Add.CompanyAddedSuccessfully')
        );
        this.loaderService.hide();
       // this.routerService.navigateTo('company/' + model.subscriptionId);
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }
}
