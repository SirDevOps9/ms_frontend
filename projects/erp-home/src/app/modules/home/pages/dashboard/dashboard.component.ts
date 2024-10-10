import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { TextInputComponent } from 'libs/shared-lib/src/lib/form-components';
import { debounceTime } from 'rxjs';
import { Cultures, LanguageService, MenuModule, Modules } from 'shared-lib';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild('inputElement', { static: false }) inputElement: TextInputComponent;
  nameControl = new FormControl('');
  moduleList: MenuModule[];
  lang: Cultures;
  ngOnInit() {
    this.lang = this.languageService.getLang();
    this.moduleList = this.layoutService.getModules();

    if (!this.moduleList) {
      this.layoutService.modulItems.subscribe((res) => {
        if (res) {
          this.moduleList = res;
        }
      });
    }
    this.nameControl.valueChanges.pipe(debounceTime(500)).subscribe((res: any) => {
      const searchTerm = res.toLowerCase();
      this.moduleList = this.layoutService
        .getModules()
        .filter((elem) => elem.module.toLowerCase().includes(searchTerm));
    });
  }

  navigateto(key: number) {
    if (key === Modules.Hr) {
      location.href = '../hr';
    } else if (key === Modules.Accounting) {
      location.href = '../accounting';
    } else if (key === Modules.GeneralSettings) {
      location.href = '../erp';
    } else if (key === Modules.Sales) {
      location.href = '../sales';
    } else if (key === Modules.Finance) {
      location.href = '../finance';
    } else if (key === Modules.Purchase) {
      location.href = '../purchase';
    } else if (key === Modules.inventory) {
      location.href = '../inventory';
    }
  }

  constructor(public layoutService: LayoutService, private languageService: LanguageService) {}
}
