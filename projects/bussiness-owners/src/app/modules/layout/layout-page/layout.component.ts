import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from 'shared-lib';
import { AuthService } from 'microtec-auth-lib';
import { UserData } from '../../user/models/userdata.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  userName: string;
  userData: UserData;
  showcard: boolean = false;
  sidebarOpen: boolean = false;
  countries: any[] | undefined;

  selectedCountry: string | undefined;

  @ViewChild('cardDr') cardDr: ElementRef;
  @ViewChild('profaile_card_drob') profaile_card_drob: ElementRef;

  ngOnInit(): void {

  }

 
  toggleSidebar(event:boolean) {
    this.sidebarOpen=event
  }
  constructor(
    public languageService: LanguageService,
    public authService: AuthService,
   
  ) {
    this.userName = this.authService.getUserName;
    this.userData = this.authService.getUserData()?.userData;
    this.languageService.setLang();
  }
}
