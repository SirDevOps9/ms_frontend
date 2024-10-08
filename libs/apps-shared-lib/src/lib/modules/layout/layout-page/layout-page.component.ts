import { Component, OnInit } from '@angular/core';
import { Cultures, LanguageService } from 'shared-lib';

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

  constructor(private langService: LanguageService) {}
}
