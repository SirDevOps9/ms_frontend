import { Component } from '@angular/core';
import { StorageService, StorageKeys, LanguageService } from 'shared-lib';
import { HomeHelpPageModel } from '../../models/HomeHelpPageModel';

@Component({
  selector: 'lib-home-help-page',
  templateUrl: './home-help-page.component.html',
  styleUrl: './home-help-page.component.css',
})
export class HomeHelpPageComponent {
  treeData: HomeHelpPageModel[];
  language: any;
  groupedData: any[] = [];
  constructor(
    private localStorageService: StorageService,
    private languageService: LanguageService
  ) {}
  ngOnInit(): void {
    this.languageService.language$.subscribe((lang) => {
      this.language = lang;
    });
    const items = this.localStorageService.getItem(StorageKeys.SIDEMENU);
    this.treeData = this.mapToTreeNodes(items, this.language);

    this.groupedData = this.groupBy(this.treeData, 'module');
  }
  mapToTreeNodes(data: any[], lang: any) {
    data = data.map((item) => {
      return {
        key: item.key.toString(),
        // name: item.labelEn,
        name: lang === 'ar' ? item.labelAr : item.labelEn,
        icon: item.icon,
        moduleId: item.moduleId,
        module: item.module,
        type: item.type.toLowerCase(),
        hasHelpPage: item.hasHelpPage,
        serviceId: item.serviceId,
        subMenu: item.children ? this.mapToTreeNodes(item.children, lang) : [],
      };
    });
    return data;
  }

  groupBy(array: any[], key: string) {
    return array.reduce((result, currentValue) => {
      const groupKey = currentValue[key];
      let data = currentValue.subMenu as HomeHelpPageModel[];
      if(data.filter(a=>a.hasHelpPage==true).length>0){
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentValue);
      }
      return result;
    }, {});
  }
}
