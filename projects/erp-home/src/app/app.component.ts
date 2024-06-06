import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}

  title = 'erp-home';

  constructor(public languageService: LanguageService) {
    this.languageService.setLang();
  }
}
