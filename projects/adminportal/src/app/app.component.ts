import { Component, OnInit } from '@angular/core';
import { LanguageService, TitleService } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'adminPortal';


  constructor(
    public languageService: LanguageService,
    private titleService: TitleService,
  ) {
    this.languageService.setLang();
  }
  ngOnInit() {
    this.titleService.setTitleFromRoute();
  }
  
}
