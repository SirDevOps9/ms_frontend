import { Component, OnInit } from '@angular/core';
import { AppStoreService } from '../../app-store.service';
import { AppDto } from '../../models';
import { SharedLibraryEnums, RouterService, SubdomainService, LanguageService } from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { ResponseSubdomainDto } from '../../../subscription/models';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-list-apps',
  templateUrl: './list-apps.component.html',
  styleUrl: './list-apps.component.scss',
})
export class ListAppsComponent implements OnInit {
  apps: AppDto[];
  appInStore: number;
  subdomains: ResponseSubdomainDto[];
  cardList: boolean = false;
  selectedLanguage: any 

  constructor(
    private appStoreService: AppStoreService,
    private dialog: DialogService,
    private subdomainService: SubdomainService,
    public sharedLibraryEnums: SharedLibraryEnums,
    private router: RouterService,
    private titleService: Title,
    private languageService: LanguageService
  ) {}

   
  ngOnInit(): void {
    console.log(this.languageService.transalte('Welcome'));

    this.languageService.language$.subscribe((lang) => {
      this.selectedLanguage = lang

    });
    
    this.languageService.getTranslation('AppStore.Title').subscribe((title) => {
      this.titleService.setTitle(title);
      
    });

    this.appStoreService.loadApps();

    this.appStoreService.apps.subscribe((apps) => {
      this.apps = apps;
      this.appInStore = apps.length;
    });

    this.subdomainService.getAllSubdomains().subscribe((s) => (this.subdomains = s));
  }

  addToCart(appId: number) {
    this.appStoreService.addToCart(appId, this.dialog, this.subdomains);
  }

  getAppDeps(app: AppDto) {
    return app.dependencies.map((d) => d.nameEn).join(' - ');
  }
  
  toggelview() {
    this.cardList = !this.cardList;
  }
  routeToDetails(id: any) {
    console.log(id);
    this.router.navigateTo('/app-store/app-detail/' + id);
  }
}
