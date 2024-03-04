import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../../../shared-lib/src/lib/services/language.service';
import { AuthService } from 'microtec-auth-lib';
import { MenuItem } from 'primeng/api';
import { EnvironmentService, LogService } from 'shared-lib';
import { UserData } from '../../models/users/userdata.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  userName:string;
  userData: UserData;
  showcard:boolean=false;
  sidebarOpen:boolean=false;
  submenu:boolean=false;
  countries: any[] | undefined;
  
  selectedCountry: string | undefined;
  constructor(
    public languageService: LanguageService,
    public authService: AuthService
    ,private logService:LogService,
    private env: EnvironmentService
  ) {
    this.userName = this.authService.getUserName;
    this.userData = this.authService.getUserData().userData;
  }
  ngOnInit(): void {
  this.countries = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
  logout(): void {
    this.authService.logout();
  }
  cardDrob(){
    if(this.showcard==true){
        this.showcard=false
    }else{
        this.showcard=true
    }
  }
  toggleSidebar(){
    if(this.sidebarOpen==true){
        this.sidebarOpen=false
        
    }else{
        this.sidebarOpen=true
    }
  }
  showSubmenu(){
    this.submenu=true
  }
  activeTag(id:any){
    const targetElementId = document.getElementById(id)
    var test = document.querySelector('.active_link');
    test?.classList.remove('active_link');
   targetElementId?.classList.add('active_link')
  }

  getProfilePic(){
    return this.userData.userType == "4" ? this.env.photoBaseUrl + '/api/Users/GetProfilePic?userId=' + this.userData.sub : 'assets/images/users/default.png';
  }
}
