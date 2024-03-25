import { Injectable } from '@angular/core';
import { CompanyProxy } from './company.proxy';
import { AddCompanyDto, ResponseCompanyDto } from './models';
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
import { BranchDto } from './models/branchdto';
import { CreateBranchDto } from './models/createbranchdto';
import { EditBranchDto } from './models/editbranchdto';
import { TreeNode } from 'primeng/api';
import { CompanyHierarchyDto } from './models/companyhierarchydto';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companiesDataSource = new BehaviorSubject<ResponseCompanyDto[]>([]);
  private branchesDataSource = new BehaviorSubject<BranchDto[]>([]);

  public companies = this.companiesDataSource.asObservable();
  public branches = this.branchesDataSource.asObservable();

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


  // loadCompanies(subscriptionId:string) {
  //   return this.companyProxy.getAll(subscriptionId)
  //     .toPromise()
  //     .then(res => <TreeNode[]>res?.response);
  //   }

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

  openNewCompanyModal(
    Id: string,
    ref: DynamicDialogRef,
    dialog: DialogService
  ) {
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

  addCompanyPopup(
    company: AddCompanyPopupDto,
    dialogRef: DynamicDialogRef
  ): Observable<APIResponse<ResponseCompanyDto>> {
    this.loaderService.show();
    return this.companyProxy.addCompanyPopup(company).pipe(
      map((res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('Company.Add.CompanyAddedSuccessfully')
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
          this.languageService.transalte('Company Legal Updated Successfully')
        );
        this.loaderService.hide();
        // this.routerService.navigateTo('company/' + model.subscriptionId);
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }
  // saveCompanyHierarchy(model: CompanyHierarchyDto) {
  //   this.loaderService.show();
  //   this.companyProxy.saveCompanyHierarchy(model).subscribe({
  //     next: (response) => {
  //       this.toasterService.showSuccess(
  //         this.languageService.transalte('Company.Success'),
  //         this.languageService.transalte('Company Hierarchy Updated Successfully')
  //       );
  //       this.loaderService.hide();
  //       // this.routerService.navigateTo('company/' + model.subscriptionId);
  //     },
  //     error: () => {
  //       this.loaderService.hide();
  //     },
  //   });
  // }

  saveCompanyHierarchy(
    model: CompanyHierarchyDto,
  ): Observable<APIResponse<CompanyHierarchyDto>> {
    this.loaderService.show();
    return this.companyProxy.saveCompanyHierarchy(model).pipe(
      map((res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('Company Hierarchy Updated Successfully')
        );
        this.loaderService.hide();
        return res;
      }),
      catchError((err: APIResponse<string>) => {
        throw err.error?.errorMessage!;
      })
    );
  }


  loadBranches(companyId: string) {
    this.companyProxy.getAllBranches(companyId).subscribe((response) => {
      this.branchesDataSource.next(response.response);
    });
  }

  openBranchModel(ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(NewBranchesComponent, {
      width: '600px',
      height: '600px',
    });
    ref.onClose.subscribe((result: BranchDto) => {
      if (result as BranchDto) {
        const updatedBranchlist: BranchDto[] = [
          ...this.branchesDataSource.value,
          result,
        ];
        this.branchesDataSource.next(updatedBranchlist);
      }
    });
  }

  addBranch(model: CreateBranchDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.companyProxy.addBranch(model).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Success'),
          this.languageService.transalte('Branch Added Successfully')
        );
        this.loaderService.hide();

        dialogRef.close(res.response);
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }
  openEditBranchModel(
    branchId: string,
    ref: DynamicDialogRef,
    dialog: DialogService
  ) {
    ref = dialog.open(EditBranchesComponent, {
      width: '600px',
      height: '600px',
      data: { Id: branchId },
    });
    ref.onClose.subscribe((result: BranchDto) => {
      if (result as BranchDto) {
        const updatedBranchlist: BranchDto[] = [
          ...this.branchesDataSource.value,
          result,
        ];
        this.branchesDataSource.next(updatedBranchlist);
      }
    });
  }
  editBranch(model: EditBranchDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.companyProxy.editBranch(model).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Success'),
          this.languageService.transalte('Branch Updated Successfully')
        );
        this.loaderService.hide();

        dialogRef.close(res.response);
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }

  getBranchById(branchId: string) {
    return this.companyProxy.getBranchById(branchId).pipe(
      map((res) => {
        return res.response;
      }),
      catchError((err: APIResponse<string>) => {
        throw err.error?.errorMessage!;
      })
    );
  }

  async deleteBranch(branchId: string) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte( 'ConfirmButtonTexttodelete'),
      //'Toaster.Confirm.ConfirmButtonTexttodelete'
    );
    if (confirmed) {
      this.companyProxy.deleteBranch(branchId).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Success'),
            this.languageService.transalte('Branch Deleted Successfully')
          );
          this.loaderService.hide();
          this.branchesDataSource.next([...this.branchesDataSource.value]);
        },
      });
    } else {
    }
  }

  getCompanyById(companyId: string) {
    return this.companyProxy.getCompanyById(companyId).pipe(
      map((res) => {
        return res.response;
      }),
      catchError((err: APIResponse<string>) => {
        throw err.error?.errorMessage!;
      })
    );
  }
  getCompanyContactById(companyId: string) {
    return this.companyProxy.getCompanyContactById(companyId).pipe(
      map((res) => {
        return res.response;
      }),
      catchError((err: APIResponse<string>) => {
        throw err.error?.errorMessage!;
      })
    );
  }

  getCompanyAddressId(companyId: string) {
    return this.companyProxy.getCompanyAddressId(companyId).pipe(
      map((res) => {
        return res.response;
      }),
      catchError((err: APIResponse<string>) => {
        throw err.error?.errorMessage!;
      })
    );
  }

  getCompanyLegalById(companyId: string) {
    return this.companyProxy.getCompanyLegalById(companyId).pipe(
      map((res) => {
        return res.response;
      }),
      catchError((err: APIResponse<string>) => {
        throw err.error?.errorMessage!;
      })
    );
  }

  getCompanyHierarchyById(branchId: string) {
    return this.companyProxy.getCompanyHierarchyById(branchId).pipe(
      map((res) => {
        return res.response;
      }),
      catchError((err: APIResponse<string>) => {
        throw err.error?.errorMessage!;
      })
    );
  }
}
