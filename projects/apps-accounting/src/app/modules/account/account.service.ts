import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { LanguageService, PageInfo, ToasterService } from 'shared-lib';
import { AccountProxy } from './account.proxy';
import { GetLevelsDto, listAddLevelsDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private accountproxy: AccountProxy,
    private toasterService: ToasterService,
    private languageService: LanguageService
  ) {}

  private levelsSource = new BehaviorSubject<GetLevelsDto[]>([]);
  public levels = this.levelsSource.asObservable();

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
}
