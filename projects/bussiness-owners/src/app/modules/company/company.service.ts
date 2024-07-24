import { Injectable } from '@angular/core';
import { CompanyProxy } from './company.proxy';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { LanguageService, LoaderService, ToasterService, lookupDto } from 'shared-lib';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewBranchesComponent } from './components/new-branches/new-branches.component';
import { EditBranchesComponent } from './components/edit-branches/edit-branches.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import {
  BranchDto,
  CompanyAddressDto,
  CompanyContactDto,
  CompanyLegalDto,
  CreateBranch,
  CreateCompany,
  editBranch,
  CompanyDto,
  UpdateCompanyHierarchyDto,
  ExportBranchesDto,
} from './models';
import { ExportCompanyDto } from './models/export-company-dto';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companiesDataSource = new BehaviorSubject<CompanyDto[]>([]);
  private branchesDataSource = new BehaviorSubject<BranchDto[]>([]);
  public companyName = new BehaviorSubject<string>('');

  public companies = this.companiesDataSource.asObservable();
  public companyNameobs = this.companyName.asObservable();
  public branches = this.branchesDataSource.asObservable();
  public selectedCompanyActive = new BehaviorSubject<boolean>(true);

  private exportsCompaniesDataSource = new BehaviorSubject<ExportCompanyDto[]>([]);
  public exportsCompaniesDataSourceObservable = this.exportsCompaniesDataSource.asObservable();

  private exportsBranchesDataSource = new BehaviorSubject<ExportBranchesDto[]>([]);
  public exportsBranchesDataSourceObservable = this.exportsBranchesDataSource.asObservable();

  constructor(
    private companyProxy: CompanyProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}

  loadCompanies(searchTerm: string,subscriptionId: string) {
    this.companyProxy.getAll(searchTerm,subscriptionId).subscribe((response) => {
      this.companiesDataSource.next(response);
    });
  }

  async activate(id: string) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttochangstatus')
    );
    if (confirmed) {
      this.companyProxy.activateCompany(id).subscribe({
        next: () => {
          const companyToChange = this.companiesDataSource.value.find(
            (item) => item.data.id === id
          );
          if (companyToChange) {
            companyToChange.data.isActive = true;
            this.selectedCompanyActive.next(true);
            this.companiesDataSource.next([...this.companiesDataSource.value]);
          }
          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte('Company.CompanyActivatedSuccessfully')
          );
        },
        error: () => {
          const companyToChange = this.companiesDataSource.value.find(
            (item) => item.data.id === id
          );
          if (companyToChange) {
            companyToChange.data.isActive = false;
            this.selectedCompanyActive.next(false);
          }
        },
      });
    } else {
      const companyToChange = this.companiesDataSource.value.find((item) => item.data.id === id);
      this.selectedCompanyActive.next(false);
      if (companyToChange) {
        companyToChange.data.isActive = false;
      }
    }
  }

  async deactivate(id: string) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttochangstatus')
    );
    if (confirmed) {
      this.companyProxy.deactivateCompany(id).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte('Company.CompanyDeactivatedSuccessfully')
          );
          const companyToChange = this.companiesDataSource.value.find(
            (item) => item.data.id === id
          );
          if (companyToChange) {
            companyToChange.data.isActive = false;
            this.selectedCompanyActive.next(false);
            this.companiesDataSource.next([...this.companiesDataSource.value]);
          }
        },
        error: () => {
          const companyToChange = this.companiesDataSource.value.find(
            (item) => item.data.id === id
          );
          if (companyToChange) {
            companyToChange.data.isActive = true;
            this.selectedCompanyActive.next(true);
          }
        },
      });
    } else {
      const companyToChange = this.companiesDataSource.value.find((item) => item.data.id === id);

      this.selectedCompanyActive.next(true);

      if (companyToChange) {
        companyToChange.data.isActive = true;
      }
    }
  }

  openNewCompanyModal(Id: string, ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(NewCompanyComponent, {
      width: '600px',
      height: '600px',
      data: { Id: Id },
    });
    ref.onClose.subscribe((result: CompanyDto) => {
      if (result as CompanyDto) {
        if (result.data.parentId) {
          var parentCompany = this.companiesDataSource.value.find(
            (x) => x.data.id === result.data.parentId
          );
          parentCompany?.children?.push(result);
          this.companiesDataSource.next(this.companiesDataSource.value);
        } else {
          const updatedCompaniesList: CompanyDto[] = [...this.companiesDataSource.value, result];
          this.companiesDataSource.next(updatedCompaniesList);
        }
      }
    });
  }

  addCompany(company: CreateCompany, dialogRef: DynamicDialogRef): Observable<CompanyDto> {
    this.loaderService.show();
    return this.companyProxy.addCompany(company).pipe(
      map((res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('Company.Add.CompanyAddedSuccessfully')
        );
        this.loaderService.hide();
        dialogRef.close(res);
        return res;
      }),
      catchError((err: string) => {
        this.loaderService.hide();
        throw err;
      })
    );
  }

  saveCompanyContact(model: CompanyContactDto) {
    this.loaderService.show();
    this.companyProxy.saveCompanyContact(model).subscribe({
      next: (response) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('Company.CompanyUpdatedSuccessfully')
        );
        this.loaderService.hide();
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
          this.languageService.transalte('Company.CompanyUpdatedSuccessfully')
        );
        this.loaderService.hide();
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
          this.languageService.transalte('Company.CompanyUpdatedSuccessfully')
        );
        this.loaderService.hide();
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }
  saveCompanyHierarchy(model: UpdateCompanyHierarchyDto) {
    this.loaderService.show();
    this.companyProxy.saveCompanyHierarchy(model).subscribe({
      next: (response) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('Company.CompanyUpdatedSuccessfully')
        );
        this.loaderService.hide();
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }

  loadBranches(companyId: string) {
    this.companyProxy.getAllBranches(companyId).subscribe((response) => {
      this.branchesDataSource.next(response);
    });
  }

  getAllHoldingCompanies(subdomainId: string): Observable<lookupDto[]> {
    return this.companyProxy.getAllHoldingCompanies(subdomainId);
  }

  getAllCompanies(subdomainId: string): Observable<lookupDto[]> {
    return this.companyProxy.getAllCompanies(subdomainId);
  }

  openBranchModel(id: string, ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(NewBranchesComponent, {
      width: '600px',
      height: '600px',
      data: { Id: id },
    });

    ref.onClose.subscribe((result: BranchDto) => {
      if (result as BranchDto) {
        const updatedBranchlist: BranchDto[] = [...this.branchesDataSource.value, result];
        this.branchesDataSource.next(updatedBranchlist);
      }
    });
  }

  addBranch(model: CreateBranch, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.companyProxy.addBranch(model).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Success'),
          this.languageService.transalte('Branch Added Successfully')
        );
        this.loaderService.hide();

        dialogRef.close(res);
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }
  openEditBranchModel(branchId: string, ref: DynamicDialogRef, dialog: DialogService) {
    ref = dialog.open(EditBranchesComponent, {
      width: '600px',
      height: '600px',
      data: { Id: branchId },
    });
    ref.onClose.subscribe((result: BranchDto) => {
      if (result as BranchDto) {
        let branchToChange = this.branchesDataSource.value.find((item) => item.id === result.id);

        if (branchToChange) {
          Object.assign(branchToChange, result);
          this.branchesDataSource.next([...this.branchesDataSource.value]);
        }
      }
    });
  }
  editBranch(model: editBranch, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.companyProxy.editBranch(model).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('Success'),
          this.languageService.transalte('Company.Branch.BranchUpdatedSuccessfully')
        );
        this.loaderService.hide();

        dialogRef.close(res);
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }

  getBranchById(branchId: string) {
    return this.companyProxy.getBranchById(branchId).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: string) => {
        throw err!;
      })
    );
  }

  async deleteBranch(branchId: string) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.companyProxy.deleteBranch(branchId).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Success'),
            this.languageService.transalte('Company.Branch.BranchDeletedSuccessfully')
          );
          this.loaderService.hide();
          const currentBranches = this.branchesDataSource.getValue();
          const updatedBranches = currentBranches.filter((branch) => branch.id !== branchId);
          this.branchesDataSource.next(updatedBranches);
        },
        error: (err) => {
          this.toasterService.showError('Operation Fail', err.message);
        },
      });
    } else {
    }
  }

  async activateBranch(id: string) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttochangstatus')
    );
    if (confirmed) {
      this.companyProxy.activateBranch(id).subscribe({
        next: () => {
          const branchToChange = this.branchesDataSource.value.find((item) => item.id === id);
          if (branchToChange) {
            branchToChange.isActive = true;
            this.branchesDataSource.next([...this.branchesDataSource.value]);
          }
          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte('Company.Branch.BranchActivatedSuccessfully')
          );
        },
      });
    } else {
      const branchToChange = this.branchesDataSource.value.find((item) => item.id === id);
      if (branchToChange) {
        branchToChange.isActive = false;
        this.branchesDataSource.next([...this.branchesDataSource.value]);
      }
    }
  }

  async deActivateBranch(id: string) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttochangstatus')
    );
    if (confirmed) {
      this.companyProxy.deActivateBranch(id).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte('Company.Branch.BranchDeActivatedSuccessfully')
          );
          const branchToChange = this.branchesDataSource.value.find((item) => item.id === id);
          if (branchToChange) {
            branchToChange.isActive = false;
            this.branchesDataSource.next([...this.branchesDataSource.value]);
          }
        },
      });
    } else {
      const branchToChange = this.branchesDataSource.value.find((item) => item.id === id);
      if (branchToChange) {
        branchToChange.isActive = true;
        this.branchesDataSource.next([...this.branchesDataSource.value]);
      }
    }
  }

  getCompanyById(companyId: string) {
    return this.companyProxy.getCompanyById(companyId).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: string) => {
        throw err;
      })
    );
  }
  getCompanyContactById(companyId: string) {
    return this.companyProxy.getCompanyContactById(companyId).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: string) => {
        throw err;
      })
    );
  }

  getCompanyAddressId(companyId: string) {
    return this.companyProxy.getCompanyAddressId(companyId).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: string) => {
        throw err;
      })
    );
  }

  getCompanyLegalById(companyId: string) {
    return this.companyProxy.getCompanyLegalById(companyId).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: string) => {
        throw err;
      })
    );
  }

  getCompanyHierarchyById(companyId: string) {
    return this.companyProxy.getCompanyHierarchyById(companyId).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: string) => {
        throw err;
      })
    );
  }

  checkIfFirstCompany(): Observable<boolean> {
    return this.companies.pipe(
      map(companies => companies.length === 0)
    );
  }

  exportCompaniesData(searchTerm:string | undefined,subscriptionId: string,
  ) {
    this.companyProxy.exportCompaniesData(searchTerm,subscriptionId).subscribe({
      next: (res) => {
         this.exportsCompaniesDataSource.next(res);
      },
    });
  }

  exportBranchesData(companyId: string,
  ) {
    this.companyProxy.exportBranchesData(companyId).subscribe({
      next: (res) => {
         this.exportsBranchesDataSource.next(res);
      },
    });
  }

}
