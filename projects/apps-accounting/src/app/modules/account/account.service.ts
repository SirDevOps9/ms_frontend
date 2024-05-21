import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import {LanguageService, PageInfo, PageInfoResult,ToasterService } from 'shared-lib';
import { AccountProxy } from './account.proxy';
import { AccountDto , GetLevelsDto, listAddLevelsDto  } from './models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountDataSource = new BehaviorSubject<AccountDto[]>([]);

  public accountsList = this.accountDataSource.asObservable();

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  private levelsSource = new BehaviorSubject<GetLevelsDto[]>([]);
  public levels = this.levelsSource.asObservable();

  initAccountList(searchTerm: string, pageInfo: PageInfo) {
    this.accountproxy.getAllPaginated(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.accountDataSource.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  getAllChartOfAccountPaginated(searchTerm: string, pageInfo: PageInfo) {
    return this.accountproxy.getAllPaginated(searchTerm, pageInfo).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getTreeList() {
    return this.accountproxy.getTreeList().pipe(
      map((res) => {
        return res;
      })
    );
  }
  getLevels() {
    this.levelsSource.next([]);
    this.accountproxy.getLevels().subscribe({
      next: (res) => {
        this.levelsSource.next(res);
      },
    });
    return;
  }

  addLevels(command: listAddLevelsDto) {
    this.accountproxy.addLevels(command).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('COAConfigration.Success'),
          this.languageService.transalte('COAConfigration.Levelsaved')
        );
      },
    });
  }

  constructor(private accountproxy: AccountProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService
  ) {}
}
