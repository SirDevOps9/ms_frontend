import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'apps-shared-lib';
import { Cultures, LanguageService, StorageKeys, StorageService } from 'shared-lib';
import { CompanyTypes } from 'libs/apps-shared-lib/src/lib/modules/sequence/models/companyTypes';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss',
})
export class LayoutPageComponent implements OnInit {
  currentLang: Cultures | string;
  ngOnInit(): void {
    this.langService.setLang();
    this.currentLang = this.langService.getLang();
  
  
  }
  sidebarOpen: boolean = false;
  toggleSidebar(event: boolean) {
    this.sidebarOpen = event;
  }
  languageToggleDetect(event: Cultures) {
    this.currentLang = event;
  }

  constructor(
    public layoutService: LayoutService,
    public genralService: GeneralService,

    private langService: LanguageService) {}


  

}
