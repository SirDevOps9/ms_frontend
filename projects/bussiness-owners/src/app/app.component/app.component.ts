import { Component } from '@angular/core';
import { LanguageService } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bussiness Owners';
  constructor( public languageService: LanguageService,
    ) { 
      this.languageService.setLang();
    }
}
