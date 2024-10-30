import { AppStoreProxy } from './../../app-store.proxy';
import { Component, OnInit } from '@angular/core';
import { AppDto } from '../../models';
import { LanguageService, RouterService, SubdomainService } from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { AppStoreService } from '../../app-store.service';
import { ResponseSubdomainDto } from '../../../subscription/models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrl: './app-details.component.scss',
  providers: [RouterService],
})
export class AppDetailsComponent implements OnInit {
  cover: string;
  activeIndex = 0;
  id: number;
  app: AppDto;
  subdomains: ResponseSubdomainDto[];
  selectedLanguage: any 

  ngOnInit(): void {
    this.langService.language$.subscribe((lang) => {
      this.selectedLanguage = lang
    });
    this.langService
      .getTranslation('AppStore.AppDetail.Title')
      .subscribe((title) => this.titleService.setTitle(title));

    this.appStoreProxy.getById(this.appId).subscribe((r) => {
      r.appGallery = [...r.appGallery!];
      this.app = r;
      this.cover = r.appGallery[0];
    });
    this.subdomainService.getAllSubdomains().subscribe((s) => (this.subdomains = s));
  }

  addToCart() {
    this.appStoreService.addToCart(this.app.id, this.dialog, this.subdomains);
  }

  clickImg(photoId: string, index: number) {
    this.cover = photoId;
    this.activeIndex = index;
  }

  get appId() {
    return this.routerService.currentId;
  }

  constructor(
    private routerService: RouterService,
    private dialog: DialogService,
    private appStoreService: AppStoreService,
    private subdomainService: SubdomainService,
    private appStoreProxy: AppStoreProxy,
    private titleService: Title,
    private langService: LanguageService
  ) {}
}
